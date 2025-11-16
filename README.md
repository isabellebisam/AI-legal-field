# AI in Legal Practice: Digital Law & Intellectual Property

An educational website exploring the applications of artificial intelligence in digital law and intellectual property, with an interactive copyright enforcement simulator.

## About

This project examines how AI is transforming legal practice, particularly in:
- **Digital Law**: Platform regulation, content moderation, privacy, algorithmic due diligence
- **Intellectual Property**: Copyright, authorship, training data, AI-generated works
- **Regulation**: EU AI Act, GDPR, Brazil's PL 2338, US Copyright Office guidance
- **Ethics**: Transparency, accountability, algorithmic bias, due process

**Target Audience**: Law students, legal researchers, legal professionals, content creators, policymakers

## Features

- **9 Comprehensive Pages**: Covering AI fundamentals, applications, regulations, and ethics
- **Interactive Demo**: Copyright Enforcement Simulator showing how AI systems make decisions
- **20 Realistic Scenarios**: Legal cases illustrating fair use, infringement, and edge cases
- **Extensive References**: Citations to regulations, court cases, and academic scholarship
- **Glossary**: Key terms in AI and legal practice
- **Fully Responsive**: Works on desktop, tablet, and mobile devices

## Interactive Demo

The **Copyright Enforcement Simulator** lets users:
- Review copyright cases as a content moderator
- See AI recommendations and decide whether to accept or override them
- Adjust system parameters (sensitivity, fair use threshold, model type, training data quality)
- Track accuracy, false positives, and false negatives
- Compare their performance against the AI
- Learn about real-world consequences of automated decisions

## Technology

- **Static Website**: HTML5, CSS3, JavaScript (ES6+)
- **Visualization**: P5.js for interactive canvas
- **No Build Process**: Simple deployment to any static host
- **GitHub Pages Ready**: Designed for easy deployment

## Project Structure

```
├── index.html                  # Home page
├── what-is-ai.html            # AI fundamentals
├── digital-law.html           # AI in Digital Law
├── intellectual-property.html # AI in IP
├── regulations.html           # Regulatory landscape
├── ethics.html                # Ethical implications
├── demo.html                  # Interactive simulator
├── glossary.html              # Key terms
├── references.html            # Citations & resources
├── css/                       # Stylesheets
├── js/                        # JavaScript logic
└── assets/data/               # Demo scenarios
```

## Running Locally

**Option 1: Python HTTP Server**
```bash
python -m http.server 8000
```
Then open http://localhost:8000

**Option 2: Any static server**
```bash
npx serve .
```

**Option 3: VS Code Live Server**
- Install "Live Server" extension
- Right-click `index.html` → "Open with Live Server"

## Content Highlights

### What is AI
- Machine learning fundamentals
- Generative AI models (GPT, DALL-E, Stable Diffusion)
- Automated decision-making systems
- The black box problem

### Digital Law Applications
- Content moderation at scale (YouTube Content ID, Meta's AI)
- Privacy and GDPR Article 22
- Algorithmic due diligence
- Digital rights management

### Intellectual Property
- AI authorship questions (Thaler v. Vidal)
- Training data copyright (Andersen v. Stability AI, Getty v. Stability AI, NYT v. OpenAI)
- AI-generated works and derivative works
- Licensing and policy responses

### Regulations
- **EU AI Act**: Risk-based framework, high-risk systems, enforcement
- **GDPR**: Automated decision-making rights, transparency
- **Brazil PL 2338**: Comprehensive AI regulation proposal
- **US Guidance**: Copyright Office positions on AI authorship

### Ethics
- Transparency and explainability challenges
- Accountability gaps
- Algorithmic bias and discrimination
- Due process and procedural justice
- Power dynamics and algorithmic governance

## Academic Project

This project is part of the **Humanities in the Age of AI** course from the University of Central Florida (UCF).

**Created by**: Isabelle Bianca Sampaio ([@isabellebisam](https://github.com/isabellebisam))

**Purpose**: Educational resource (not legal advice)

**License**: All rights reserved. 2025.

## Documentation

- See [CLAUDE.md](CLAUDE.md) for detailed developer documentation
- Includes architecture, design patterns, and contribution guidelines

## Key References

- EU Artificial Intelligence Act (2024)
- General Data Protection Regulation (GDPR)
- Brazil's Projeto de Lei 2338/2023
- US Copyright Office AI Guidance (2023)
- Major court cases: Thaler v. Vidal, Andersen v. Stability AI, Getty v. Stability AI, NYT v. OpenAI

Full references available on the [References](references.html) page.

## Future Enhancements

Potential improvements:
- Add visual diagrams (ML pipeline, regulatory timeline, etc.)
- Expand demo scenarios and difficulty levels
- Implement search functionality
- Add dark mode
- Create downloadable study guides

## Contact

For questions or feedback: [@isabellebisam](https://github.com/isabellebisam)

---

**Disclaimer**: This website is for educational purposes only and does not constitute legal advice. Laws and regulations are subject to change. Consult qualified legal professionals for specific legal questions.
