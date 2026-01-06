# DailyEdge News Portal – Rendering Strategy Analysis

## Case Study: “The News Portal That Felt Outdated”

DailyEdge is a news and media startup. Our homepage loads fast using **static rendering**, but users reported that the **Breaking News** section often shows outdated headlines. Switching everything to **server-side rendering (SSR)** fixed the content freshness issue, but caused slower page loads and higher hosting costs.

This README analyzes the trade-offs between static, dynamic, and hybrid rendering strategies, and explains how we can balance performance, freshness, and cost using **Next.js App Router data fetching features**.

---

## Rendering Strategies

### 1. Static Site Generation (SSG)
- **How it works:** HTML is generated at build time.
- **Pros:**
  - Extremely fast page loads.
  - Low server costs (can be hosted on static hosting).
- **Cons:**
  - Content can become stale unless rebuilt frequently.
  - Not ideal for pages that need real-time updates (e.g., breaking news).

**Use case:** Pages that rarely change, like an About page, FAQs, or static blog posts.

---

### 2. Server-Side Rendering (SSR)
- **How it works:** HTML is generated on each request.
- **Pros:**
  - Always shows the latest data.
  - Great for dynamic content that changes frequently.
- **Cons:**
  - Slower page loads compared to SSG.
  - Higher server costs due to processing each request.
  
**Use case:** Breaking news sections, live dashboards, or personalized content.

---

### 3. Hybrid Rendering (Incremental Static Regeneration + Dynamic)
- **How it works:** Pages are generated statically but can be **revalidated** or **fetched dynamically**.
- **Pros:**
  - Balance between speed and freshness.
  - Avoids full SSR costs for every request.
- **Cons:**
  - Slight complexity in caching and revalidation logic.

**Use case:** News feed homepage, product catalog, or dashboard sections where some data changes frequently but not on every request.

---

## Next.js App Router Data Fetching Options

Next.js App Router offers **flexible strategies** for balancing freshness and performance:

### 1. `revalidate` (ISR)
- Use `export const revalidate = 60;` to regenerate a static page **every 60 seconds**.
- Perfect for sections like “Breaking News” — fresh enough without hitting the server on every request.

### 2. `cache: "no-store"` (Dynamic Fetching)
- Use `fetch(url, { cache: "no-store" })` for content that must always be fresh.
- Example: personalized dashboard or real-time feed.

### 3. `dynamic` Option
- `export const dynamic = "force-dynamic";` forces server-side rendering.
- `export const dynamic = "force-static";` forces static generation.
- Allows fine-grained control per page or component.

---

## Balanced Solution for DailyEdge

| Page / Component        | Strategy                               | Next.js Implementation Example |
|-------------------------|---------------------------------------|-------------------------------|
| Homepage (News Feed)    | Hybrid – SSG + ISR                     | `export const revalidate = 30;` |
| Breaking News Section   | Dynamic or ISR with short revalidate   | `export const revalidate = 10;` |
| About / Info Pages      | Static SSG                             | `export const dynamic = "force-static";` |
| User Dashboard          | SSR / Dynamic                          | `export const dynamic = "force-dynamic";` |
| Product Catalog         | ISR or SSG depending on update freq   | `export const revalidate = 60;` |

**Approach:**
1. Keep most of the homepage statically generated for speed.
2. Use **ISR with a short revalidate interval** for critical, frequently updated sections.
3. Dynamically fetch content only where real-time updates are required.
4. Avoid full SSR for all pages to reduce server costs.

---

## Implementation Highlights

1. **Static Generation (SSG):**
```js
export const dynamic = "force-static";

export default async function AboutPage() {
  return <h1>About DailyEdge</h1>;
}
