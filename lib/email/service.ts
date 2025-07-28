import { Resend } from 'resend';
import { emailTemplates } from './templates';

const resend = new Resend(process.env.RESEND_API_KEY);

export class EmailService {
  static async sendUserConfirmation(data: {
    name: string;
    email: string;
    prayerRequest: string;
    requestId: string;
  }) {
    try {
      const template = emailTemplates.userConfirmation(data);
      
      const result = await resend.emails.send({
        from: 'Philadelphia Missionary Church <noreply@philadelphiamissionarychurch.com>',
        to: [data.email],
        subject: template.subject,
        html: template.html,
      });

      console.log('User confirmation email sent:', result);
      return { success: true, data: result };
    } catch (error) {
      console.error('Error sending user confirmation email:', error);
      return { success: false, error };
    }
  }

  static async sendAdminNotification(data: {
    name: string;
    email: string;
    phone?: string;
    prayerRequest: string;
    requestId: string;
  }) {
    try {
      const template = emailTemplates.adminNotification(data);
      const adminEmail = process.env.ADMIN_EMAIL || 'admin@philadelphiamissionarychurch.com';
      
      const result = await resend.emails.send({
        from: 'Philadelphia Missionary Church <noreply@philadelphiamissionarychurch.com>',
        to: [adminEmail],
        subject: template.subject,
        html: template.html,
      });

      console.log('Admin notification email sent:', result);
      return { success: true, data: result };
    } catch (error) {
      console.error('Error sending admin notification email:', error);
      return { success: false, error };
    }
  }

  static async sendReplyToUser(data: {
    name: string;
    email: string;
    prayerRequest: string;
    adminMessage: string;
    adminName: string;
    requestId: string;
  }) {
    try {
      const template = emailTemplates.replyTemplate(data);
      
      const result = await resend.emails.send({
        from: 'Philadelphia Missionary Church <prayer@philadelphiamissionarychurch.com>',
        to: [data.email],
        subject: template.subject,
        html: template.html,
        reply_to: 'prayer@philadelphiamissionarychurch.com',
      });

      console.log('Reply email sent to user:', result);
      return { success: true, data: result };
    } catch (error) {
      console.error('Error sending reply email:', error);
      return { success: false, error };
    }
  }

  static async sendBulkAdminNotification(requests: Array<{
    name: string;
    email: string;
    phone?: string;
    prayerRequest: string;
    requestId: string;
  }>) {
    try {
      const adminEmail = process.env.ADMIN_EMAIL || 'admin@philadelphiamissionarychurch.com';
      
      // Send individual notifications for each request
      const results = await Promise.allSettled(
        requests.map(request => this.sendAdminNotification(request))
      );

      console.log('Bulk admin notifications sent:', results);
      return { success: true, data: results };
    } catch (error) {
      console.error('Error sending bulk admin notifications:', error);
      return { success: false, error };
    }
  }
} 