# Design direction: Giri Ismoyo Craft (Home)

Audience: importers, retailers, hotel buyers, interior designers. They judge quality and reliability, not entertainment.
Feel: a printed trade-fair catalogue from a small, serious workshop. Calm, tactile, photo-led. Not a startup landing page.

## Visual language (taken from the company's own profile PDF)
- Background cream #f3e6d8, ink #2b1d14, one brown block #6b5a47, one accent tan #b8935f. Yellow #e6c229 ONLY for small hang-tag details. No other colors.
- Photo frames with ONE large rounded corner (top-right or bottom-left, radius ~64px), other corners square. This is the signature shape. Use it consistently.
- Type: serif display (Newsreader or Fraunces) for headlines, a plain grotesk (Instrument Sans or DM Sans) for body. Not Inter, not Poppins. Max 2 families, max 3 sizes per section.
- Layout: asymmetric 12-column grid, left-aligned text, photos bleeding off one edge, generous whitespace. Overlap one small photo over a large one like the PDF cover.

## Sizing & balance (hard limits)
- Container: max-w-[1120px] mx-auto px-6 md:px-10. Section padding py-12 md:py-16.
- Only 3 text sizes per page: headings text-3xl (hero H1 text-4xl md:text-5xl max), body text-base, small text-sm. Nothing above text-5xl.
- Paragraphs: max-w-prose, leading-relaxed.
- Photos: always aspect ratio + object-cover, never taller than 480px on desktop, never h-screen.
- In every two-column block the photo takes 5 or 6 of 12 columns and its height is close to the text height.
- Only the hero photo may touch the page edge. All other photos stay inside the container.
- ONE rounded corner (radius 64px) per section, on one photo only.
- No whitespace-nowrap on rows of text. Multi-item rows use grid with min-w-0.
- Missing-photo fallback: Use a tan fallback block (same aspect ratio) only if no suitable existing file is found, and list it in the report.
- Featured products may use an uneven mosaic of photos. The 3-equal-cards ban still applies to text cards.

## Banned (these make it look AI-generated)
- Gradients, glassmorphism, glow, drop-shadow stacks, blobs
- Emoji or icon-in-circle feature cards, 3-equal-cards-in-a-row grids
- Centered-everything layouts, "Welcome to", "Discover", "Elevate", "Unlock", "Seamless"
- Stat counters, fake testimonials, fake logos, star ratings, "trusted by"
- Use only photos that already exist in public/, public/editorial/ and src/assets/SHOP/. No stock photos, no AI images.
- Scroll-jacking, parallax, cursor effects, typewriter text, auto-playing carousels
- Placeholder lorem ipsum

## Motion
Only: fade + 12px upward translate on first view (200-300ms), hover underline on links, image scale 1.02 on hover. Respect prefers-reduced-motion.

## Content rules
- Use ONLY the copy given in my prompts. Never invent claims, numbers, prices, certifications, client names, or contact details.
- Use a tan fallback block (same aspect ratio) only if no suitable existing file is found, and list it in the report.
- Contact data comes from src/config/contact.ts (create it with TODO values: EMAIL, WHATSAPP, ADDRESS). Never hardcode.
- Buttons: one primary per section, solid #2b1d14 with cream text, square corners. Secondary = text link with underline.

## Code rules
- New components in src/components/home/, each under 150 lines, Tailwind only, no new dependencies.
- Edit HomePage.tsx minimally (imports and order). Keep Header and Footer untouched.
- After each task: run the build, report only errors, answer in max 5 lines.