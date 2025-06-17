# Gallery Images Update Guide

## Current Status
✅ **Gallery is now working with placeholder images from Unsplash**
- The images will load properly now
- You can see the gallery in action at `/gallery` page

## To Replace with Your Real Photos

### 1. Save Your Photos
Save your 3 classroom photos in the following locations:

```
public/images/gallery/
├── classroom-activity-1.jpg    (Your first image - students coding)
├── instructor-mentoring.jpg    (Your second image - instructor with students)  
└── classroom-presentation.jpg  (Your third image - classroom presentation)
```

### 2. Update the Gallery Component
Once you've saved your photos, you need to update the image sources in two files:

#### File 1: `src/components/sections/activity-gallery.tsx`
Replace the Unsplash URLs with local paths:
```typescript
const galleryImages: GalleryImage[] = [
  {
    src: "/images/gallery/classroom-activity-1.jpg",  // Change this
    alt: "Students coding in modern classroom",
    // ... rest stays the same
  },
  {
    src: "/images/gallery/instructor-mentoring.jpg",  // Change this
    alt: "Instructor mentoring students",
    // ... rest stays the same
  },
  {
    src: "/images/gallery/classroom-presentation.jpg", // Change this
    alt: "Interactive classroom presentation", 
    // ... rest stays the same
  }
]
```

#### File 2: `src/app/gallery/page.tsx`
Make the same changes in the gallery page.

### 3. Recommended Image Specifications
- **Format**: JPG or PNG
- **Size**: 1200x800 pixels (3:2 aspect ratio)
- **File size**: Under 500KB each for optimal loading
- **Quality**: High quality but web-optimized

### 4. Optional: Add More Photos
You can easily add more photos by:
1. Adding more objects to the `galleryImages` array
2. Saving additional images in `public/images/gallery/`
3. Following the same structure

## Current Placeholder Images
The current Unsplash images show:
1. **Programming**: Students working on laptops in a classroom
2. **Mentoring**: Instructor helping students in a collaborative environment  
3. **Classroom**: Modern classroom with presentation setup

These give a good preview of what your real gallery will look like! 