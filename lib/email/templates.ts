export const emailTemplates = {
  // User confirmation email when they submit a prayer request
  userConfirmation: (data: {
    name: string;
    email: string;
    prayerRequest: string;
    requestId: string;
  }) => ({
    subject: "Prayer Request Received - Philadelphia Missionary Church",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Prayer Request Received</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #dc2626, #b91c1c); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .prayer-box { background: white; padding: 20px; border-left: 4px solid #dc2626; margin: 20px 0; border-radius: 5px; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            .highlight { background: #fff3cd; padding: 10px; border-radius: 5px; margin: 15px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🙏 Prayer Request Received</h1>
              <p>Philadelphia Missionary Church</p>
            </div>
            
            <div class="content">
              <p>Dear ${data.name},</p>
              
              <p>Thank you for submitting your prayer request to Philadelphia Missionary Church. We have received your request and our prayer team will be lifting you up in prayer.</p>
              
              <div class="prayer-box">
                <strong>Your Prayer Request:</strong><br>
                "${data.prayerRequest}"
              </div>
              
              <div class="highlight">
                <strong>Request ID:</strong> ${data.requestId}<br>
                <strong>Submitted:</strong> ${new Date().toLocaleDateString()}
              </div>
              
              <p>Our prayer team will review your request and may reach out to you if additional information is needed. You can expect updates on your prayer request status.</p>
              
              <p>Please know that you are not alone, and we are here to support you through prayer and fellowship.</p>
              
              <p>Blessings,<br>
              <strong>Prayer Team</strong><br>
              Philadelphia Missionary Church</p>
            </div>
            
            <div class="footer">
              <p>This is an automated confirmation. Please do not reply to this email.</p>
              <p>© 2025 Philadelphia Missionary Church. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),

  // Admin notification for new prayer requests
  adminNotification: (data: {
    name: string;
    email: string;
    phone?: string;
    prayerRequest: string;
    requestId: string;
  }) => ({
    subject: `New Prayer Request - ${data.name} (ID: ${data.requestId})`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Prayer Request</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #1e40af, #1d4ed8); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .info-box { background: white; padding: 20px; border-left: 4px solid #1e40af; margin: 20px 0; border-radius: 5px; }
            .prayer-box { background: #f0f9ff; padding: 20px; border-left: 4px solid #0ea5e9; margin: 20px 0; border-radius: 5px; }
            .action-btn { display: inline-block; background: #1e40af; color: white !important; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 10px 0; font-weight: 600; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🆕 New Prayer Request</h1>
              <p>Admin Notification</p>
            </div>
            
            <div class="content">
              <p>A new prayer request has been submitted and requires your attention.</p>
              
              <div class="info-box">
                <strong>Request Details:</strong><br>
                <strong>Name:</strong> ${data.name}<br>
                <strong>Email:</strong> ${data.email}<br>
                ${data.phone ? `<strong>Phone:</strong> ${data.phone}<br>` : ''}
                <strong>Request ID:</strong> ${data.requestId}<br>
                <strong>Submitted:</strong> ${new Date().toLocaleDateString()}
              </div>
              
              <div class="prayer-box">
                <strong>Prayer Request:</strong><br>
                "${data.prayerRequest}"
              </div>
              
              <p><a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/prayer-requests" class="action-btn">Review Prayer Request</a></p>
              
              <p>Please review this request and take appropriate action.</p>
            </div>
            
            <div class="footer">
              <p>© 2025 Philadelphia Missionary Church. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),

  // Reply template for responding to prayer requests
  replyTemplate: (data: {
    name: string;
    email: string;
    prayerRequest: string;
    adminMessage: string;
    adminName: string;
    requestId: string;
  }) => ({
    subject: "Response to Your Prayer Request - Philadelphia Missionary Church",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Prayer Request Response</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #059669, #047857); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .original-box { background: #f0f9ff; padding: 20px; border-left: 4px solid #0ea5e9; margin: 20px 0; border-radius: 5px; }
            .response-box { background: #f0fdf4; padding: 20px; border-left: 4px solid #22c55e; margin: 20px 0; border-radius: 5px; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>💌 Response to Your Prayer Request</h1>
              <p>Philadelphia Missionary Church</p>
            </div>
            
            <div class="content">
              <p>Dear ${data.name},</p>
              
              <p>Thank you for sharing your prayer request with us. We want to let you know that we have been praying for you and have a response from our prayer team.</p>
              
              <div class="original-box">
                <strong>Your Original Prayer Request:</strong><br>
                "${data.prayerRequest}"
              </div>
              
              <div class="response-box">
                <strong>Response from ${data.adminName}:</strong><br>
                "${data.adminMessage}"
              </div>
              
              <p>Please know that we continue to lift you up in prayer and are here to support you.</p>
              
              <p>Blessings,<br>
              <strong>Prayer Team</strong><br>
              Philadelphia Missionary Church</p>
            </div>
            
            <div class="footer">
              <p>Request ID: ${data.requestId}</p>
              <p>© 2025 Philadelphia Missionary Church. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),
};

// Predefined reply templates for admins
export const replyTemplates = [
  {
    id: "praying",
    name: "We're Praying for You",
    template: "Thank you for sharing your prayer request with us. We want you to know that our prayer team has been lifting you up in prayer. We believe in the power of prayer and trust that God is working in your situation. Please keep us updated on how things are going.",
  },
  {
    id: "encouragement",
    name: "Words of Encouragement",
    template: "We understand that you're going through a difficult time, and we want to encourage you with God's promises. Remember that He is with you always and will never leave you nor forsake you. We're praying for strength, peace, and guidance for you during this season.",
  },
  {
    id: "support",
    name: "Offering Support",
    template: "We want to let you know that you're not alone in this. Our church family is here to support you. If you'd like to talk with someone or need practical help, please don't hesitate to reach out. We're praying for you and here to walk alongside you.",
  },
  {
    id: "scripture",
    name: "Scripture Encouragement",
    template: "We're praying for you and want to share this scripture that has been on our hearts: 'Cast your burden on the Lord, and he will sustain you; he will never permit the righteous to be moved.' (Psalm 55:22) Trust in His faithfulness and know that we're lifting you up in prayer.",
  },
  {
    id: "followup",
    name: "Follow-up Request",
    template: "Thank you for your prayer request. We've been praying for you and would love to hear how things are going. Please feel free to reach out to us with any updates or if you need continued prayer support. We're here for you.",
  },
]; 