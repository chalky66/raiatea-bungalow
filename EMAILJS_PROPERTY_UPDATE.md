# EmailJS Template Updates - Property Name Support

## Overview
The booking system now sends the specific property name (either "Bungalow with Pool" or "Bungalow") in the email templates.

## Template Variables Updated

The following variables are now sent with each booking request:

- `property` - The specific bungalow name ("Bungalow with Pool" or "Bungalow")
- `property_location` - Always "Raiatea, French Polynesia"

## Templates Already Configured

Both EmailJS templates already use the `{{property}}` variable:

### Owner Notification Template (template_kiq8tdr)
- Shows property name in the header section
- Displays as: `{{property}}`
- Example values: "Bungalow with Pool" or "Bungalow"

### Customer Confirmation Template (template_8c6vq5g)
- Shows property name in confirmation message
- Displays as: "your booking request for **{{property}}**"
- Shows in booking summary table

## No Changes Required

✅ The existing templates will automatically display the correct property name based on which bungalow the customer books.

## Website Structure

The website now has three pages:

1. **Landing Page** (`landing.html`) - Main page with links to both bungalows
2. **Bungalow with Pool** (`bungalow-with-pool.html`) - Property with private pool
3. **Bungalow** (`bungalow.html`) - Standard property without pool

Each property page sends its specific name in the booking emails.
