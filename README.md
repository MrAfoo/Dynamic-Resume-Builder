# Modern Resume Builder

A dynamic web-based resume builder that creates professional resumes with real-time preview and multiple export options.

## Features

- **Real-time Preview**: See changes instantly as you type
- **Multiple Export Options**: 
  - Download as PDF
  - Share resume link
  - Print functionality
- **Responsive Design**: Works on all devices
- **Form Sections**:
  - Personal Information
  - Contact Details
  - Professional Summary
  - Education History
  - Projects
  - Skills

## Tech Stack

- HTML5
- CSS3
- JavaScript
- jQuery
- Form Repeater Plugin
- HTML2PDF.js

## Project Structure
## index.html  
- (Main form page)
## generated.html 
- (Resume preview/export page)
## assets
- css/
  main.css (Styling)
- js/
  script.js  (Form handling & preview) and 
  app.js (Validation & utilities)


## Core Components

### Form Handler (script.js)
- Manages form data collection
- Implements real-time preview
- Handles image uploads
- Uses localStorage for data persistence

### Validation (app.js)
- Input validation using regex patterns
- Supports multiple data types:
  - Text
  - Email
  - Phone numbers
  - Numbers

### Resume Generator (generated.html)
- Displays formatted resume
- Export functionalities:
  - PDF download
  - Share options
  - Resume updates

## Usage

1. Fill out the form sections
2. Upload a profile picture
3. Preview changes in real-time
4. Generate final resume
5. Download, share, or update as needed

## Styling Features

- Clean, professional layout
- Responsive design
- Print-friendly formatting
- Custom styling for:
  - Profile image
  - Section headers
  - Content blocks
  - Action buttons

## Local Storage

The application uses localStorage to:
- Save form data
- Store profile image
- Persist between sessions
- Enable resume editing

## Export Options

1. **PDF Download**
   - High-quality PDF generation
   - Maintains formatting
   - Custom file naming

2. **Share Feature**
   - Web Share API integration
   - Fallback clipboard copy
   - Direct link sharing

3. **Update Resume**
   - Return to form editor
   - Preserve existing data
   - Make quick updates

## Browser Compatibility

- Chrome
- Firefox
- Safari
- Edge
- Modern mobile browsers

## Getting Started

1. Clone the repository
2. Open index.html in a browser
3. Start building your resume

## Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## License

MIT License - feel free to use and modify for your projects
