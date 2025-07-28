# Update Static Images - Component References

Once you have your images placed in the `public/images/` directory, you'll need to update the component references to use your local images instead of the Unsplash URLs.

## 📋 Files to Update

### **1. Hero Section (Homepage)**

**File**: `components/sections/hero-section.tsx`

**Current URLs** (lines 18-32):

```tsx
const heroSlides = [
  {
    title: "Welcome to PMC",
    subtitle: "Philadelphia Missionary Church",
    description: "...",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80",
    badge: "Established 1989",
    icon: Award,
  },
  {
    title: "Making Disciples",
    subtitle: "Across Switzerland",
    description: "...",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80",
    badge: "34+ Years of Ministry",
    icon: Heart,
  },
  {
    title: "An Open Door",
    subtitle: "Revelation 3:8",
    description: "...",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80",
    badge: "10 Churches Nationwide",
    icon: Globe,
  },
];
```

**Replace with**:

```tsx
const heroSlides = [
  {
    title: "Welcome to PMC",
    subtitle: "Philadelphia Missionary Church",
    description: "...",
    image: "/images/hero-slide-1.jpg",
    badge: "Established 1989",
    icon: Award,
  },
  {
    title: "Making Disciples",
    subtitle: "Across Switzerland",
    description: "...",
    image: "/images/hero-slide-2.jpg",
    badge: "34+ Years of Ministry",
    icon: Heart,
  },
  {
    title: "An Open Door",
    subtitle: "Revelation 3:8",
    description: "...",
    image: "/images/hero-slide-3.jpg",
    badge: "10 Churches Nationwide",
    icon: Globe,
  },
];
```

### **2. About Page Hero**

**File**: `components/sections/about-us-content.tsx`

**Current URL** (around line 60):

```tsx
<img
  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80"
  alt="Philadelphia Missionary Church"
  className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
/>
```

**Replace with**:

```tsx
<img
  src="/images/about-hero.jpg"
  alt="Philadelphia Missionary Church"
  className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
/>
```

## 🚀 Quick Update Commands

If you want to quickly update the references, you can use these search and replace operations:

### **For Hero Section**:

```bash
# Replace Unsplash URLs with local image paths
sed -i 's|https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80|/images/hero-slide-1.jpg|g' components/sections/hero-section.tsx
sed -i 's|https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80|/images/hero-slide-2.jpg|g' components/sections/hero-section.tsx
sed -i 's|https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80|/images/hero-slide-3.jpg|g' components/sections/hero-section.tsx
```

### **For About Page**:

```bash
# Replace Unsplash URL with local image path
sed -i 's|https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80|/images/about-hero.jpg|g' components/sections/about-us-content.tsx
```

## ✅ Verification Steps

After updating the references:

1. **Test locally**:

   ```bash
   npm run dev
   ```

2. **Check homepage**:

   - Visit `http://localhost:3000`
   - Verify hero slides show your images
   - Check that slides transition correctly

3. **Check about page**:

   - Visit `http://localhost:3000/about`
   - Verify hero image shows your image
   - Check that image loads properly

4. **Test build**:
   ```bash
   npm run build
   ```

## 🎯 Image File Checklist

Before updating references, ensure you have these files in `public/images/`:

- ✅ `hero-slide-1.jpg`
- ✅ `hero-slide-2.jpg`
- ✅ `hero-slide-3.jpg`
- ✅ `about-hero.jpg`
- ✅ `church-hero.jpg` (for meta)
- ✅ `church-about.jpg` (for meta)

## 🔧 Troubleshooting

### **Images not loading?**

- Check file paths are correct
- Ensure images are in `public/images/` directory
- Verify file names match exactly (case-sensitive)
- Check file permissions

### **Images look distorted?**

- Ensure images are high resolution (1920px+ wide)
- Check aspect ratios match the design
- Optimize images for web use

### **Build errors?**

- Check for typos in file paths
- Ensure all referenced images exist
- Verify image file formats are supported

## 🎉 Success!

Once you've updated the references and placed your images:

- ✅ Homepage will show your church images
- ✅ About page will show your church image
- ✅ Social media previews will use your images
- ✅ Faster loading (local vs external URLs)
- ✅ Better SEO (your own images)

Your static pages will now display your own church images instead of placeholder stock photos!
