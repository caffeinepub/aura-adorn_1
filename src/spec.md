# Specification

## Summary
**Goal:** Build a responsive affiliate marketing website branded as "aura&adorn" for browsing fashion, jewelry, and luxury products, with an admin area to manage affiliate listings.

**Planned changes:**
- Create a luxury-themed, responsive frontend with Home, category pages (Fashion/Jewelry/Luxury), product details views, and clear navigation.
- Implement affiliate browsing UX: product grids/cards per category and a product details view with an outbound “Shop/View Offer” link that opens in a new tab.
- Add a Motoko backend product model with persistence and CRUD + query methods (list by category, fetch by id).
- Add an admin-only UI gated by Internet Identity to create/edit/delete products and reflect changes in the public listings.
- Add an Affiliate Disclosure page and a footer disclosure snippet in English.
- Add generated brand assets under `frontend/public/assets/generated`, wire them into the header/hero and set favicon/app icon.

**User-visible outcome:** Visitors can browse curated affiliate products by category and open external offers; authenticated admins can log in with Internet Identity to manage product listings; the site includes affiliate disclosure content and consistent luxury styling.
