# EmailJS Troubleshooting Guide

## Root Cause Diagnosis Steps

### 1. Check Browser Console (F12)
When you submit the form and get an error, open the browser console (F12) and look for:
- **EmailJS send error:** - This will show the exact error
- **Error details:** - This will show status code and error message
- **Sending email with:** - This shows what parameters are being sent

### 2. Common Root Causes

#### A. Invalid Credentials (Most Common)
**Symptoms:** Error status 401, 403, or 404
**Fix:**
- Go to https://dashboard.emailjs.com
- Verify your Service ID matches: `service_ryu2zj8`
- Verify your Template ID matches: `template_mjjokp8`
- Verify your Public Key matches: `L5ZaBwN0ofLYbEJi2`

#### B. Template Variables Mismatch
**Symptoms:** Email sends but is empty or malformed
**Fix:**
- Go to EmailJS Dashboard > Email Templates
- Open your template: `template_mjjokp8`
- Ensure it has these EXACT variables:
  - `{{from_name}}`
  - `{{from_email}}`
  - `{{message}}`
  - `{{reply_to}}` (optional, but recommended)

#### C. Email Service Not Connected
**Symptoms:** Error status 500 or service unavailable
**Fix:**
- Go to EmailJS Dashboard > Email Services
- Check if your email service (Gmail/Outlook) shows as "Connected"
- If not, click "Connect Account" and authorize
- Verify the "To Email" in your template is set to: `mohammadmudassir1604@gmail.com`

#### D. Template Not Published
**Symptoms:** Error status 404
**Fix:**
- Go to EmailJS Dashboard > Email Templates
- Make sure your template is saved AND published
- Check if the template ID matches what's in config.js

#### E. Public Key Restrictions
**Symptoms:** Error status 403
**Fix:**
- Go to EmailJS Dashboard > Account > API Keys
- Check if your Public Key has domain restrictions
- If your site is hosted (not localhost), add your domain to allowed domains

### 3. Testing Steps

1. **Test in Browser Console:**
   ```javascript
   // Check if EmailJS is loaded
   console.log(typeof emailjs); // Should output: "object"
   
   // Check if config is loaded
   console.log(window.EMAILJS_CONFIG); // Should show your config
   ```

2. **Test EmailJS Connection:**
   - Open EmailJS Dashboard
   - Go to Email Services > Your Service
   - Click "Send Test Email"
   - If this fails, the service is not properly connected

3. **Check Template Configuration:**
   - Subject line should be: `New Contact from {{from_name}}`
   - Body should include: `{{from_name}}, {{from_email}}, {{message}}`
   - "To Email" should be: `mohammadmudassir1604@gmail.com`

### 4. Error Code Meanings

- **0:** Network/CORS error - Check internet connection
- **400:** Bad request - Check template variables match
- **401/403:** Authentication failed - Check public key and service connection
- **404:** Service/Template not found - Check IDs are correct
- **500:** Server error - Check EmailJS service status

### 5. Quick Fix Checklist

- [ ] Service ID is correct in config.js
- [ ] Template ID is correct in config.js
- [ ] Public Key is correct in config.js
- [ ] Email service is connected in EmailJS dashboard
- [ ] Template is published and has correct variables
- [ ] Template "To Email" is set to your email
- [ ] Browser console shows no JavaScript errors
- [ ] Network tab shows EmailJS API request (if it fails, check the response)

