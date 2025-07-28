export interface EmailConfig {
  // From addresses
  from: {
    noreply: string;
    prayer: string;
  };
  
  // To addresses
  to: {
    admin: string;
  };
  
  // Reply-to addresses
  replyTo: {
    prayer: string;
  };
  
  // Email settings
  settings: {
    siteName: string;
    siteUrl: string;
  };
}

// Default configuration
const defaultConfig: EmailConfig = {
  from: {
    noreply: 'Philadelphia Missionary Church <noreply@philadelphiamissionarychurch.com>',
    prayer: 'Philadelphia Missionary Church <prayer@philadelphiamissionarychurch.com>',
  },
  to: {
    admin: 'admin@philadelphiamissionarychurch.com',
  },
  replyTo: {
    prayer: 'prayer@philadelphiamissionarychurch.com',
  },
  settings: {
    siteName: 'Philadelphia Missionary Church',
    siteUrl: 'http://localhost:3000',
  },
};

// Environment-based configuration
export const emailConfig: EmailConfig = {
  from: {
    noreply: process.env.EMAIL_FROM_NOREPLY || defaultConfig.from.noreply,
    prayer: process.env.EMAIL_FROM_PRAYER || defaultConfig.from.prayer,
  },
  to: {
    admin: process.env.ADMIN_EMAIL || defaultConfig.to.admin,
  },
  replyTo: {
    prayer: process.env.EMAIL_REPLY_TO_PRAYER || defaultConfig.replyTo.prayer,
  },
  settings: {
    siteName: process.env.SITE_NAME || defaultConfig.settings.siteName,
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || defaultConfig.settings.siteUrl,
  },
};

// Helper functions for common email operations
export const getFromAddress = (type: 'noreply' | 'prayer' = 'noreply') => {
  return emailConfig.from[type];
};

export const getAdminEmail = () => {
  return emailConfig.to.admin;
};

export const getReplyToAddress = (type: 'prayer' = 'prayer') => {
  return emailConfig.replyTo[type];
};

export const getSiteName = () => {
  return emailConfig.settings.siteName;
};

export const getSiteUrl = () => {
  return emailConfig.settings.siteUrl;
}; 