# EmailJS Setup Guide

## Step-by-Step EmailJS Configuration

### 1. Create EmailJS Account
- Go to [https://www.emailjs.com/](https://www.emailjs.com/)
- Sign up for free account
- Verify your email

### 2. Add Gmail Service
1. In EmailJS dashboard → **Email Services**
2. Click **Add New Service**
3. Select **Gmail**
4. Configure:
   - **Service Name**: `Bungalow Tehei Gmail`
   - **Service ID**: (will be generated - copy this)
   - **User ID**: `bungalowtehei@gmail.com`
   - **Access Token**: `owlp jgcn czmw oycb`
5. Click **Add Service**

### 3. Create Email Template
1. Go to **Email Templates**
2. Click **Create New Template**
3. **Template Name**: `Booking Request`
4. **Subject**: `{{subject}}`
5. **Content**: Copy the HTML from `EMAILJS_TEMPLATE.html` file
6. **Template ID**: (will be generated - copy this)
7. **Settings**:
   - **To Name**: `Raiatea Bungalow Owner`
   - **To Email**: `chalky66@gmail.com`
   - **From Name**: `{{from_name}}`
   - **Reply To**: `bungalowtehei@gmail.com`

**Note**: The template uses HTML format with {{variable}} placeholders that match the data sent from the Vue component.

### 4. Get Public Key
1. Go to **Account** → **General**
2. Copy your **Public Key**

### 5. Update Configuration File
Edit `public/emailjs-config.json`:

```json
{
  "emailjs": {
    "serviceId": "service_XXXXXXX",
    "templateId": "template_XXXXXXX", 
    "publicKey": "YOUR_PUBLIC_KEY"
  }
}
```

Replace the XXX values with your actual EmailJS credentials.

### 6. Test the System
1. Start the website: `npm run dev`
2. Fill out booking form
3. Click "Reserve"
4. Check `chalky66@gmail.com` for the booking email

## Benefits of EmailJS
- ✅ No server required
- ✅ Direct browser sending
- ✅ Professional email delivery
- ✅ Free tier (200 emails/month)
- ✅ Reliable Gmail integration

## Troubleshooting
- If emails don't arrive, check EmailJS dashboard logs
- Verify Gmail credentials are correct
- Ensure 2FA and App Password are set up properly
- Check spam folder in chalky66@gmail.com