# Assets Directory

This directory contains static assets for your project.

## Structure

- `images/` - Image files (PNG, JPG, SVG, WebP)
- `fonts/` - Custom font files (TTF, WOFF, WOFF2)
- `icons/` - Icon files (SVG, PNG)

## Usage

Reference assets in your code using relative paths:

```html
<!-- Images -->
<img src="/assets/images/logo.png" alt="Logo">

<!-- Fonts -->
<style>
@font-face {
  font-family: 'CustomFont';
  src: url('/assets/fonts/custom-font.woff2') format('woff2');
}
</style>

<!-- Icons -->
<img src="/assets/icons/icon.svg" alt="Icon">
```

## Best Practices

- Use appropriate file formats (WebP for images, WOFF2 for fonts)
- Optimize assets for web (compress images, subset fonts)
- Use descriptive file names
- Keep file sizes reasonable for fast loading 