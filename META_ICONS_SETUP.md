# Meta Icons & PNGs Setup Guide

This guide explains where to place your meta icons and PNGs for the Philadelphia Missionary Church website.

## 📁 File Structure

Place all your icons and images in the `public/` directory:

```
public/
├── favicon.ico              # Main favicon (16x16, 32x32)
├── apple-touch-icon.png     # Apple touch icon (180x180)
├── icon-192.png            # PWA icon (192x192)
├── icon-512.png            # PWA icon (512x512)
├── images/
│   ├── logo.png            # Main logo (already exists)
│   ├── og-image.png        # Open Graph image (1200x630)
│   └── twitter-image.png   # Twitter card image (1200x630)
└── manifest.json           # PWA manifest (already exists)
```

## 🎯 Required Icons & Images

### 1. Favicon (Required)

**File**: `public/favicon.ico`
**Size**: 16x16, 32x32 pixels
**Format**: ICO
**Purpose**: Browser tab icon

### 2. Apple Touch Icon (Required)

**File**: `public/apple-touch-icon.png`
**Size**: 180x180 pixels
**Format**: PNG
**Purpose**: iOS home screen icon

### 3. PWA Icons (Required)

**Files**:

- `public/icon-192.png` (192x192 pixels)
- `public/icon-512.png` (512x512 pixels)
  **Format**: PNG
  **Purpose**: Progressive Web App icons

### 4. Social Media Images (Recommended)

**Files**:

- `public/images/og-image.png` (1200x630 pixels)
- `public/images/twitter-image.png` (1200x630 pixels)
  **Format**: PNG
  **Purpose**: Social media sharing previews

## 🛠️ How to Create These Icons

### Option 1: Online Icon Generators

1. **Favicon.io** - https://favicon.io/

   - Upload your logo
   - Download all required sizes
   - Includes favicon.ico, apple-touch-icon, and PWA icons

2. **RealFaviconGenerator** - https://realfavicongenerator.net/
   - More comprehensive
   - Generates all sizes and formats
   - Includes manifest.json

### Option 2: Manual Creation

1. **Start with your logo** (high resolution, square)
2. **Resize to each required size**:
   - 16x16, 32x32 → favicon.ico
   - 180x180 → apple-touch-icon.png
   - 192x192 → icon-192.png
   - 512x512 → icon-512.png
   - 1200x630 → og-image.png, twitter-image.png

## 📋 Step-by-Step Setup

### Step 1: Create Your Icons

1. Use one of the online generators above
2. Upload your church logo
3. Download all generated files

### Step 2: Place Files in Public Directory

```bash
# Copy files to the correct locations
cp favicon.ico public/
cp apple-touch-icon.png public/
cp icon-192.png public/
cp icon-512.png public/
cp og-image.png public/images/
cp twitter-image.png public/images/
```

### Step 3: Update Metadata (if needed)

The current `app/layout.tsx` already includes the correct meta tags:

```tsx
{/* Favicon */}
<link rel="icon" href="/favicon.ico" sizes="any" />
<link rel="icon" href="/favicon.ico" type="image/x-icon" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />

{/* Manifest */}
<link rel="manifest" href="/manifest.json" />
```

### Step 4: Update Open Graph Images (Optional)

If you want to add social media preview images, update the metadata in `app/layout.tsx`:

```tsx
export const metadata: Metadata = {
  // ... existing metadata
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pmc-church.org",
    title: "PMC Church - Philadelphia Missionary Church",
    description:
      "Welcome to PMC Church - A welcoming community dedicated to spreading God's love and serving our neighbors.",
    siteName: "PMC Church",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "PMC Church - Philadelphia Missionary Church",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PMC Church - Philadelphia Missionary Church",
    description:
      "Welcome to PMC Church - A welcoming community dedicated to spreading God's love and serving our neighbors.",
    images: ["/images/twitter-image.png"],
  },
};
```

## 🎨 Design Guidelines

### Favicon Design Tips

- **Keep it simple** - Small size means details get lost
- **Use high contrast** - Should be visible on light and dark backgrounds
- **Test at small sizes** - Make sure it's recognizable at 16x16
- **Use your brand colors** - Maintain consistency with your church branding

### Social Media Image Tips

- **Include your logo** - Prominent placement
- **Add church name** - Clear, readable text
- **Use brand colors** - Consistent with your website
- **Leave space for text** - Social platforms may overlay text
- **Test on different platforms** - Facebook, Twitter, LinkedIn

## 🔍 Testing Your Icons

### 1. Browser Testing

- Open your website in different browsers
- Check favicon appears in browser tab
- Test on mobile browsers

### 2. PWA Testing

- Install your website as a PWA
- Check icons appear correctly on home screen
- Test different device sizes

### 3. Social Media Testing

- Use Facebook Sharing Debugger
- Use Twitter Card Validator
- Test on LinkedIn

## 📱 PWA Manifest

The `public/manifest.json` is already configured with:

- App name: "PMC Church - Proclaiming God's Love"
- Theme color: "#dc2626" (red)
- Icons: 192x192 and 512x512

You can update the manifest if needed:

```json
{
  "name": "PMC Church - Proclaiming God's Love",
  "short_name": "PMC Church",
  "description": "A welcoming community dedicated to spreading God's love and serving our neighbors",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#dc2626",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable any"
    }
  ]
}
```

## 🚀 Quick Start

1. **Go to https://favicon.io/**
2. **Upload your church logo**
3. **Download the generated files**
4. **Place them in the `public/` directory**
5. **Test your website**

That's it! Your icons should now appear correctly across all platforms.
