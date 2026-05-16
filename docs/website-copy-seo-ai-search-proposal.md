# Vincent Lo Media Website Copy, SEO, and AI Search Proposal

Prepared May 15, 2026 for the current Next.js rebuild and live Squarespace site.

## Executive Summary

Vincent Lo Media already has the strongest ingredient most local creative businesses struggle to find: a clear, credible point of view. The best conversion angle is not simply "photography and video." It is: **powerlifting meet media shot by a competitive powerlifter who knows what lifters, coaches, gyms, and brands actually care about.**

The current rebuild communicates this better than the live Squarespace site, but it can be tightened for three goals:

1. **Conversion:** make the buying path clearer for athletes who are nervous, rushed, or comparing packages before a meet.
2. **SEO:** create page-specific search signals for powerlifting photography, powerlifting videography, meet photos, static lift videos, highlight reels, event names, and Victoria/BC/Canada coverage.
3. **AI/agentic search:** make the site easy for answer engines and AI agents to summarize, cite, and route users through by using direct, factual, structured, visible copy.

External search guidance used:

- Google says eligibility for AI Overviews and AI Mode uses the same foundation as Google Search: indexable pages, technical SEO, helpful people-first content, textual content, high-quality media, and structured data that matches visible page content. Source: https://developers.google.com/search/docs/appearance/ai-features
- Google recommends Organization and LocalBusiness structured data to help identify the business, logo, contact details, location, and relevant organization facts. Sources: https://developers.google.com/search/docs/appearance/structured-data/organization and https://developers.google.com/search/docs/appearance/structured-data/local-business
- Bing's 2026 AI Performance guidance emphasizes clear headings, tables, FAQs, evidence, freshness, and reduced ambiguity across text, images, and video. Source: https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview

## Current Audit

### Live Squarespace Site

The live home page is image-heavy and gives search engines very little explanatory copy. The main readable positioning is "Powerlifter / Photographer / Content Creator" and "Media Packages For Sale." The store page has product names and prices, but limited buyer guidance. The about page has a strong personal story, including Vincent's powerlifting background and IPF Junior World Championships context, but that credibility is not fully carried into the home/store buying flow.

Conversion issue: a visitor can see that media is for sale, but the site does not quickly answer "which package should I buy?", "what do I get?", "when do I get it?", or "why this photographer?"

SEO issue: image galleries dominate the live site, so important service and location signals are underdeveloped.

### Current Next.js Rebuild

Strengths:

- Strong hero: "Powerlifting Meet Photography & Video Packages."
- Clear trust signals: shot by a competitive powerlifter, delivery windows, Google Drive delivery.
- Package chooser maps intent to package categories.
- Package cards include prices, deliverables, delivery windows, examples, and badges.
- About page has strong differentiated positioning.
- FAQ already answers high-intent buyer questions.
- Meet-specific route template exists at `/meet/[slug]`.

Gaps:

- All rendered pages currently use the same global title and description; page-specific metadata exists in comments/data but is not wired.
- No visible canonical links, Open Graph/social metadata, sitemap, robots file, or structured data.
- Placeholder testimonials should not ship as real social proof.
- Meet-specific pages use mocked/TBD data and reference package IDs that do not exist in the current package catalog.
- The copy is sometimes clever when it should be explicit. AI search and high-intent SEO reward clear factual statements.
- There are not enough location phrases: Victoria, BC, Vancouver Island, British Columbia, Canada, travel available.
- There are not enough event-name landing pages for product/event search queries.

## Recommended Positioning

### Primary One-Liner

Powerlifting meet photography and video in Victoria, BC and across Canada, shot by a competitive powerlifter who knows the platform.

### Short Brand Description

Vincent Lo Media captures powerlifting competitions, gym events, athlete content, and sports media for lifters, coaches, gyms, teams, and brands. Packages include edited competition photos, handheld/static lift videos, cinematic highlight reels, and custom event coverage.

### Differentiator

Most photographers capture the lift after it happens. VLM knows the setup, attempt selection, platform timing, judging moments, and emotion behind the bar because Vincent competes too.

## Proposed Home Page Copy

### Metadata

Title:
Powerlifting Meet Photography & Video in Canada | Vincent Lo Media

Description:
Book powerlifting meet photography, static lift videos, and cinematic highlight reels in Victoria, BC and across Canada. Shot by competitive powerlifter Vincent Lo. Packages from $15 CAD.

### Hero

Eyebrow:
Powerlifting media by a competitive powerlifter

H1:
Powerlifting Meet Photography & Video

Subhead:
Competition-day photos, static lift videos, and highlight reels for lifters who want every attempt captured cleanly, on time, and from someone who understands the sport.

Primary CTA:
Shop Meet Packages

Secondary CTA:
See Photo & Video Samples

Trust strip:

- Based in Victoria, BC
- Available for meets across Canada
- Photos delivered in 7-14 days
- Static videos delivered in 14-21 days
- Highlight reels delivered in up to 45 days
- All files delivered by Google Drive

### Package Chooser

Section heading:
Choose the package that matches your meet.

Intro:
Not sure what to buy? Start with the result you want: photos for memories, static videos for coach review, a highlight reel for social, or a full bundle for everything.

Cards:

Best Value:
Edited photos plus video in one discounted order. Best for lifters who want the full meet documented.

Photos Only:
Edited competition photos from your session, including platform moments, attempts, reactions, and detail shots.

Video Only:
Static lift videos for coach review, single-attempt clips, or cinematic highlight reels for social.

Social Media:
Reels and clips edited for Instagram, TikTok, athlete pages, and meet recaps.

Coach Review:
Clean handheld/static videos of attempts so you and your coach can review bar path, depth, setup, and execution.

Custom Event:
Custom coverage for gyms, teams, brands, private meets, strength events, and athlete shoots.

### Featured Packages

Current heading:
The three everyone buys.

Recommended heading:
Popular packages for meet day.

Intro:
These are the easiest starting points for most lifters: the full media bundle, photos plus static videos, or a complete video package.

### Samples

Heading:
See the exact kind of media you get.

Intro:
Browse real VLM competition photos, static videos, and highlight reels so you know what will be delivered before you order.

Photo tab note:
Edited powerlifting photos from real meets, delivered in a private Google Drive folder.

Highlight reel tab note:
Music-synced, color-graded reels built around your best squat, bench, and deadlift attempts.

Static video tab note:
Handheld/static lift videos from the platform, useful for coaches, technique review, and simple social posting.

### Process

Heading:
From platform to inbox in three steps.

Step 1:
Book your package.
Choose the package that fits your meet, event, or athlete goal. Checkout is handled through the VLM store.

Step 2:
Compete.
Vincent shoots the platform moments that matter: setup, attempts, lockouts, reactions, and the story around the lift.

Step 3:
Download your media.
Your edited files arrive by private Google Drive link, organized for download, sharing, and posting.

### Custom Events

Heading:
Powerlifting is the foundation. Sports media is the future.

Body:
VLM also creates custom photo and video coverage for gyms, brands, teams, athlete campaigns, private events, and other strength sports. If the shoot needs someone who understands training culture, competition nerves, and the moments athletes actually care about, VLM can build a day-of media package around it.

CTA:
Plan a Custom Shoot

## Proposed Packages Page Copy

### Metadata

Title:
Powerlifting Photography & Video Packages | Vincent Lo Media

Description:
Compare powerlifting meet media packages from Vincent Lo Media. Edited photos, static lift videos, highlight reels, bundles, bench-only options, and custom event coverage from $15 CAD.

### Header

H1:
Powerlifting Media Packages

Subhead:
Book edited meet photos, static lift videos, highlight reels, and discounted bundles for upcoming powerlifting competitions.

Support line:
All prices in CAD. All media delivered by private Google Drive link.

### Buying Guidance Block

Add near the top:

Which package should you choose?

- Choose **Ultimate Package** if you want photos, static videos, and a highlight reel.
- Choose **Edited Photo Package** if you mainly want memories and social posts.
- Choose **9 Lift Static Videos** if your coach needs every attempt.
- Choose **3 Lift Highlight Reel** if you want a polished recap for Instagram or TikTok.
- Choose **Single Photo** or **Single Attempt Video** if you want to start small.

### Package Card Copy Pattern

For every card, keep these five scannable fields visible:

- Best for: who should buy it
- Includes: exact deliverables
- Delivery: timing
- Format: Google Drive, social-ready, static/handheld, etc.
- Price: CAD, sale if applicable

Example revised product copy:

Ultimate Package (All Media)

Tagline:
The full meet-day media bundle.

Description:
Best for lifters who want everything from competition day: edited photos, handheld/static lift videos, and a cinematic highlight reel built around your strongest attempts.

Best for:
Athletes who want memories, coach review footage, and social-ready content in one order.

Includes:
Edited competition photos, static/handheld lift videos, and one music-synced highlight reel.

## Proposed About Page Copy

### Metadata

Title:
About Vincent Lo | Powerlifting Photographer in Victoria, BC

Description:
Meet Vincent Lo, a competitive powerlifter and photographer based in Victoria, BC. VLM captures powerlifting meets, athlete media, gym content, and custom sports events across Canada.

### Hero

Eyebrow:
The athlete behind the lens

H1:
Shot by someone who has stood on the platform.

Body:
Vincent Lo Media is run by Vincent Lo, a competitive powerlifter and photographer based in Victoria, BC. Vincent has competed, coached his own attempts, felt meet-day nerves, and knows which moments matter before, during, and after a lift.

### Story

Recommended rewrite:

Vincent started shooting powerlifting because he knew what lifters were missing from most meet galleries: the setup, the strain, the timing, the small reactions, and the feeling of earning a total.

Powerlifting is not just a barbell at lockout. It is the walkout, the brace, the judge's commands, the third-attempt pressure, the coach's reaction, and the seconds after the lift when everything hits. VLM is built around capturing that full story.

That athlete-first perspective now carries into gym shoots, brand work, team coverage, strength-sport events, and custom content for people who care about training culture.

Credential block:

- Competitive powerlifter
- Based in Victoria, BC
- Available for travel across Canada
- 20+ meets covered
- 1,000+ competition photos delivered
- Photo, static video, highlight reel, and custom event coverage

## Proposed Contact Page Copy

### Metadata

Title:
Book Powerlifting Meet Coverage or Custom Sports Media | Vincent Lo Media

Description:
Contact Vincent Lo Media to book powerlifting meet photography, static lift videos, highlight reels, gym shoots, brand campaigns, team coverage, and custom sports events.

### Header

H1:
Book Meet Coverage or a Custom Shoot

Subhead:
Tell VLM what you are competing in, hosting, launching, or building. Vincent will help you choose the right media package or quote a custom shoot.

### Form Helper Copy

Placeholder:
Tell VLM the meet name, date, location, what you want captured, and whether you need photos, video, a highlight reel, or custom coverage.

Sidebar:
For standard meet packages, order through the package page. For event coverage, brand work, private shoots, or questions before ordering, use this form or email directly.

Response note:
Replies usually arrive within 1-2 business days.

## Proposed Meet Landing Page Template

These pages are a major SEO and AI-search opportunity. Create one clean landing page for each upcoming meet or recurring venue/event.

URL pattern:
/meet/kraken-open-2026
/meet/victoria-barbell-open
/meet/last-chance-meet

Metadata pattern:
[Meet Name] Photography & Video Packages | Vincent Lo Media

Description pattern:
Book [Meet Name] powerlifting photography and video coverage in [Location]. Edited photos, static lift videos, highlight reels, and bundles available from Vincent Lo Media.

Hero:

H1:
[Meet Name] Photography & Video Packages

Subhead:
VLM is offering competition-day photos, static lift videos, highlight reels, and bundle packages for [Meet Name] in [City, Province].

Important details table:

- Meet: [Name]
- Location: [Venue, City, Province]
- Date: [Exact date]
- Booking deadline: [Exact date]
- Delivery: Photos 7-14 days, static videos 14-21 days, highlight reels up to 45 days
- Delivery method: Google Drive

CTA:
Book Coverage for [Meet Name]

## FAQ Additions

Add these to support long-tail SEO and AI answer retrieval:

### Do I need to order before the meet?

Ordering before the meet is the best way to guarantee coverage. Post-meet orders may be available if VLM was present and captured the attempt, but availability is not guaranteed.

### What is a static lift video?

A static lift video is a clean handheld or fixed-angle clip of a lift attempt. Lifters use static videos for coach review, form analysis, attempt recaps, and simple social posting.

### What is included in a highlight reel?

A highlight reel is an edited, music-synced video built from your best competition moments. Depending on the package, it may include squat, bench, deadlift, platform reactions, and meet-day atmosphere.

### Can gyms or brands book Vincent Lo Media?

Yes. VLM offers custom coverage for gyms, teams, brands, athlete campaigns, private meets, strength events, and other sports media projects.

### Where is Vincent Lo Media based?

Vincent Lo Media is based in Victoria, British Columbia, Canada, and is available for select travel depending on the meet, event, and project scope.

## SEO and AI Search Implementation Recommendations

### High Priority

1. Wire page-specific metadata from `src/data/seo.ts` into each route.
2. Add canonical URLs for `/`, `/packages`, `/about`, `/contact`, and meet pages.
3. Add `robots.txt` and `sitemap.xml` generation.
4. Add Organization or LocalBusiness JSON-LD on the home page with name, URL, logo, email, Instagram, description, and Victoria/BC/Canada location details.
5. Add Product or Service structured data only where the visible page accurately shows the same product name, price, currency, and description.
6. Replace placeholder testimonials with real reviews or remove the section before launch.
7. Build meet-specific landing pages with real dates, locations, deadlines, and package availability.

### Medium Priority

1. Add concise "Best for" fields to packages.
2. Add an event/location page for "Victoria powerlifting photography" and "BC powerlifting videography" if VLM wants local search traffic.
3. Add alt text that describes the visible subject where images are content, not decoration.
4. Add a short visible business facts section in the footer or about page:
   - Business name
   - Service area
   - Main services
   - Email
   - Instagram
   - Delivery method
5. Keep dates and event pages current after every meet.

### AI/Agentic Search Notes

Do not chase a fake "AI SEO" hack. The useful approach is to make the site answerable:

- Put important facts in visible text, not only images or videos.
- Use specific headings: "What is included?", "Delivery times", "Where VLM shoots", "Which package should I buy?"
- Use tables or lists for package comparison.
- Keep product names, prices, dates, and event names consistent across page copy, metadata, structured data, and checkout.
- Create pages for real buyer questions and real events.
- Verify the site in Google Search Console and Bing Webmaster Tools. Bing now has AI Performance reporting for citations and grounding queries.

## Target Search Queries

Primary:

- powerlifting photography
- powerlifting photographer
- powerlifting videographer
- powerlifting meet photography
- powerlifting meet video
- powerlifting highlight reel
- static lift video
- powerlifting photos Canada
- powerlifting photographer Victoria BC
- powerlifting media packages

Event/local:

- Kraken Open photography
- Kraken Open powerlifting video
- Victoria Barbell meet photography
- Last Chance Meet powerlifting photos
- powerlifting photographer British Columbia
- gym photography Victoria BC
- sports photographer Victoria BC

Buyer-intent:

- book powerlifting photographer
- powerlifting meet photo package
- powerlifting video package
- buy powerlifting meet photos
- powerlifting competition highlight reel
- powerlifting static videos for coach

## Recommended Next Build Tasks

1. Implement the metadata and structured-data layer.
2. Add sitemap and robots generation.
3. Replace home/package/about/contact copy using the proposed wording.
4. Add real testimonials or remove the placeholder testimonial block.
5. Convert `/meet/[slug]` from mocked data to real event data.
6. Add package comparison copy and "Best for" fields.
7. Create first real event landing pages for Kraken Open 2026, Last Chance Meet, and Victoria Barbell.

