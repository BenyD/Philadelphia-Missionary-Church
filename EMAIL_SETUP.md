# Email Notification Setup Guide

This guide will help you set up email notifications for the prayer request management system using Resend.

## Prerequisites

1. A Resend account (free tier available)
2. A verified domain or use Resend's sandbox domain for testing

## Step 1: Create a Resend Account

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

## Step 2: Get Your API Key

1. Log in to your Resend dashboard
2. Go to the "API Keys" section
3. Create a new API key
4. Copy the API key (it starts with `re_`)

## Step 3: Configure Environment Variables

1. Open your `.env.local` file
2. Replace `your_resend_api_key_here` with your actual Resend API key:

```env
RESEND_API_KEY=re_your_actual_api_key_here
ADMIN_EMAIL=your_admin_email@yourdomain.com
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## Step 4: Domain Configuration (Optional but Recommended)

### For Production:

1. In your Resend dashboard, go to "Domains"
2. Add your domain (e.g., `yourdomain.com`)
3. Follow the DNS configuration instructions
4. Update the `from` email addresses in `lib/email/service.ts`:

```typescript
from: "Philadelphia Missionary Church <noreply@yourdomain.com>";
```

### For Development/Testing:

You can use Resend's sandbox domain for testing:

- The emails will be sent from `onboarding@resend.dev`
- All emails will be sent to your verified email address for testing

## Step 5: Test the Email System

1. Start your development server: `npm run dev`
2. Submit a prayer request through the public form
3. Check that:
   - The user receives a confirmation email
   - The admin receives a notification email
   - The admin can reply to users from the dashboard

## Email Templates

The system includes three types of emails:

### 1. User Confirmation Email

- Sent when a user submits a prayer request
- Includes their prayer request details and request ID
- Sent from: `noreply@yourdomain.com`

### 2. Admin Notification Email

- Sent to admins when a new prayer request is submitted
- Includes all request details and a link to the admin dashboard
- Sent from: `noreply@yourdomain.com`

### 3. Reply Email

- Sent to users when an admin responds to their prayer request
- Includes the original request and the admin's response
- Sent from: `prayer@yourdomain.com`

## Predefined Reply Templates

Admins can use these predefined templates when responding to prayer requests:

1. **We're Praying for You** - General prayer support message
2. **Words of Encouragement** - Encouraging message with biblical references
3. **Offering Support** - Message offering practical support
4. **Scripture Encouragement** - Message with specific scripture
5. **Follow-up Request** - Request for updates on the situation

## Customization

### Email Templates

- Templates are located in `lib/email/templates.ts`
- You can customize the HTML, styling, and content
- All templates use responsive design and church branding

### Reply Templates

- Predefined templates are in the same file
- You can add, modify, or remove templates as needed
- Templates are easily accessible in the admin dashboard

### Email Service

- Email sending logic is in `lib/email/service.ts`
- You can modify the `from` addresses, subject lines, and other settings

## Troubleshooting

### Common Issues:

1. **Emails not sending**

   - Check your Resend API key is correct
   - Verify your domain is properly configured
   - Check the browser console for errors

2. **Emails going to spam**

   - Ensure your domain has proper SPF/DKIM records
   - Use a professional `from` address
   - Avoid spam trigger words in subject lines

3. **API rate limits**
   - Resend free tier: 3,000 emails/month
   - Check your usage in the Resend dashboard

### Debug Mode:

Add this to your `.env.local` for detailed logging:

```env
DEBUG_EMAILS=true
```

## Security Considerations

1. **API Key Security**

   - Never commit your API key to version control
   - Use environment variables for all sensitive data
   - Rotate API keys regularly

2. **Email Validation**

   - The system validates email addresses before sending
   - Invalid emails are logged but don't break the application

3. **Rate Limiting**
   - Consider implementing rate limiting for the prayer request form
   - Monitor email sending patterns for abuse

## Production Deployment

1. **Environment Variables**

   - Set all environment variables in your production environment
   - Use a production domain for email addresses

2. **Domain Verification**

   - Ensure your domain is verified in Resend
   - Set up proper DNS records

3. **Monitoring**
   - Monitor email delivery rates
   - Set up alerts for failed email sends
   - Track email engagement metrics

## Support

If you encounter issues:

1. Check the Resend documentation: [https://resend.com/docs](https://resend.com/docs)
2. Review the browser console for error messages
3. Check the server logs for API errors
4. Verify your environment variables are correctly set
