# moneymolz site

astro site. all the editable homepage stuff (net worth + goal, links, bento tiles, the money map, topics, instagram url) lives in `src/data/site.ts`. anything set to `null` there shows "not synced yet" instead of a made-up number. your photo is `public/anmol.jpg`.

the work-with-me page keeps its price, booking link and copy at the top of `src/pages/work-with-me.astro`. the sample dashboard on that page reads from `src/data/demo.ts`, which is clearly marked sample data.

checks: `npm run typecheck`, `npm run lint`, `npm run build`.

## run it locally

    npm install
    npm run dev

open the url it prints (usually http://localhost:4321).

## swap in photos

drop files into `public/` and set `src` in the `photos` list in `src/data/site.ts` (e.g. `'/trip.jpg'`). photos with an empty `src` stay hidden.

## placeholders and "coming soon"

- anything written in `[BRACKETS]` is hidden on the page until you replace it
- a link or resource with `href: '#'` shows "coming soon" instead of a dead link
- "start here" and "what i actually use" only appear once they have real entries

## deploy (github + cloudflare, free)

1. make a new github repo and push this folder to it
2. sign up at cloudflare.com (free) and go to Workers & Pages > create > import a git repo
3. build command: `npm run build`. if it asks for a deploy command, use `npx wrangler deploy` (the `wrangler.jsonc` in this folder is already set up). if you use the older "pages" flow instead, the output directory is `dist`
4. after the first deploy you get a free *.workers.dev (or *.pages.dev) url, so you can check the site before touching the domain

## connect moneymolz.com (registered at porkbun)

1. in cloudflare, add your site (moneymolz.com) on the free plan. it gives you two nameservers
2. in porkbun: domain management > moneymolz.com > nameservers > replace them with cloudflare's two
3. wait for cloudflare to say the domain is active (usually minutes, sometimes a few hours)
4. in your cloudflare project > settings > domains/custom domains > add moneymolz.com (and www.moneymolz.com if you want it)

domain registration stays at porkbun. cloudflare just handles dns and hosting.

## after it's live

- put moneymolz.com in your instagram bio
- replace the `#` links and the [ADD] lines as each piece is ready
