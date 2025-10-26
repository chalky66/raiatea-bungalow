# SMTP Email Configuration Setup

## Gmail App Password Setup

To use Gmail SMTP for sending booking emails, you need to set up an App Password:

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to [Google Account Settings](https://myaccount.google.com/)
   - Security → App passwords
   - Generate a new app password for "Mail"
   - Copy the 16-character password

## Configuration

1. **Edit `email-config.json`**:
   ```json
   {
     "smtp": {
       "host": "smtp.gmail.com",
       "port": 587,
       "secure": false,
       "auth": {
         "user": "your-actual-email@gmail.com",
         "pass": "your-16-character-app-password"
       }
     },
     "emailSettings": {
       "from": "your-actual-email@gmail.com",
       "to": "chalky66@gmail.com",
       "subject": "New Booking Request - Raiatea Bungalow"
     }
   }
   ```

2. **Replace the placeholder values**:
   - `your-actual-email@gmail.com` → Your Gmail address
   - `your-16-character-app-password` → Your Gmail App Password

## Running the System

1. **Start the email server** (in one terminal):
   ```bash
   npm run email-server
   ```

2. **Start the website** (in another terminal):
   ```bash
   npm run dev
   ```

3. **Test booking submissions** - they will now be sent via Gmail SMTP

## Security Note

- **Never commit real credentials** to version control
- The `email-config.json` file should be added to `.gitignore`
- Consider using environment variables for production deployment