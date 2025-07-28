// Example usage of the email configuration system
// This file demonstrates how to use the email configuration in your code

import { 
  emailConfig, 
  getFromAddress, 
  getAdminEmail, 
  getReplyToAddress,
  getSiteName,
  getSiteUrl 
} from './email';

// Example 1: Get specific email addresses
console.log('Admin email:', getAdminEmail());
console.log('From address (noreply):', getFromAddress('noreply'));
console.log('From address (prayer):', getFromAddress('prayer'));
console.log('Reply-to address (prayer):', getReplyToAddress('prayer'));

// Example 2: Access full configuration
console.log('Full email config:', emailConfig);

// Example 3: Get site information
console.log('Site name:', getSiteName());
console.log('Site URL:', getSiteUrl());

// Example 4: Using in email service
const exampleEmailData = {
  from: getFromAddress('noreply'),
  to: [getAdminEmail()],
  replyTo: getReplyToAddress('prayer'),
  subject: 'Test Email',
  html: '<p>This is a test email from ${getSiteName()}</p>'
};

// Example 5: Environment variable override
// If you set EMAIL_FROM_NOREPLY in your .env.local file:
// EMAIL_FROM_NOREPLY=Custom Name <custom@example.com>
// It will override the default value

// Example 6: Adding new email types
// To add a new email type, update the EmailConfig interface:
/*
interface EmailConfig {
  from: {
    noreply: string;
    prayer: string;
    newsletter: string; // New type
  };
  // ... rest of config
}
*/

// Then add the environment variable:
// EMAIL_FROM_NEWSLETTER=Newsletter <newsletter@example.com>

// And use it:
// const newsletterFrom = getFromAddress('newsletter'); 