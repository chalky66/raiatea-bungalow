# EmailJS Recipient Configuration Update

## Issue
Both booking emails are currently being sent to `chalky66@gmail.com` instead of `bungalowtehei@gmail.com`.

## Solution
You need to update the recipient email address in your EmailJS template settings.

## Steps to Fix

1. **Log in to EmailJS Dashboard**
   - Go to https://dashboard.emailjs.com/
   - Sign in to your account

2. **Navigate to Email Templates**
   - Click on "Email Templates" in the left sidebar
   - Find your template: `template_kiq8tdr`

3. **Update the Recipient Email**
   - Click on the template to edit it
   - Look for the "To Email" field
   - Change it from `chalky66@gmail.com` to `bungalowtehei@gmail.com`
   - Save the template

4. **Verify the Change**
   - The "To Email" field should now show: `bungalowtehei@gmail.com`
   - You can also keep `chalky66@gmail.com` as a CC or BCC if you want to receive copies

## Current Configuration
- **Service ID**: service_dhcdtxe
- **Template ID**: template_kiq8tdr
- **Public Key**: AynsvlWXPFQ87xOgH
- **Current Recipient**: chalky66@gmail.com ❌
- **Desired Recipient**: bungalowtehei@gmail.com ✅

## Alternative: Add CC Field
If you want both emails to receive notifications:
- **To Email**: bungalowtehei@gmail.com
- **CC**: chalky66@gmail.com

This way, the owner email receives the booking, and you get a copy.

## Testing
After making the change:
1. Go to https://chalky66.github.io/raiatea-bungalow/
2. Submit a test booking
3. Check that bungalowtehei@gmail.com receives the notification

## Note About Customer Confirmations
The current code only sends one email to the property owner. To implement customer confirmation emails:
1. Create a second template in EmailJS for customer confirmations
2. Set its recipient to: `{{contact_email}}` (dynamic field)
3. Update the code with the new template ID
