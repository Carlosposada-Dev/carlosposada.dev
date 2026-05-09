import { defineCollection, z } from "astro:content";

/**
 * Blog Content Collection schema.
 * Each .md or .mdx file in src/content/blog/ must include these frontmatter fields.
 */
const blog = defineCollection({
  type: "content",
  schema: z.object({
    /** Post title — used in <h1>, OG, and listing cards */
    title: z.string(),
    /** Short description for listing cards, meta description, and OG */
    description: z.string(),
    /** Publication date — ISO format e.g. 2026-05-01 */
    publishedDate: z.coerce.date(),
    /** Optional update date — shown as "Updated" in post header */
    updatedDate: z.coerce.date().optional(),
    /** Post category for filtering */
    category: z.enum(["DevOps", "Cloud", "QA", "AI"]),
    /** Tags for filtering and related post suggestions */
    tags: z.array(z.string()),
    /** If true, featured post slot in blog listing */
    featured: z.boolean().default(false),
    /** If true, post is hidden from listing (draft mode) */
    draft: z.boolean().default(false),
    /** Cover image URL — shown in featured card and post header */
    coverImage: z.string().optional(),
    /** Alt text for cover image */
    coverImageAlt: z.string().optional(),
    /** Reading time — auto-computed at build if omitted */
    readingTime: z.string().optional(),
  }),
});

export const collections = { blog };
