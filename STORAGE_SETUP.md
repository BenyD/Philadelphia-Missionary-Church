# Supabase Storage Setup Guide

This guide will help you set up Supabase Storage for pastor image uploads in your admin dashboard.

## Prerequisites

1. Supabase project with Storage enabled
2. Admin access to your Supabase dashboard

## Step 1: Enable Storage in Supabase

1. Go to your Supabase project dashboard
2. Navigate to **Storage** in the left sidebar
3. If Storage is not enabled, click **Enable Storage**
4. Wait for the storage service to be provisioned

## Step 2: Verify Storage Bucket

The migration should have automatically created the `pastor-images` bucket. To verify:

1. Go to **Storage** → **Buckets** in your Supabase dashboard
2. You should see a bucket named `pastor-images`
3. The bucket should be **public** (for read access)
4. File size limit should be set to 5MB
5. Allowed MIME types should include: `image/jpeg`, `image/png`, `image/webp`, `image/gif`

## Step 3: Check Storage Policies

The migration should have created the necessary RLS policies. To verify:

1. Go to **Storage** → **Policies** in your Supabase dashboard
2. You should see these policies for the `pastor-images` bucket:

### Public Read Access

- **Policy Name**: "Public read access for pastor images"
- **Operation**: SELECT
- **Target**: `bucket_id = 'pastor-images'`

### Authenticated Upload

- **Policy Name**: "Authenticated users can upload pastor images"
- **Operation**: INSERT
- **Target**: `bucket_id = 'pastor-images' AND auth.role() = 'authenticated'`

### Authenticated Update

- **Policy Name**: "Authenticated users can update pastor images"
- **Operation**: UPDATE
- **Target**: `bucket_id = 'pastor-images' AND auth.role() = 'authenticated'`

### Authenticated Delete

- **Policy Name**: "Authenticated users can delete pastor images"
- **Operation**: DELETE
- **Target**: `bucket_id = 'pastor-images' AND auth.role() = 'authenticated'`

## Step 4: Test the Upload Functionality

1. Start your development server: `npm run dev`
2. Log in to the admin dashboard
3. Go to **Pastors** → **Add Pastor**
4. Try uploading an image using the upload component
5. Verify the image appears in the Supabase Storage dashboard

## Step 5: Configure CORS (if needed)

If you encounter CORS issues during uploads, you may need to configure CORS settings:

1. Go to **Storage** → **Settings** in your Supabase dashboard
2. Add your domain to the CORS origins:
   - For development: `http://localhost:3000`
   - For production: `https://yourdomain.com`

## Troubleshooting

### Common Issues:

1. **"Unauthorized" Error**

   - Ensure the user is logged in to the admin dashboard
   - Check that the user has the `authenticated` role

2. **"File too large" Error**

   - The file size limit is 5MB
   - Compress the image or use a smaller file

3. **"Invalid file type" Error**

   - Only JPEG, PNG, WebP, and GIF files are allowed
   - Convert the image to a supported format

4. **Upload fails silently**

   - Check the browser console for error messages
   - Verify the API route is working: `/api/upload/pastor-image`
   - Check the Supabase Storage logs

5. **Images not displaying**
   - Verify the bucket is set to **public**
   - Check that the image URL is correct
   - Ensure the storage policies allow public read access

### Debug Steps:

1. **Check Network Tab**

   - Open browser developer tools
   - Go to Network tab
   - Try uploading an image
   - Look for the POST request to `/api/upload/pastor-image`
   - Check the response for error messages

2. **Check Supabase Logs**

   - Go to **Logs** in your Supabase dashboard
   - Look for storage-related errors
   - Check for authentication issues

3. **Test API Route Directly**
   - Use a tool like Postman or curl to test the upload endpoint
   - Ensure you're sending the correct authentication headers

## Security Considerations

1. **File Validation**

   - The system validates file types and sizes
   - Only image files are allowed
   - Maximum file size is 5MB

2. **Authentication**

   - Only authenticated users can upload files
   - Public read access is allowed for displaying images

3. **File Naming**

   - Files are renamed with timestamps to prevent conflicts
   - Original filenames are not preserved for security

4. **Storage Limits**
   - Monitor your storage usage in the Supabase dashboard
   - Consider implementing cleanup for unused images

## Production Deployment

1. **Environment Variables**

   - Ensure all Supabase environment variables are set
   - Use production URLs for your domain

2. **CORS Configuration**

   - Add your production domain to CORS origins
   - Remove development URLs if not needed

3. **Monitoring**
   - Set up alerts for storage usage
   - Monitor upload success rates
   - Track storage costs

## Support

If you encounter issues:

1. Check the Supabase documentation: [https://supabase.com/docs/guides/storage](https://supabase.com/docs/guides/storage)
2. Review the browser console for error messages
3. Check the Supabase dashboard logs
4. Verify your storage bucket configuration
5. Test with a simple image file first
