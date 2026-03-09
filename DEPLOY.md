# Deployment Guide — AI Fortune Teller

## Prerequisites
- Node.js 18+
- OpenAI API key with GPT-4o access

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Create environment file
cp .env.local.example .env.local

# 3. Add your OpenAI API key to .env.local
OPENAI_API_KEY=sk-your-key-here

# 4. Start dev server
npm run dev

# Open http://localhost:3000
```

---

## Deploy to Vercel

### Option A — Vercel CLI (fastest)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Set environment variable
vercel env add OPENAI_API_KEY
# Paste your key when prompted, select all environments

# Deploy to production
vercel --prod
```

### Option B — Vercel Dashboard (via GitHub)

1. Push code to a GitHub repository
2. Go to https://vercel.com/new
3. Import your GitHub repository
4. In **Environment Variables**, add:
   - Key: `OPENAI_API_KEY`
   - Value: `sk-your-key-here`
5. Click **Deploy**

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `OPENAI_API_KEY` | Yes | Your OpenAI API key. Needs access to `gpt-4o`. |

---

## Cost Estimate

Each reading uses GPT-4o with a high-detail image.
- ~1,000–2,000 input tokens (image + prompt)
- ~400–600 output tokens (fortune text)
- Approximate cost: **$0.01–0.02 per reading**

---

## Customization

### Change the reading limit
In `app/page.tsx`, change:
```ts
const READING_LIMIT = 3;
```

### Change the AI model
In `app/api/fortune/route.ts`, change:
```ts
model: "gpt-4o",
// Options: "gpt-4o", "gpt-4o-mini", "gpt-4-turbo"
```

### Change the fortune prompt
In `app/api/fortune/route.ts`, edit the `FORTUNE_PROMPT` constant.
