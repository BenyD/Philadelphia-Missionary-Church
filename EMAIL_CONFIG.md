# Email Configuration Guide

This document explains how to configure email addresses and settings for the Philadelphia Missionary Church website.

## 📧 Email Configuration Overview

The email system uses a centralized configuration approach that allows you to easily manage email addresses from environment variables. The system is designed for prayer request notifications only.

## 🔧 Environment Variables

### From Addresses

These are the email addresses that appear as the sender in emails:

```env
# System notifications (confirmations, etc.)
EMAIL_FROM_NOREPLY=Philadelphia Missionary Church <noreply@philadelphiamissionarychurch.com>

# Prayer-related communications
EMAIL_FROM_PRAYER=Philadelphia Missionary Church <prayer@philadelphiamissionarychurch.com>
```

### To Addresses

These are the email addresses that receive notifications:

```env
# Admin email for prayer request notifications
ADMIN_EMAIL=pmcwebdesign@gmail.com
```

### Reply-To Addresses

These are the email addresses that users can reply to:

```env
# Reply-to for prayer-related emails
EMAIL_REPLY_TO_PRAYER=prayer@philadelphiamissionarychurch.com
```

### Site Configuration

General site settings used in emails:

```env
# Site name used in email templates
SITE_NAME=Philadelphia Missionary Church

# Site URL for links in emails
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 📋 Email Types and Their Configuration

### 1. User Confirmation Emails

- **From**: `EMAIL_FROM_NOREPLY`
- **To**: User's email address
- **Purpose**: Confirm prayer request submission
- **Reply-To**: None (system notification)

### 2. Admin Notification Emails

- **From**: `EMAIL_FROM_NOREPLY`
- **To**: `ADMIN_EMAIL`
- **Purpose**: Notify admin of new prayer requests
- **Reply-To**: None (system notification)

### 3. Admin Reply Emails

- **From**: `EMAIL_FROM_PRAYER`
- **To**: User's email address
- **Purpose**: Send admin response to prayer requests
- **Reply-To**: `EMAIL_REPLY_TO_PRAYER` (so users can reply back)

## 🚀 Setup Instructions

### 1. Configure Your Domain

Ensure your domain has proper DNS records for email:

- MX records for receiving emails
- SPF, DKIM, and DMARC records for sending emails
- Verify domain with Resend

### 2. Update Environment Variables

Copy the example configuration to your `.env.local` file:

```env
# Email Configuration (Resend)
RESEND_API_KEY=your_resend_api_key_here

# Email From Addresses
EMAIL_FROM_NOREPLY=Philadelphia Missionary Church <noreply@yourdomain.com>
EMAIL_FROM_PRAYER=Philadelphia Missionary Church <prayer@yourdomain.com>

# Email To Addresses
ADMIN_EMAIL=your-admin-email@gmail.com

# Email Reply-To Addresses
EMAIL_REPLY_TO_PRAYER=prayer@yourdomain.com

# Site Configuration
SITE_NAME=Philadelphia Missionary Church
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### 3. Production Configuration

For production, update the following:

- Replace `yourdomain.com` with your actual domain
- Set `NEXT_PUBLIC_SITE_URL` to your production URL
- Update `ADMIN_EMAIL` to the actual admin email
- Ensure all email addresses are verified with Resend

## 🔍 Testing Email Configuration

### 1. Test Email Sending

You can test the email configuration by:

1. Submitting a prayer request through the website
2. Checking if confirmation email is received
3. Checking if admin notification is received
4. Testing admin reply functionality from the admin panel

### 2. Admin Reply System

The admin reply system works as follows:

1. **Admin receives notification** when someone submits a prayer request
2. **Admin can reply** from the admin panel using the reply feature
3. **Reply is sent** from `EMAIL_FROM_PRAYER` to the user
4. **User can reply back** to `EMAIL_REPLY_TO_PRAYER`
5. **Future replies** can be handled through email or admin panel

**Note**: Currently, user replies to prayer emails are not automatically captured in the admin panel. You'll need to manually update the prayer request with any follow-up communication.

### 2. Verify Email Addresses

Make sure all email addresses are:

- Valid and accessible
- Verified with Resend
- Properly configured in DNS

## 📁 File Structure

```
lib/
├── config/
│   └── email.ts          # Email configuration
├── email/
│   ├── service.ts        # Email service (uses config)
│   └── templates.ts      # Email templates
```

## 🛠️ Code Usage

### Using the Email Configuration

```typescript
import {
  getFromAddress,
  getAdminEmail,
  getReplyToAddress,
} from "@/lib/config/email";

// Get from address for noreply emails
const fromAddress = getFromAddress("noreply");

// Get admin email
const adminEmail = getAdminEmail();

// Get reply-to address for prayer emails
const replyToAddress = getReplyToAddress("prayer");
```

### Adding New Email Types

1. Add new environment variables to `.env.local`
2. Update the `EmailConfig` interface in `lib/config/email.ts`
3. Add helper functions if needed
4. Update the email service to use the new configuration

## 🔒 Security Considerations

- Never commit `.env.local` to version control
- Use environment variables for sensitive information
- Verify all email addresses with Resend
- Monitor email delivery and bounce rates
- Implement rate limiting for email sending

## 📞 Support

If you need help configuring emails:

1. Check Resend dashboard for delivery status
2. Verify DNS records are correct
3. Ensure all email addresses are verified
4. Check environment variables are properly set
