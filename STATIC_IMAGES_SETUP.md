# Static Images Setup Guide

This guide explains where to add images for your static homepage and about page.

## 📁 Current Image Structure

```
public/
├── images/
│   ├── logo.png                    # ✅ Already exists
│   ├── church-hero.jpg             # ❌ Need to add
│   ├── church-about.jpg            # ❌ Need to add
│   ├── hero-slide-1.jpg            # ❌ Need to add
│   ├── hero-slide-2.jpg            # ❌ Need to add
│   ├── hero-slide-3.jpg            # ❌ Need to add
│   └── about-hero.jpg              # ❌ Need to add
```

## 🎯 Images Needed for Static Pages

### **1. Homepage Images**

#### **Hero Section Images (3 slides)**

**Location**: `public/images/`
**Files needed**:

- `hero-slide-1.jpg` - Church building/worship service
- `hero-slide-2.jpg` - Community/fellowship
- `hero-slide-3.jpg` - Ministry/outreach

**Current URLs** (being replaced):

```tsx
// In components/sections/hero-section.tsx
"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80";
"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80";
"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80";
```

**Recommended sizes**:

- **Width**: 1920px minimum
- **Height**: 1080px minimum
- **Format**: JPG or WebP
- **File size**: Under 500KB each

### **2. About Page Images**

#### **About Hero Image**

**Location**: `public/images/about-hero.jpg`
**Current URL** (being replaced):

```tsx
// In components/sections/about-us-content.tsx
"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80";
```

**Recommended size**:

- **Width**: 1920px minimum
- **Height**: 800px minimum
- **Format**: JPG or WebP
- **File size**: Under 800KB

### **3. Meta Images**

#### **Open Graph Images**

**Location**: `public/images/`
**Files needed**:

- `church-hero.jpg` - Homepage social media preview
- `church-about.jpg` - About page social media preview

**Recommended sizes**:

- **Width**: 1200px
- **Height**: 630px
- **Format**: JPG or PNG
- **File size**: Under 1MB

## 🛠️ How to Add Your Images

### **Step 1: Prepare Your Images**

1. **Choose high-quality photos** of your church:

   - Church building exterior
   - Worship services
   - Community events
   - Ministry activities
   - Fellowship gatherings

2. **Resize images** to recommended sizes:

   - Hero images: 1920x1080px
   - About hero: 1920x800px
   - Meta images: 1200x630px

3. **Optimize for web**:
   - Compress to reduce file size
   - Use JPG for photos, PNG for graphics
   - Keep file sizes under 500KB-1MB

### **Step 2: Place Images in Public Directory**

```bash
# Copy your images to the public/images directory
cp your-hero-image-1.jpg public/images/hero-slide-1.jpg
cp your-hero-image-2.jpg public/images/hero-slide-2.jpg
cp your-hero-image-3.jpg public/images/hero-slide-3.jpg
cp your-about-image.jpg public/images/about-hero.jpg
cp your-meta-image-1.jpg public/images/church-hero.jpg
cp your-meta-image-2.jpg public/images/church-about.jpg
```

### **Step 3: Update Component References**

The components are already set up to use local images. You just need to replace the Unsplash URLs with your local image paths.

## 📋 Image Content Suggestions

### **Hero Section Images (3 slides)**

#### **Slide 1: Welcome/Church Building**

- **Content**: Church building exterior or sanctuary
- **Mood**: Welcoming, warm, inviting
- **Colors**: Warm tones, natural lighting

#### **Slide 2: Community/Fellowship**

- **Content**: People gathering, fellowship, community
- **Mood**: Joyful, connected, friendly
- **Colors**: Bright, vibrant, life-filled

#### **Slide 3: Ministry/Outreach**

- **Content**: Ministry activities, service, outreach
- **Mood**: Purposeful, caring, active
- **Colors**: Meaningful, impactful

### **About Page Hero Image**

- **Content**: Church building or congregation
- **Mood**: Established, trustworthy, welcoming
- **Colors**: Professional, warm, inviting

### **Meta Images (Social Media)**

- **Content**: Church logo + building or congregation
- **Mood**: Professional, welcoming, trustworthy
- **Colors**: Brand colors (red/blue theme)

## 🎨 Design Guidelines

### **Image Quality**

- **High resolution**: At least 1920px wide
- **Good lighting**: Well-lit, clear images
- **Professional**: Clean, polished appearance
- **Relevant**: Images that represent your church

### **Brand Consistency**

- **Colors**: Match your red/blue brand colors
- **Style**: Consistent with your church's aesthetic
- **Tone**: Warm, welcoming, professional

### **Accessibility**

- **Alt text**: Descriptive alt text for screen readers
- **Contrast**: Good contrast for text overlays
- **Clarity**: Clear, recognizable subjects

## 🚀 Quick Setup

### **Option 1: Use Your Own Photos**

1. Take photos of your church building, services, and events
2. Edit and resize to recommended sizes
3. Place in `public/images/` directory
4. Update component references

### **Option 2: Professional Photography**

1. Hire a photographer for high-quality church photos
2. Get photos of building, services, community events
3. Edit and optimize for web
4. Place in `public/images/` directory

### **Option 3: Stock Photos (Temporary)**

1. Choose relevant stock photos
2. Download and rename to match file structure
3. Place in `public/images/` directory
4. Replace with your own photos later

## 📱 Testing Your Images

### **1. Local Testing**

- Run `npm run dev`
- Check homepage hero section
- Check about page hero image
- Verify images load correctly

### **2. Performance Testing**

- Use browser dev tools to check load times
- Ensure images are optimized
- Test on different devices

### **3. Social Media Testing**

- Test social media previews
- Use Facebook Sharing Debugger
- Use Twitter Card Validator

## 🔧 Technical Notes

### **Image Optimization**

- Use WebP format for better compression
- Implement lazy loading for better performance
- Consider using Next.js Image component for optimization

### **File Naming**

- Use descriptive, lowercase names
- Use hyphens instead of spaces
- Include dimensions in filename if needed

### **Directory Structure**

- Keep all static images in `public/images/`
- Organize by page or section if needed
- Use consistent naming conventions

## 🎉 Summary

To add images to your static pages:

1. **Prepare 6 images**:

   - 3 hero slides for homepage
   - 1 hero image for about page
   - 2 meta images for social media

2. **Place them in** `public/images/`

3. **Update component references** (if needed)

4. **Test on your website**

Your static pages will then display your own church images instead of the placeholder Unsplash images!
