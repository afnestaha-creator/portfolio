---
name: Contact email delivery
description: The portfolio contact form uses a server-side email integration rather than a browser mailto link
---

Public contact forms should send through the existing server and a managed email connection, keeping the recipient fixed server-side and using the visitor address only as reply-to. Validate and escape all visitor fields before forwarding them to the provider.

**Why:** A browser `mailto:` link depends on the visitor having a configured mail app and does not provide reliable delivery. The connected Resend key is restricted to sending, so domain-management calls are not a valid health check even though email POSTs work.

**How to apply:** Keep the email provider call in the API server, preserve the fixed destination, expose clear success/error states in the form, and verify the send endpoint with a real provider response.