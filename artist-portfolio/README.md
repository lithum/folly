# Artist Portfolio Website

A modern, responsive static website template designed specifically for artists to showcase their work, exhibitions, and professional information.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Portfolio Gallery**: Filterable artwork gallery with modal view
- **Exhibition Timeline**: Chronological display of exhibitions and shows
- **Press & Interviews**: Dedicated section for media coverage
- **Contact Form**: Built-in contact form with validation
- **SEO Optimized**: Semantic HTML structure for better search engine visibility
- **Fast Loading**: Optimized images and efficient CSS/JS
- **Accessibility**: WCAG compliant with keyboard navigation support

## Sections Included

1. **Hero Section**: Eye-catching introduction with featured artwork
2. **About**: Personal introduction, education, and awards
3. **Artworks**: Filterable gallery of artworks by category
4. **Exhibitions**: Timeline of solo and group exhibitions
5. **Interviews & Press**: Media coverage and interviews
6. **Contact**: Contact information and inquiry form

## Quick Start

1. **Download/Clone** the files to your local machine
2. **Customize Content**: Edit the HTML file to add your personal information
3. **Add Images**: Replace placeholder images with your actual artwork and photos
4. **Deploy**: Upload to any web hosting service

## Customization Guide

### 1. Personal Information

Edit `index.html` and replace the following placeholders:

- `Artist Name` - Your actual name
- `[City, Year]` - Your birth location and year
- `[University Name]` - Your educational institutions
- `[Award Names]` - Your awards and recognitions
- Contact information in the contact section

### 2. Images

Create an `images/` folder and add the following images:

- `hero-artwork.jpg` - Featured artwork for hero section (recommended: 800x600px)
- `artist-portrait.jpg` - Your professional portrait (recommended: 400x500px)
- `artwork-1.jpg` to `artwork-6.jpg` - Your artwork images (recommended: 400x300px)
- `interview-1.jpg` to `interview-4.jpg` - Interview/press images (recommended: 300x200px)

### 3. Artwork Gallery

To add more artworks:

1. Add new artwork items in the HTML:
```html
<div class="artwork-item" data-category="paintings">
    <img src="images/your-artwork.jpg" alt="Artwork Title" />
    <div class="artwork-info">
        <h3>Your Artwork Title</h3>
        <p>Medium, Year</p>
        <p>Dimensions</p>
    </div>
</div>
```

2. Update the JavaScript `artworkData` object with corresponding information.

### 4. Color Scheme

The website uses a red accent color (`#e74c3c`). To change it:

1. Open `styles.css`
2. Find and replace `#e74c3c` with your preferred color
3. Also replace `#c0392b` (darker shade) with a darker version of your color

### 5. Fonts

The website uses Inter font from Google Fonts. To change:

1. Replace the Google Fonts link in `index.html`
2. Update the `font-family` in `styles.css`

## Deployment Options

### 1. GitHub Pages (Free)
1. Create a GitHub repository
2. Upload your files
3. Enable GitHub Pages in repository settings
4. Your site will be available at `username.github.io/repository-name`

### 2. Netlify (Free)
1. Create account at netlify.com
2. Drag and drop your folder to Netlify
3. Get instant deployment with custom domain support

### 3. Vercel (Free)
1. Create account at vercel.com
2. Connect your GitHub repository
3. Automatic deployment on every update

### 4. Traditional Web Hosting
Upload files via FTP to any web hosting provider that supports static websites.

## File Structure

```
artist-portfolio/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
├── README.md           # This file
└── images/             # Image folder (create this)
    ├── hero-artwork.jpg
    ├── artist-portrait.jpg
    ├── artwork-1.jpg
    ├── artwork-2.jpg
    ├── artwork-3.jpg
    ├── artwork-4.jpg
    ├── artwork-5.jpg
    ├── artwork-6.jpg
    ├── interview-1.jpg
    ├── interview-2.jpg
    ├── interview-3.jpg
    └── interview-4.jpg
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance Tips

1. **Optimize Images**: Compress images before uploading (recommended tools: TinyPNG, ImageOptim)
2. **Use WebP Format**: Convert images to WebP for better compression
3. **Enable Gzip**: Configure your server to enable gzip compression
4. **CDN**: Use a Content Delivery Network for faster global loading

## SEO Optimization

1. **Meta Tags**: Add relevant meta descriptions and keywords
2. **Alt Text**: Ensure all images have descriptive alt text
3. **Schema Markup**: Consider adding structured data for better search results
4. **Sitemap**: Generate and submit a sitemap to search engines

## Accessibility Features

- Semantic HTML structure
- Keyboard navigation support
- Screen reader friendly
- High contrast ratios
- Focus indicators
- ARIA labels where needed

## Contact Form Setup

The contact form currently shows a success message without actually sending emails. To make it functional:

1. **Netlify Forms**: If using Netlify, add `netlify` attribute to the form
2. **Formspree**: Use Formspree.io for easy form handling
3. **EmailJS**: Use EmailJS for client-side email sending
4. **Server-side**: Implement server-side form processing

## Maintenance

- **Regular Updates**: Keep content fresh with new artworks and exhibitions
- **Image Optimization**: Regularly optimize images for web
- **Backup**: Keep backups of your website files
- **Analytics**: Consider adding Google Analytics for visitor insights

## Support

For questions or issues with this template:

1. Check the browser console for JavaScript errors
2. Validate HTML and CSS using online validators
3. Test on multiple devices and browsers
4. Ensure all image paths are correct

## License

This template is free to use for personal and commercial projects. Attribution is appreciated but not required.

---

**Happy showcasing your art! 🎨**

