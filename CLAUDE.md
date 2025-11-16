# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AI-legal-field is an educational website exploring the applications of AI in Digital Law and Intellectual Property. The project is a static website built with HTML, CSS, and JavaScript, designed for deployment on GitHub Pages.

**Purpose**: Educational resource for law students, legal professionals, and researchers interested in how AI is transforming legal practice, with focus on copyright enforcement, platform governance, and algorithmic decision-making.

**Target Audience**: Law students, legal researchers, legal professionals, content creators, policymakers

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Visualization**: P5.js for interactive demo
- **Deployment**: GitHub Pages (static site hosting)
- **Dependencies**:
  - P5.js v1.7.0 (CDN)
  - No build process required

## Project Structure

```
AI-legal-field/
├── index.html                  # Home page
├── what-is-ai.html            # AI fundamentals
├── digital-law.html           # AI in Digital Law
├── intellectual-property.html # AI in IP Law
├── regulations.html           # Regulatory landscape
├── ethics.html                # Ethical implications
├── demo.html                  # Interactive copyright simulator
├── glossary.html              # Key terms
├── references.html            # Citations & resources
│
├── css/
│   ├── main.css              # Global styles, navigation, typography
│   ├── pages.css             # Page-specific layouts
│   └── demo.css              # Demo interface styling
│
├── js/
│   ├── navigation.js         # Fixed nav, mobile menu
│   ├── demo.js               # Demo game logic
│   └── demo-p5.js           # P5.js visualization
│
├── assets/
│   ├── data/
│   │   └── demo-cases.json  # 20 copyright scenarios for demo
│   ├── images/              # Diagrams, illustrations (placeholders)
│   └── icons/               # UI icons
│
└── CLAUDE.md                 # This file
```

## Development Commands

This is a static website with no build process. Development workflow:

### Local Development

**Option 1: Python HTTP Server**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```
Then open http://localhost:8000

**Option 2: VS Code Live Server**
- Install "Live Server" extension
- Right-click index.html → "Open with Live Server"

**Option 3: Any static file server**
```bash
npx serve .
```

### Testing
- Manual testing in browsers: Chrome, Firefox, Safari, Edge
- Test responsive design at breakpoints: 320px, 768px, 1024px, 1200px+
- Test mobile menu functionality
- Test demo interactivity and game logic

### Deployment
```bash
# Ensure you're on the correct branch
git branch

# Add all changes
git add .

# Commit with descriptive message
git commit -m "Your message here"

# Push to GitHub
git push -u origin <branch-name>
```

GitHub Pages deployment is automatic once pushed to the appropriate branch.

### GitHub Pages Setup
1. Go to repository Settings → Pages
2. Under "Source", select branch (e.g., `main` or feature branch)
3. Select folder: `/ (root)`
4. Save and wait ~1-2 minutes for deployment
5. Access at: `https://<username>.github.io/AI-legal-field/`

## Architecture

### Navigation System
- Fixed header with responsive navigation
- Mobile: Hamburger menu (< 768px)
- Desktop: Horizontal nav bar
- Active page highlighting
- Smooth scrolling for anchor links

### CSS Architecture
- **CSS Variables**: Centralized theming (colors, spacing, typography)
- **Mobile-first**: Base styles for mobile, enhanced for larger screens
- **Responsive breakpoints**:
  - Small mobile: < 480px
  - Mobile: < 768px
  - Tablet: < 1024px
  - Desktop: 1024px+

### Interactive Demo (`demo.html`)
**Purpose**: Simulate copyright enforcement decisions to illustrate AI bias and limitations

**Components**:
1. **Parameter Controls**: Sliders and selects to adjust AI system parameters
   - Detection Sensitivity (1-100)
   - Fair Use Threshold (1-100)
   - Model Type (fast/balanced/slow)
   - Training Data Quality (biased/moderate/diverse)

2. **Game Logic** (`demo.js`):
   - Loads 20 copyright scenarios from JSON
   - Generates AI recommendations based on parameters
   - Tracks user decisions vs. AI recommendations
   - Calculates accuracy, false positives, false negatives
   - Provides explanations for each case

3. **Visualization** (`demo-p5.js`):
   - P5.js canvas showing abstract content representations
   - Different visualizations for Audio, Video, Image content types
   - Responsive canvas sizing

4. **Scoring System**:
   - User accuracy vs. ground truth
   - AI accuracy vs. ground truth
   - False positive/negative tracking
   - Comparison of user vs. AI performance

### Data Model (`demo-cases.json`)
Each case includes:
- `id`: Unique identifier
- `title`: Case name
- `description`: Content description
- `contentType`: Audio | Video | Image
- `uploadContext`: Commercial, educational, etc.
- `isInfringing`: Boolean ground truth
- `category`: fair_use | clear_infringement | requires_licensing | edge_case
- `transformative`: Boolean
- `commercialUse`: Boolean
- `amountUsed`: complete | substantial | partial | minimal | none
- `marketHarm`: high | moderate | low | minimal
- `explanation`: Legal analysis

## Content Guidelines

### Writing Style
- Academic but accessible
- Legally precise without unnecessary jargon
- Examples and case studies for concrete illustration
- Citations to authoritative sources

### Citations
- In-text references to cases, regulations, scholarship
- Full references on references.html
- Links to official sources where available

### Legal Accuracy
- Project created for educational purposes (not legal advice)
- Based on US law primarily, with international comparisons
- Law evolves; content accurate as of 2024-2025

## Key Design Patterns

### Responsive Images/Diagrams
Currently use placeholders:
```html
<div class="visual-placeholder">
    <p><em>[Diagram: Description of what should be shown]</em></p>
</div>
```

When adding actual images:
- Use descriptive alt text for accessibility
- Optimize file sizes (< 200KB for diagrams)
- Support both light and dark mode if applicable
- Use SVG for diagrams when possible

### Info Boxes
Three types for visual distinction:
```css
.info-box        /* General information, teal border */
.case-study      /* Legal cases, blue border */
.demo-note       /* Important notes, yellow background */
```

### Page Navigation
All content pages include bottom navigation:
```html
<div class="page-navigation">
    <a href="previous.html" class="prev-link">← Previous</a>
    <a href="next.html" class="next-link">Next →</a>
</div>
```

## Legal Domain Considerations

When working on this project:

1. **Accuracy is critical**: Copyright law, AI regulation, and case citations must be accurate
2. **Disclaimers**: This is educational content, not legal advice
3. **Balanced perspective**: Present multiple viewpoints on controversial issues (AI training data, fair use, bias)
4. **Ethical sensitivity**: Acknowledge real harms (content creator livelihoods, algorithmic bias, free speech)
5. **International scope**: Cover US, EU, and Brazil regulations; acknowledge other jurisdictions
6. **Evolving law**: AI law is rapidly developing; content may need updates

## Future Enhancements

Potential improvements:
- Add actual diagrams to replace placeholders (ML pipeline, regulatory timeline, etc.)
- Expand demo with more scenarios
- Add difficulty levels to demo
- Include real case examples with images
- Add search functionality to glossary
- Implement dark mode
- Add print stylesheet
- Create downloadable resources (PDF guides, reference sheets)

## Common Tasks

### Adding a New Page
1. Create HTML file following existing structure
2. Copy header/footer from another page
3. Update navigation in ALL pages to include new link
4. Update page navigation arrows appropriately
5. Add specific styles to pages.css if needed

### Adding a New Demo Scenario
1. Edit `assets/data/demo-cases.json`
2. Follow existing schema
3. Ensure `isInfringing` ground truth is correct
4. Write clear, legally accurate explanation
5. Test demo to verify scenario loads correctly

### Updating Styles
1. Check if CSS variable exists for the property
2. Prefer editing variables over hardcoded values
3. Test responsive behavior at all breakpoints
4. Ensure accessibility (color contrast, focus states)

## Accessibility Checklist

- Semantic HTML (header, nav, main, footer, article, section)
- ARIA labels on interactive elements (mobile menu toggle)
- Keyboard navigation support
- Color contrast ratios meet WCAG AA standards
- Alt text for images (when added)
- Focus indicators visible
- No content conveyed by color alone

## Browser Compatibility

Target browsers:
- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android)

Known limitations:
- IE11 not supported (uses CSS Grid, ES6)
- Older mobile browsers may have limited CSS support

## Troubleshooting

### Demo Not Loading
- **Check browser console** for JavaScript errors
- Verify `demo-cases.json` is accessible (check path in demo.js)
- Ensure P5.js CDN is loading (check network tab)
- Try clearing browser cache

### Navigation Menu Not Working on Mobile
- Check that `navigation.js` is loaded
- Verify mobile-menu-toggle class is on button element
- Test that JavaScript is enabled in browser

### Styles Not Applying
- Confirm CSS files are linked in correct order (main.css → pages.css → demo.css)
- Check for CSS syntax errors in browser dev tools
- Verify file paths are correct (relative to HTML file)

### Demo Algorithm Logic

The AI recommendation system in `demo.js` (`calculateRecommendation` function) works as follows:

1. **Base Accuracy**: Determined by model type (fast: 70%, balanced: 80%, slow: 88%)
2. **Bias Factor**: Training data quality affects error rate (biased: 30% error prone, diverse: 5%)
3. **Sensitivity**: Higher values increase false positive rate
4. **Fair Use Factor**: More permissive threshold favors transformative uses

The algorithm intentionally simulates real-world AI behavior including:
- Errors based on model accuracy
- Systematic bias toward over-flagging (false positives)
- Sensitivity-dependent threshold adjustments
- Fair use consideration for transformative content

This creates educational scenarios where users experience tradeoffs between precision and recall.

## Notes for Future Developers

- This project is part of UCF's "Humanities in the Age of AI" course
- Designed and developed by Isabelle Bianca Sampaio (@isabellebisam)
- Academic project, not commercial
- Open to improvements but maintain educational focus
- Keep content up-to-date with evolving AI law and regulations
