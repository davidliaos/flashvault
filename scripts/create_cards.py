import sqlite3
import uuid
import time
import os

db_path = r"C:\Users\ray41\AppData\Local\hermes\kanban\boards\flashvault\kanban.db"
project_path = r"C:\Users\ray41\Projects\flashvault"

now = int(time.time())

cards = [
    {
        "title": "feat: verify dev server runs and all routes resolve",
        "body": """## Goal
Verify the scaffolded Next.js project runs correctly with `npm run dev` and all routes resolve without errors.

## Context
- **Project:** FlashVault (`C:\\Users\\ray41\\Projects\\flashvault`)
- **Stack:** Next.js 15 + TypeScript + Tailwind CSS 4 + @ruffle-rs/ruffle
- **Port:** 3007 (dev)
- **Key files:** src/app/layout.tsx, src/app/page.tsx, src/app/games/page.tsx, src/app/games/[slug]/page.tsx, src/app/categories/[category]/page.tsx, src/app/about/page.tsx, src/components/GamePlayer.tsx, src/data/games.json

## Steps
1. Run `npm run dev` in the project directory
2. Open http://localhost:3007 — verify homepage loads with game grid
3. Open http://localhost:3007/games — verify game listing page
4. Open http://localhost:3007/games/super-mario-flash — verify game page loads
5. Open http://localhost:3007/categories/action — verify category page
6. Open http://localhost:3007/about — verify about page
7. Run `npm run lint && npx tsc --noEmit && npm run build` — all must pass

## Verification
- All 6 routes load without errors
- Build passes clean
- No TypeScript errors
- No ESLint errors""",
        "priority": 1,
    },
    {
        "title": "feat: add AdSense placeholder slots to layout and game pages",
        "body": """## Goal
Add Google AdSense placeholder ad slots to the layout (header/footer) and game pages. Use placeholder divs with correct AdSense unit dimensions. Do NOT add real AdSense code yet — just the HTML structure.

## Context
- **Project:** FlashVault (`C:\\Users\\ray41\\Projects\\flashvault`)
- **Stack:** Next.js 15 + TypeScript + Tailwind CSS 4
- **Key files:** src/app/layout.tsx, src/app/games/[slug]/page.tsx, src/components/Footer.tsx
- **AdSense requirements:** Real code goes later. For now, add placeholder divs with `data-ad-slot` attributes and correct dimensions.

## Steps
1. Add a leaderboard ad placeholder (728x90) below the header in layout.tsx
2. Add a rectangle ad placeholder (300x250) in the sidebar area of game pages
3. Add a footer ad placeholder in Footer.tsx
4. Style placeholders with dashed border + "Ad" label so they're visible in dev
5. Add comments: `<!-- Replace with real AdSense code when approved -->`

## Verification
- Placeholder divs render on homepage and game pages
- No layout shift or broken styling
- Build passes""",
        "priority": 2,
    },
    {
        "title": "feat: generate sitemap.xml for SEO",
        "body": """## Goal
Generate a dynamic sitemap.xml at `/sitemap.xml` that includes all game pages, category pages, and static pages for SEO.

## Context
- **Project:** FlashVault (`C:\\Users\\ray41\\Projects\\flashvault`)
- **Stack:** Next.js 15 App Router
- **Key files:** src/app/sitemap.ts (new), src/data/games.json
- **Pages to include:** /, /games, /about, /categories/[category], /games/[slug] (all 10 games)

## Steps
1. Create `src/app/sitemap.ts` using Next.js sitemap generation API
2. Read all games from src/data/games.json
3. Generate URLs for: homepage, /games, /about, all category pages, all game pages
4. Set `changeFrequency` to 'weekly' for game pages, 'monthly' for others
5. Set `priority`: 1.0 for homepage, 0.8 for game pages, 0.5 for categories
6. Verify at http://localhost:3007/sitemap.xml

## Verification
- /sitemap.xml returns valid XML
- All 10 game URLs present
- All 4 category URLs present
- Homepage, /games, /about present
- Valid XML structure (can validate with W3C validator)""",
        "priority": 2,
    },
    {
        "title": "feat: add Open Graph and Twitter Card meta tags",
        "body": """## Goal
Add Open Graph and Twitter Card meta tags to all pages for rich social sharing previews.

## Context
- **Project:** FlashVault (`C:\\Users\\ray41\\Projects\\flashvault`)
- **Stack:** Next.js 15 Metadata API
- **Key files:** src/app/layout.tsx, src/app/page.tsx, src/app/games/[slug]/page.tsx, src/app/categories/[category]/page.tsx

## Steps
1. Add default OG tags to root layout (og:title, og:description, og:type, og:url, og:site_name)
2. Add og:image pointing to a default flashvault-og.png (create a simple placeholder)
3. Add Twitter Card meta tags (twitter:card, twitter:title, twitter:description, twitter:image)
4. Override OG tags in game [slug] page with game-specific title, description
5. Override OG tags in category pages with category-specific data
6. Verify with Facebook Sharing Debugger or metatags.io

## Verification
- View page source on homepage — OG tags present
- View page source on game page — game-specific OG tags present
- No missing required OG properties""",
        "priority": 2,
    },
    {
        "title": "feat: deploy to Cloudflare Pages",
        "body": """## Goal
Deploy FlashVault to Cloudflare Pages for free hosting.

## Context
- **Project:** FlashVault (`C:\\Users\\ray41\\Projects\\flashvault`)
- **Stack:** Next.js 15 (static export or Cloudflare adapter)
- **Hosting:** Cloudflare Pages (free tier)
- **Build command:** `npm run build`
- **Output directory:** `.next` (or `out` for static export)

## Steps
1. Install `@cloudflare/next-on-pages` adapter: `npm install -D @cloudflare/next-on-pages`
2. Update next.config.ts for Cloudflare compatibility
3. Run `npx @cloudflare/next-on-pages --experimental-minify` to verify build
4. If Cloudflare adapter is problematic, switch to `output: 'export'` in next.config.ts for static HTML
5. Create Cloudflare Pages project, connect to GitHub repo
6. Set build command: `npm run build`, output: `out` (for static) or `.next` (for adapter)
7. Verify deployment at *.pages.dev URL

## Verification
- Site live on Cloudflare Pages URL
- All pages load correctly
- Game pages render (Ruffle may need CDN fallback for WASM)
- No console errors""",
        "priority": 3,
    },
    {
        "title": "data: add 10 more games from Internet Archive",
        "body": """## Goal
Expand the game catalog from 10 to 20 games by adding 10 more classic Flash games from Internet Archive.

## Context
- **Project:** FlashVault (`C:\\Users\\ray41\\Projects\\flashvault`)
- **Key file:** src/data/games.json
- **Source:** https://archive.org/details/softwarelibrary_flash
- **Schema:** Each game needs: slug, title, description, category, year, creator, archiveUrl, swfUrl, thumbnail, tags

## Steps
1. Browse Internet Archive Flash collection for 10 additional popular games
2. For each game, find the direct .swf download URL (format: https://archive.org/download/{item_id}/{file}.swf)
3. Add entries to src/data/games.json following existing schema
4. Ensure categories are consistent with existing ones (action, platformer, puzzle, strategy) or add new ones
5. Run `npm run build` to verify all new game pages generate correctly

## Verification
- games.json has 20 entries
- All new game pages build without errors
- `npm run build` exits 0
- New games appear on homepage and /games""",
        "priority": 3,
    },
]

conn = sqlite3.connect(db_path)

for card in cards:
    task_id = str(uuid.uuid4())[:12]
    conn.execute(
        """INSERT INTO tasks (id, title, body, assignee, status, priority, created_by, created_at, workspace_kind, workspace_path, kind)
           VALUES (?, ?, ?, ?, 'todo', ?, 'jarvis', ?, 'dir', ?, 'task')""",
        (task_id, card["title"], card["body"], "builder", card["priority"], now, project_path)
    )
    conn.execute(
        """INSERT INTO task_events (task_id, kind, payload, created_at)
           VALUES (?, 'created', 'Card created by Jarvis during project scaffold', ?)""",
        (task_id, now)
    )
    print(f"Created card: {task_id} — {card['title']}")

conn.commit()
conn.close()
print(f"\n{len(cards)} cards created on flashvault board.")
