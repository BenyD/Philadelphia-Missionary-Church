# PMC Church Admin Dashboard Setup

This guide will help you set up the admin dashboard for Philadelphia Missionary Church.

## Prerequisites

- Supabase CLI installed and logged in
- Node.js and npm installed
- Access to your Supabase project

## Setup Steps

### 1. Environment Variables

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project: "Philadelphia Missionary Church"
3. Go to Settings > API
4. Copy the following values:

   - Project URL
   - Anon public key

5. Update the `.env.local` file with your actual values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://epqwlhxqnworfwknascf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_actual_service_role_key_here
```

**Important**: The service role key bypasses Row Level Security (RLS) and should only be used for server-side operations. Never expose it in client-side code.

### 2. Database Setup

The database migrations have already been applied. Two tables have been created:

**1. `prayer_requests` table:**

- `id` - Unique identifier (UUID)
- `full_name` - Requester's full name
- `phone_number` - Phone number (optional)
- `email` - Email address
- `prayer_request` - The prayer request text
- `status` - Status: pending, in_progress, completed, archived
- `created_at` - Timestamp when created
- `updated_at` - Timestamp when last updated
- `admin_notes` - Admin notes (optional)

**2. `events` table:**

- `id` - Unique identifier (UUID)
- `title` - Event title
- `description` - Event description
- `date` - Event date
- `time` - Event time
- `location` - Event location
- `image_url` - Optional image URL
- `is_featured` - Whether the event is featured
- `status` - Event status: active, cancelled, postponed
- `created_at` - Timestamp when created
- `updated_at` - Timestamp when last updated

### 3. Create Admin Users

1. Go to your Supabase dashboard
2. Navigate to **Authentication > Users**
3. Click **"Add User"**
4. Enter the admin's details:
   - **Email**: admin@yourchurch.com (or your preferred email)
   - **Password**: Create a strong password
   - **Email Confirm**: **Leave unchecked** (no email verification needed)
5. Click **"Create User"**
6. The user will be able to log in immediately at `/login`

**Note**: Since we're not using email verification, users can log in immediately after creation.

### 4. Row Level Security (RLS)

The database has RLS enabled with the following policies:

**Prayer Requests:**

- Authenticated users can read all prayer requests
- Authenticated users can update prayer requests
- Only authenticated users can access the data

**Events:**

- Public users can read active events only
- Authenticated users can read all events (including cancelled/postponed)
- Authenticated users can create, update, and delete events

### 5. Running the Application

```bash
npm run dev
```

The admin dashboard will be available at:

- Login: http://localhost:3000/login
- Dashboard: http://localhost:3000/admin/dashboard

## Features

### Admin Dashboard

- **Authentication**: Secure login with Supabase Auth
- **Prayer Request Management**: View, update, and manage prayer requests
- **Events Management**: Create, edit, and manage church events
- **Status Tracking**: Track requests as pending, in progress, completed, or archived
- **Event Status**: Manage events as active, cancelled, or postponed
- **Admin Notes**: Add internal notes to prayer requests
- **Real-time Updates**: See changes immediately

### Prayer Request Form

- **Public Form**: Available at `/prayer-request`
- **Direct Database Storage**: Requests are saved directly to Supabase
- **Form Validation**: Client-side validation for required fields
- **Success/Error Handling**: Clear feedback to users

### Events System

- **Public Events Page**: Available at `/events`
- **Upcoming Events**: Displayed on homepage
- **API Integration**: Events are fetched from Supabase via API
- **Live Updates**: Events created in admin appear immediately on public pages
- **Featured Events**: Mark events as featured for special display

## Security

- All admin routes are protected by authentication
- Middleware automatically redirects unauthenticated users to login
- Row Level Security ensures only authenticated users can access data
- Environment variables keep sensitive data secure

## Service Role Key Usage

The service role key (`SUPABASE_SERVICE_ROLE_KEY`) bypasses Row Level Security and should only be used for:

- **Server-side operations** that need to bypass RLS
- **Admin-only operations** like user management
- **Bulk operations** or data migrations
- **Webhook handlers** or API routes
- **Scheduled tasks** or cron jobs

**Current Implementation**: The admin dashboard uses the regular authenticated user session, so the service role key is not required for basic functionality.

**Future Use Cases**: You might need the service role key if you add:

- User management features
- Bulk data operations
- Automated email notifications
- Data export functionality

## Usage

### For Admins

1. Log in at `/login`
2. View all prayer requests and events on the dashboard
3. **Prayer Requests**: Click "View" to see request details, update status and add admin notes
4. **Events**: Click "Create Event" to add new events, or "Edit" to modify existing ones
5. Save changes to track progress

### For Visitors

1. Visit `/prayer-request` to submit a prayer request
2. Fill out the form with their information
3. Submit the request
4. Receive confirmation

## Troubleshooting

### Common Issues

1. **Authentication Errors**

   - Ensure environment variables are set correctly
   - Check that the user exists in Supabase Auth
   - Verify the anon key is correct

2. **Database Connection Issues**

   - Check that the migration was applied successfully
   - Verify RLS policies are in place
   - Ensure the table exists in your database

3. **Permission Errors**
   - Make sure the user is authenticated
   - Check RLS policies allow the required operations
   - Verify the user has the correct role

### Getting Help

If you encounter issues:

1. Check the browser console for errors
2. Verify your Supabase project settings
3. Ensure all environment variables are set
4. Check that the database migration was applied

## Next Steps

Consider adding these features in the future:

- Email notifications for new prayer requests
- Export functionality for prayer request data
- User management for multiple admins
- Analytics and reporting
- Bulk operations for prayer requests
 