# ⚡ Quick Start - Masrouf Ashahr

## 🎯 What You Need to Do (In Order)

### ✅ Step 1: Supabase Setup (15 minutes)

1. **Create Account**: [supabase.com](https://supabase.com) → New Project
2. **Get Credentials**: Settings → API → Copy URL + anon key
3. **Run SQL**: SQL Editor → Paste `supabase/schema.sql` → Run
4. **Verify**: Table Editor → Check `packs` has 4 rows

📖 **Detailed guide**: See `SUPABASE_SETUP.md`

---

### ✅ Step 2: Environment Setup (5 minutes)

1. Create `.env.local` in project root
2. Copy from `ENV_TEMPLATE.txt`
3. Fill in your Supabase URL and key
4. Add WhatsApp number: `213XXXXXXXXX`
5. Generate admin token: `openssl rand -hex 32`

---

### ✅ Step 3: Test Locally (5 minutes)

```bash
npm install
npm run dev
```

Visit:
- http://localhost:3000 - Home page
- http://localhost:3000/packs - All packs
- http://localhost:3000/packs/family - Family pack details

---

## 🚀 After That's Working

- [ ] Fix admin authentication (currently broken)
- [ ] Test WhatsApp integration
- [ ] Deploy to Vercel
- [ ] Add custom domain (optional)

---

## 📞 Need Help?

Check the detailed guides:
- `SUPABASE_SETUP.md` - Complete Supabase setup
- `README.md` - General project info

---

## 🔍 Current Status

**What's Working:**
- ✅ Database schema (updated with all pack items)
- ✅ All pages created
- ✅ Order flow
- ✅ Tracking system

**What Needs Fixing:**
- ⚠️ Admin panel authentication
- ⚠️ Environment variables (you need to set them)
- ⚠️ WhatsApp number configuration

---

## 🎨 Project Structure

```
masrouf-ashahr/
├── src/app/
│   ├── page.tsx              # Home page
│   ├── packs/                # Browse packs
│   ├── order/                # Order form
│   ├── track/                # Track orders
│   └── admin/                # Admin dashboard
├── supabase/
│   └── schema.sql            # Database schema (UPDATED! ✨)
├── ENV_TEMPLATE.txt          # Environment template
├── SUPABASE_SETUP.md         # Detailed setup guide
└── QUICK_START.md            # This file
```

