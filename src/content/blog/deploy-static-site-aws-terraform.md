---
title: "Deploy a Static Site on AWS: S3 + CloudFront + ACM + Route53 — Full Terraform"
description: "A complete Infrastructure as Code walkthrough for hosting a production-grade static site on AWS. We'll provision S3, CloudFront, ACM certificates, and Route53 records — all with reusable Terraform modules."
publishedDate: 2026-05-09
category: Cloud
tags: ["terraform", "aws", "s3", "cloudfront", "iac", "devops"]
featured: true
draft: false
coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80"
coverImageAlt: "Abstract digital cloud formation in electric cyan particles"
readingTime: "12 min read"
---

Most developers reach for Netlify or Cloudflare Pages (like this very site) for static hosting — and for good reason. But if your team is already deep in the AWS ecosystem, or your compliance requirements mandate a single-cloud strategy, you need to know how to build this the right way with Terraform.

This post walks you through the **full infrastructure stack** for a production-grade static site on AWS, from SSL certificates to cache invalidation strategies.

## Architecture Overview

```
User → Route53 → CloudFront (CDN) → S3 (origin)
                      ↑
                 ACM Certificate (us-east-1)
```

> **Why this specific stack?** CloudFront requires ACM certificates to be in `us-east-1` regardless of where your users or S3 bucket are. This is a common gotcha that trips up teams migrating from other clouds.

## Prerequisites

- AWS CLI configured with appropriate IAM permissions
- Terraform >= 1.6.0
- A registered domain (can be in Route53 or any registrar)
- Your static site build output (e.g., `dist/` from Astro, `out/` from Next.js)

## Project Structure

```
infra/
├── main.tf           # Provider config + backend
├── variables.tf      # Input variables
├── outputs.tf        # CloudFront domain, S3 bucket name
├── s3.tf             # S3 bucket + policy
├── cloudfront.tf     # Distribution + OAC
├── acm.tf            # Certificate + validation
└── route53.tf        # DNS records
```

## Step 1 — Provider and Backend

```hcl
# main.tf
terraform {
  required_version = ">= 1.6.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # S3 backend for remote state — recommended for teams
  backend "s3" {
    bucket         = "your-terraform-state-bucket"
    key            = "static-site/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "terraform-state-lock"
  }
}

# Default provider for most resources
provider "aws" {
  region = var.aws_region
}

# ACM certificates MUST be in us-east-1 for CloudFront
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}
```

## Step 2 — S3 Bucket with Origin Access Control

The modern approach uses **OAC** (Origin Access Control) instead of the legacy OAI. OAC supports SSE-S3 and SSE-KMS encrypted buckets and is the AWS-recommended method as of 2022.

```hcl
# s3.tf
resource "aws_s3_bucket" "site" {
  bucket        = "${var.domain_name}-static-site"
  force_destroy = false

  tags = {
    Environment = var.environment
    Project     = var.project_name
    ManagedBy   = "terraform"
  }
}

# Block ALL public access — CloudFront uses OAC, not public URLs
resource "aws_s3_bucket_public_access_block" "site" {
  bucket                  = aws_s3_bucket.site.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# Bucket policy — allow only CloudFront to read
resource "aws_s3_bucket_policy" "site" {
  bucket = aws_s3_bucket.site.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Sid    = "AllowCloudFrontOAC"
      Effect = "Allow"
      Principal = {
        Service = "cloudfront.amazonaws.com"
      }
      Action   = "s3:GetObject"
      Resource = "${aws_s3_bucket.site.arn}/*"
      Condition = {
        StringEquals = {
          "AWS:SourceArn" = aws_cloudfront_distribution.site.arn
        }
      }
    }]
  })
}
```

## Step 3 — ACM Certificate with DNS Validation

```hcl
# acm.tf
resource "aws_acm_certificate" "site" {
  provider                  = aws.us_east_1  # ← CRITICAL
  domain_name               = var.domain_name
  subject_alternative_names = ["www.${var.domain_name}"]
  validation_method         = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

# Create the DNS validation records in Route53
resource "aws_route53_record" "cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.site.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  zone_id = data.aws_route53_zone.site.zone_id
  name    = each.value.name
  type    = each.value.type
  ttl     = 60
  records = [each.value.record]
}

resource "aws_acm_certificate_validation" "site" {
  provider                = aws.us_east_1
  certificate_arn         = aws_acm_certificate.site.arn
  validation_record_fqdns = [for record in aws_route53_record.cert_validation : record.fqdn]
}
```

## Step 4 — CloudFront Distribution

```hcl
# cloudfront.tf
resource "aws_cloudfront_origin_access_control" "site" {
  name                              = "${var.project_name}-oac"
  description                       = "OAC for ${var.domain_name}"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "site" {
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  aliases             = [var.domain_name, "www.${var.domain_name}"]
  price_class         = "PriceClass_100"  # US + Europe only = cheaper

  origin {
    domain_name              = aws_s3_bucket.site.bucket_regional_domain_name
    origin_id                = "S3-${aws_s3_bucket.site.id}"
    origin_access_control_id = aws_cloudfront_origin_access_control.site.id
  }

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "S3-${aws_s3_bucket.site.id}"
    viewer_protocol_policy = "redirect-to-https"
    compress               = true

    # Cache-optimized policy (AWS managed)
    cache_policy_id = "658327ea-f89d-4fab-a63d-7e88639e58f6"
  }

  # SPA routing — redirect 403/404 back to index.html
  custom_error_response {
    error_code            = 403
    response_code         = 200
    response_page_path    = "/index.html"
    error_caching_min_ttl = 0
  }

  custom_error_response {
    error_code            = 404
    response_code         = 404
    response_page_path    = "/404.html"
    error_caching_min_ttl = 10
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate_validation.site.certificate_arn
    ssl_support_method        = "sni-only"
    minimum_protocol_version  = "TLSv1.2_2021"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
}
```

## Step 5 — Route53 DNS Records

```hcl
# route53.tf
data "aws_route53_zone" "site" {
  name         = var.domain_name
  private_zone = false
}

# Apex domain → CloudFront (A alias record)
resource "aws_route53_record" "apex" {
  zone_id = data.aws_route53_zone.site.zone_id
  name    = var.domain_name
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.site.domain_name
    zone_id                = aws_cloudfront_distribution.site.hosted_zone_id
    evaluate_target_health = false
  }
}

# www subdomain → apex redirect
resource "aws_route53_record" "www" {
  zone_id = data.aws_route53_zone.site.zone_id
  name    = "www.${var.domain_name}"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.site.domain_name
    zone_id                = aws_cloudfront_distribution.site.hosted_zone_id
    evaluate_target_health = false
  }
}
```

## Deployment Workflow

```bash
# 1. Initialize Terraform (downloads providers)
terraform init

# 2. Review the plan — always read this carefully
terraform plan -var-file="prod.tfvars"

# 3. Apply — creates ~15 resources
# ACM validation + CloudFront propagation can take 10–15 min
terraform apply -var-file="prod.tfvars"

# 4. Deploy your site files
aws s3 sync ./dist s3://$(terraform output -raw s3_bucket_name) \
  --delete \
  --cache-control "public, max-age=31536000, immutable"

# 5. Invalidate CloudFront cache (only needed after updates)
aws cloudfront create-invalidation \
  --distribution-id $(terraform output -raw cloudfront_distribution_id) \
  --paths "/*"
```

## Cost Comparison: AWS vs Cloudflare Pages

| Resource | AWS/month | Cloudflare Pages/month |
|---|---|---|
| Storage (S3, 5GB) | ~$0.12 | $0 |
| CloudFront (100GB transfer) | ~$8.50 | $0 |
| Route53 hosted zone | $0.50 | $0 (if domain on CF) |
| ACM certificate | $0 | $0 |
| **Total** | **~$9–15/month** | **$0** |

For a personal portfolio or marketing site, **Cloudflare Pages is the obvious choice**. AWS shines when you need it as part of a larger AWS ecosystem, have compliance requirements, or need advanced CloudFront behaviors like Lambda@Edge.

## Key Takeaways

1. **OAC over OAI** — Always use Origin Access Control for new distributions. OAI is legacy.
2. **ACM in us-east-1** — This trips up almost everyone the first time. Set it as a provider alias.
3. **`create_before_destroy`** — Essential on ACM certificates to avoid downtime during renewal.
4. **SPA routing** — The `custom_error_response` for 403→200 is what makes client-side routing work from S3.
5. **Cache policy** — Use the AWS-managed "Managed-CachingOptimized" policy ID instead of defining your own for simple use cases.

The full Terraform code for this post is available in my [GitHub repository](https://github.com/Carlosposada-Dev).
