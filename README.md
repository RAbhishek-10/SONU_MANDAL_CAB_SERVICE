# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Backend & database setup

This project now includes a small backend (Vercel-style serverless functions) and a Postgres database using Prisma.

### 1. Provision a Postgres database (Neon recommended)

- Create a new Postgres database on Neon (or Supabase/Render/etc.).
- Copy the connection string.

### 2. Environment variables

Create an `.env` file at the project root (do **not** commit it) with:

```sh
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

# Admin credentials
ADMIN_EMAIL="admin@example.com"
# bcrypt hash of the admin password, e.g. generated with: npx bcrypt-cli 'your-password'
ADMIN_PASSWORD_HASH="$2a$10$REPLACE_WITH_HASH"

# JWT secret for admin auth
JWT_SECRET="a-long-random-secret"
```

### 3. Prisma migrations & client

```sh
npm install
npx prisma migrate dev --name init
npx prisma generate
```

### 4. Deploying backend on Vercel

- Push this repo to GitHub.
- Create a new Vercel project from the repo.
- In Vercel Project Settings → Environment Variables, add the same env vars as above.
- Vercel will expose the serverless functions under:
  - `/api/health`
  - `/api/bookings`
  - `/api/admin/login`
  - `/api/admin/bookings`
  - `/api/admin/bookings/[id]`

The existing frontend booking flows (Contact page, Fare Calculator, floating WhatsApp button) will automatically talk to these APIs and then open WhatsApp with a prefilled message.

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
