# TJ Anderson's Central PA Lions Academy

Production-ready Next.js (App Router) website and admin CMS for Central PA Lions youth basketball.

## Stack

- Next.js 15 + TypeScript + Tailwind CSS v4
- MongoDB Atlas + Mongoose
- NextAuth credentials admin auth (bcrypt)
- MongoDB-stored admin images (`/api/upload`, served at `/api/uploads/…`) — works on Vercel without disk writes
- Nodemailer (Gmail App Password)
- Framer Motion, React Hook Form, Zod

## Quick Start

```bash
npm install
cp .env.example .env.local
# Edit .env.local with MongoDB, NEXTAUTH_SECRET, admin + email credentials
npm run seed
npm run create-admin
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)  
Admin: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

## Environment Variables

See `.env.example`. Important values:

| Variable | Purpose |
| --- | --- |
| `MONGODB_URI` | MongoDB Atlas connection string |
| `NEXTAUTH_SECRET` | Auth.js session secret |
| `NEXTAUTH_URL` | Site URL (local or production) |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Initial admin (create-admin script) |
| `SMTP_USER` / `SMTP_PASSWORD` | SMTP login (Gmail: use an [App Password](https://myaccount.google.com/apppasswords)) |
| `SMTP_HOST` / `SMTP_PORT` | Default Gmail: `smtp.gmail.com` / `587` |
| `SMTP_FROM` | From header, e.g. `"Central PA Lions Academy <you@gmail.com>"` |
| `CONTACT_RECEIVER_EMAIL` | Inbox for registration & contact forms (default: `tjandersty@gmail.com`) |
| `CLOUDINARY_*` | Optional legacy; admin images use MongoDB upload API instead |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for SEO/sitemap (must match live domain) |

Without MongoDB, the public site still renders using built-in default content. Forms and admin persistence require MongoDB.

### Gmail SMTP setup

1. Turn on **2-Step Verification** for the Gmail account.
2. Create an **App Password**: [Google App Passwords](https://myaccount.google.com/apppasswords) → Mail → Other (Central PA Lions).
3. In `.env.local`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your@gmail.com
SMTP_PASSWORD=xxxx xxxx xxxx xxxx
SMTP_FROM="Central PA Lions Academy <your@gmail.com>"
CONTACT_RECEIVER_EMAIL=tjandersty@gmail.com
```

4. Restart `npm run dev`.
5. Admin → **Settings** → **Send test email** to verify.

Other providers (SendGrid, Outlook, etc.): set `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE` (`true` for port 465), and credentials accordingly.

## Brand Assets

Place client assets in `public/images/`:

- `logo.png` — Central PA Lions logo (provided)
- `hero-bg.jpg` — cinematic court background (provided)
- `hero-reference.jpg` — optional reference/action image

Update hero and program images via **Admin → Settings / Programs** (upload, then **Save**). Images are stored in MongoDB and served from `/api/uploads/…`.

## Admin Portal

Routes under `/admin` (login required):

- Dashboard, settings, programs, pricing, team, testimonials, blog, FAQs, events, achievements, gallery, sponsors
- Registration inquiries, contact messages, newsletter
- Navigation/footer/branding controls (extend placeholder screens as needed)

## Deployment (Vercel)

1. Push the repo to GitHub and import the project in Vercel.
2. Set **Production** environment variables (same names as `.env.example`):
   - `MONGODB_URI` — MongoDB Atlas (Network Access: allow Vercel / `0.0.0.0/0` for serverless)
   - `NEXTAUTH_SECRET` — long random string (`openssl rand -base64 32`)
   - `NEXTAUTH_URL` — `https://your-domain.com` (no trailing slash)
   - `NEXT_PUBLIC_SITE_URL` — same as `NEXTAUTH_URL`
   - `ADMIN_EMAIL` / `ADMIN_PASSWORD` — for bootstrap only
   - `SMTP_*` and `CONTACT_RECEIVER_EMAIL` — form email notifications
3. Deploy (build command: `npm run build`, output: Next.js default).
4. **One-time database setup** (from your machine with env pointing at production MongoDB):
   ```bash
   npm run seed
   npm run create-admin
   ```
5. Sign in at `https://your-domain.com/admin/login`, edit content, upload images, save settings.
6. Local production smoke test before deploy:
   ```bash
   npm run build
   npm start
   ```

**Note:** Do not commit `.env.local`. Image uploads up to 8MB are stored in MongoDB (keep Atlas on a tier that supports document size).

## Scripts

- `npm run dev` — development server
- `npm run build` / `npm start` — production
- `npm run seed` — seed MongoDB content
- `npm run create-admin` — create/update admin user from env credentials

## Project Structure

```
app/(public)/     Public marketing pages
app/admin/        Admin login + CMS
app/api/          Auth + uploads
components/       UI, layout, sections, forms
lib/              DB, auth, data queries, email, cloudinary
models/           Mongoose schemas
actions/          Server actions (forms + admin)
scripts/          seed + admin bootstrap
public/images/    Logo and hero photography
```

## Support

Contact TJ Anderson — 814-500-8613 — tjandersty@gmail.com
