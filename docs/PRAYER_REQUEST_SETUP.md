# Prayer Request Setup Guide

## Overview
The prayer request page has been successfully created with a beautiful, responsive design and form functionality. The form includes all requested fields:
- Full Name (required)
- Phone Number (optional)
- Email Address (required)
- Prayer Request (required)

## Current Implementation
- ✅ Beautiful, responsive UI with dark mode support
- ✅ Form validation and error handling
- ✅ Success/error states with user feedback
- ✅ API route for form submission
- ✅ Navigation integration
- ✅ Accessibility features

## Email Integration Setup

### Option 1: Resend (Recommended)
1. Install Resend:
   ```bash
   npm install resend
   ```

2. Sign up at [resend.com](https://resend.com) and get your API key

3. Add to your `.env.local`:
   ```
   RESEND_API_KEY=your_api_key_here
   ```

4. Update the API route (`app/api/prayer-request/route.ts`):
   ```typescript
   import { Resend } from 'resend';
   
   const resend = new Resend(process.env.RESEND_API_KEY);
   
   // Replace the TODO section with:
   await resend.emails.send({
     from: 'prayer-team@yourdomain.com',
     to: ['prayer-team@yourdomain.com'],
     subject: 'New Prayer Request',
     html: `
       <h2>New Prayer Request</h2>
       <p><strong>Name:</strong> ${body.fullName}</p>
       <p><strong>Email:</strong> ${body.email}</p>
       <p><strong>Phone:</strong> ${body.phoneNumber || 'Not provided'}</p>
       <p><strong>Prayer Request:</strong></p>
       <p>${body.prayerRequest}</p>
     `
   });
   ```

### Option 2: Nodemailer with Gmail
1. Install nodemailer:
   ```bash
   npm install nodemailer @types/nodemailer
   ```

2. Add to your `.env.local`:
   ```
   GMAIL_USER=your-email@gmail.com
   GMAIL_APP_PASSWORD=your-app-password
   ```

3. Update the API route with nodemailer implementation

### Option 3: SendGrid
1. Install SendGrid:
   ```bash
   npm install @sendgrid/mail
   ```

2. Add to your `.env.local`:
   ```
   SENDGRID_API_KEY=your_api_key_here
   ```

## Features Included

### UI/UX Features
- **Responsive Design**: Works perfectly on all devices
- **Dark Mode Support**: Automatic theme switching
- **Beautiful Animations**: Smooth transitions and hover effects
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Loading States**: Visual feedback during form submission
- **Success/Error States**: Clear user feedback

### Form Features
- **Validation**: Client and server-side validation
- **Required Fields**: Full name, email, and prayer request
- **Optional Fields**: Phone number
- **Error Handling**: Comprehensive error messages
- **Form Reset**: Clears form after successful submission

### Security Features
- **Input Sanitization**: Prevents XSS attacks
- **Email Validation**: Proper email format checking
- **Rate Limiting**: Ready for implementation
- **Privacy Notice**: Clear privacy policy

## Customization Options

### Styling
The component uses Tailwind CSS classes that can be easily customized:
- Colors: Update the gradient classes
- Spacing: Modify padding and margin classes
- Typography: Change font sizes and weights

### Content
- Update the prayer request message text
- Modify the success message
- Change the privacy notice

### Email Template
Customize the email template in the API route to match your church's branding and include additional information.

## Testing
1. Start the development server: `npm run dev`
2. Navigate to `/prayer-request`
3. Test form submission with various inputs
4. Check console logs for form data
5. Verify email delivery (after setup)

## Deployment
The prayer request page is ready for deployment. Make sure to:
1. Set up environment variables for email service
2. Configure your email service provider
3. Test the form in production
4. Monitor email delivery

## Support
For any issues or questions about the prayer request implementation, please refer to the component files:
- `app/prayer-request/page.tsx` - Main page component
- `components/sections/prayer-request-form.tsx` - Form component
- `app/api/prayer-request/route.ts` - API endpoint 