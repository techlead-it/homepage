# Contact Form Worker

Cloudflare Worker for handling contact form submissions using Hono, Valibot, and Resend.

## Tech Stack

- **Hono**: Ultra-fast web framework for Cloudflare Workers
- **Valibot**: Lightweight validation library (90% smaller than Zod)
- **Resend**: Email API with React JSX templates
- **TypeScript**: Type safety

## Local Development

### Prerequisites

1. Resend API key: Sign up at [resend.com](https://resend.com) and create an API key

### Setup

1. Copy `.dev.vars.example` to `.dev.vars`:
   ```bash
   cp .dev.vars.example .dev.vars
   ```

2. Edit `.dev.vars` and add your actual values:
   ```env
   RESEND_API_KEY=re_your_actual_api_key
   TO_EMAIL=info@techlead.jp
   ```

3. Run the development server:
   ```bash
   pnpm dev
   ```
   Worker runs at http://localhost:8787

### Testing

Test the contact endpoint with curl:

```bash
curl -X POST http://localhost:8787/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "テスト太郎",
    "email": "test@example.com",
    "company": "テスト株式会社",
    "subject": "サービスについて",
    "message": "これはテストメッセージです。10文字以上必要です。"
  }'
```

## Deployment

### Prerequisites

- Cloudflare account
- Wrangler CLI (installed as dev dependency)

### Steps

1. Login to Cloudflare:
   ```bash
   pnpx wrangler login
   ```

2. Set production secrets:
   ```bash
   pnpx wrangler secret put RESEND_API_KEY
   pnpx wrangler secret put TO_EMAIL
   pnpx wrangler secret put ALLOWED_ORIGIN
   ```

3. Deploy:
   ```bash
   pnpm deploy
   ```

## API

### GET /

Health check endpoint.

**Response:**
```
Contact Form Worker is running
```

### POST /api/contact

Submit a contact form.

**Request Body:**
```json
{
  "name": "山田太郎",
  "email": "yamada@example.com",
  "company": "株式会社サンプル",
  "subject": "サービスについて",
  "message": "お問い合わせ内容"
}
```

**Response (success):**
```json
{
  "success": true,
  "messageId": "xxx"
}
```

**Response (validation error):**
```json
{
  "success": false,
  "error": {
    "issues": [...]
  }
}
```

## Environment Variables

### Development (`.dev.vars`)

- `RESEND_API_KEY`: Resend API key
- `TO_EMAIL`: Email address to receive submissions

### Production (Cloudflare secrets)

- `RESEND_API_KEY`: Resend API key
- `TO_EMAIL`: Email address to receive submissions
- `ALLOWED_ORIGIN`: Production web URL (e.g., https://techlead-it.github.io)
