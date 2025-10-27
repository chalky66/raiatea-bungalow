# Freetobook Widget 401 Error - Resolution Steps

## Problem

The Freetobook widget is returning an **HTTP 401 Unauthorized** error, which means the widget credentials (token/ID) are either:

1. Expired
2. Invalid
3. Not authorized for this domain
4. Restricted to specific domains only

## Current Widget Credentials

- **Widget ID**: `50472`
- **Widget Token**: `ZjiyvMNSVIMyvRYELhrDUgM5GPUDFzNDMLHZ3XUPIH1gM2fdnnyYyePQn6iz5`
- **Script Version**: `20190925`

## How to Fix

### Step 1: Get Updated Credentials from Freetobook

1. Log into your Freetobook account dashboard
2. Navigate to **Widgets** or **Integration** section
3. Find the widget for your property
4. **Generate new widget code** or verify existing credentials
5. Copy the updated `data-id` and `data-token` values

### Step 2: Update the Widget Code

The widget code should look like this:
```html
<div class="ftb-widget" 
     data-id="YOUR_NEW_WIDGET_ID" 
     data-token="YOUR_NEW_WIDGET_TOKEN">
</div>
<script src="https://widget.freetobook.com/widget.js?v=20190925"></script>
```

### Step 3: Update Configuration Files

Update these files with the new credentials:

#### 1. `src/components/FreetobookWidget.vue`

Find this section in the `insertWidget()` method:
```javascript
widgetDiv.setAttribute('data-id', '50472')
widgetDiv.setAttribute('data-token', 'ZjiyvMNSVIMyvRYELhrDUgM5GPUDFzNDMLHZ3XUPIH1gM2fdnnyYyePQn6iz5')
```

Replace with your new values:
```javascript
widgetDiv.setAttribute('data-id', 'YOUR_NEW_WIDGET_ID')
widgetDiv.setAttribute('data-token', 'YOUR_NEW_WIDGET_TOKEN')
```

#### 2. `freetobook-config.json`

Update:
```json
{
  "freetobook": {
    "widgetId": "YOUR_NEW_WIDGET_ID",
    "widgetToken": "YOUR_NEW_WIDGET_TOKEN",
    "scriptVersion": "20190925"
  }
}
```

#### 3. `public/freetobook-config.json`

Same as above.

#### 4. `.env.freetobook`

Update:
```bash
FREETOBOOK_WIDGET_ID=YOUR_NEW_WIDGET_ID
FREETOBOOK_WIDGET_TOKEN=YOUR_NEW_WIDGET_TOKEN
```

### Step 4: Check Domain Authorization

In your Freetobook account settings:
1. Check if there are **domain restrictions** for the widget
2. Add these domains to the allowed list:
   - `localhost` (for development)
   - `127.0.0.1` (for local testing)
   - `*.github.io` (for GitHub Pages)
   - `chalky66.github.io` (your specific GitHub Pages domain)
   - Any custom domain you're using

### Step 5: Test the Fix

1. Rebuild the project:
   ```bash
   npm run build
   ```

2. Start the dev server:
   ```bash
   npm run dev
   ```

3. Check if the widget loads without 401 error
4. Check browser console for any errors

## Alternative Solution: Use Contact Form

If you can't get updated Freetobook credentials immediately, the site has a **fallback system**:

1. When the widget fails, users see an error message
2. They can click "Reserve on Airbnb" button
3. They can also contact you directly via:
   - Email: bungalowtehei@gmail.com
   - Phone: +33 6 20 80 68 22

## Temporary Workaround

If you want to temporarily disable the Freetobook widget and only show Airbnb:

1. Go to `src/App.vue`
2. Replace `FreetobookWidget` with `AvailabilityCard` (the original booking component)
3. This will show the original form-based booking system

## Contact Freetobook Support

If issues persist:
- Email: support@freetobook.com
- Check their help documentation
- Verify your account is active and in good standing
- Ask them to regenerate widget credentials

## Questions?

Created by: Paul White
Email: bungalowtehei@gmail.com
Phone: +33 6 20 80 68 22
