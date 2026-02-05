# Specification

## Summary
**Goal:** Provide clearer in-app guidance and navigation so admins can quickly find and complete the workflow for adding products.

**Planned changes:**
- Add a concise “How to add products” help/instructions section at the top of the /admin Product Management page, including step-by-step instructions and a clear list of required fields (Product Name, Category, Description, Image URL, Affiliate URL) vs optional fields (Brand, Price), noting that Image URL and Affiliate URL must be valid URLs.
- Rename the admin-only header navigation label from “Admin” to “Manage Products” (still routes to /admin) in both desktop and mobile navigation.
- On category pages (/fashion, /jewelry, /luxury), when there are zero products and the viewer is an admin, add a secondary empty-state call-to-action that links to /admin to add the first product.

**User-visible outcome:** Admins see clear instructions on /admin for adding products, can find “Manage Products” more easily in the header (desktop/mobile), and get a direct “add the first product” button in empty category pages when logged in as an admin.
