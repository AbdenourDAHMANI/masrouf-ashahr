# 🗄️ Supabase Setup Guide for Masrouf Ashahr

Follow these steps carefully to set up your Supabase database.

---

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click **"Sign in"** or **"Start your project"**
3. Click **"New Project"**
4. Fill in the details:
   - **Name**: `masrouf-ashahr` (or any name you prefer)
   - **Database Password**: Create a strong password and **SAVE IT**
   - **Region**: Choose **Europe (West)** (closest to Algeria)
   - **Pricing Plan**: Free tier is perfect to start
5. Click **"Create new project"**
6. ⏳ Wait 1-2 minutes for the project to initialize

---

## Step 2: Get Your API Credentials

1. Once your project is ready, look for the **⚙️ Settings** icon in the left sidebar
2. Click **API** in the settings menu
3. You'll see two important values:

### **Project URL**
- Looks like: `https://xxxxxxxxxxxxx.supabase.co`
- Copy this entire URL

### **anon/public Key**
- It's a long string starting with `eyJ...`
- Under the section **"Project API keys"** → **"anon public"**
- Click the copy icon to copy it

---

## Step 3: Run the Database Schema

1. In your Supabase project dashboard, find **🔨 SQL Editor** in the left sidebar
2. Click **"New query"**
3. Open the file `supabase/schema.sql` in your code editor
4. **Copy ALL the contents** of that file
5. **Paste** it into the Supabase SQL Editor
6. Click **"Run"** button (or press `Ctrl/Cmd + Enter`)
7. ✅ You should see: **"Success. No rows returned"**

This will create:
- ✅ 4 database tables (packs, pack_items, orders, order_status_history)
- ✅ Row Level Security policies
- ✅ 4 pre-configured packs with all their items (family, student, couple, premium)

---

## Step 4: Verify Your Data

1. Go to **📊 Table Editor** in the left sidebar
2. Click on **packs** table
   - You should see 4 rows: family, student, couple, premium
3. Click on **pack_items** table
   - You should see multiple items (8 for family, 9 for student, etc.)

---

## Step 5: Set Up Environment Variables

1. In your project root, create a file named `.env.local`
2. Copy the contents from `ENV_TEMPLATE.txt`
3. Fill in the values:

```bash
# Paste your Project URL here
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co

# Paste your anon key here
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...your_long_key_here

# Your WhatsApp number (Algerian format: 213XXXXXXXXX)
NEXT_PUBLIC_WHATSAPP_NUMBER=213XXXXXXXXX

# Create a strong admin token (see below)
ADMIN_DASH_TOKEN=your_random_secret_token
NEXT_PUBLIC_ADMIN_DASH_TOKEN=your_random_secret_token
```

### 🔐 Generate Admin Token

Run this in your terminal to generate a secure token:
```bash
openssl rand -hex 32
```

Or just use a strong random password (at least 32 characters).

---

## Step 6: Test Your Setup

Run your development server:
```bash
npm install
npm run dev
```

Then test:
1. **Browse Packs**: Go to http://localhost:3000/packs
   - Should show all 4 packs with images
2. **Click a Pack**: Should show all items with quantities
3. **Try Ordering**: Fill the form and verify it saves to Supabase

---

## 🎉 You're Done!

Your Supabase setup is complete. Next steps:
- Fix admin authentication
- Configure WhatsApp integration
- Deploy to Vercel

---

## ❓ Troubleshooting

### "Invalid API credentials"
- Double-check your `.env.local` file
- Make sure there are no extra spaces in the values
- Restart your dev server after changing `.env.local`

### "No packs showing up"
- Go to Supabase Table Editor → packs table
- Verify data exists
- Check browser console for errors

### "Can't insert orders"
- Check Row Level Security policies are created
- Verify the schema was run completely

