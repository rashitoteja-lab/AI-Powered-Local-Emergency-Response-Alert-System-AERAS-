# Contributing to AERAS

Thank you for your interest in contributing to AERAS (AI-Powered Emergency Response System)! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Reporting Issues
- Use the GitHub issue tracker to report bugs
- Include detailed steps to reproduce the issue
- Provide browser/device information
- Include screenshots if applicable

### Suggesting Features
- Open an issue with the "feature request" label
- Describe the feature and its benefits
- Provide mockups or examples if possible

### Code Contributions

#### Getting Started
1. Fork the repository
2. Clone your fork locally
3. Install dependencies: `npm install`
4. Create a feature branch: `git checkout -b feature/your-feature-name`

#### Development Guidelines

**Code Style**
- Use TypeScript for all new code
- Follow existing code formatting
- Use meaningful variable and function names
- Add comments for complex logic

**Component Guidelines**
- Use functional components with hooks
- Keep components focused and single-purpose
- Use TypeScript interfaces for props
- Follow the existing file structure

**Styling**
- Use Tailwind CSS classes
- Maintain responsive design principles
- Follow the existing color scheme
- Test on multiple screen sizes

**Testing**
- Test your changes thoroughly
- Ensure the build passes: `npm run build`
- Run linting: `npm run lint`
- Test on different browsers

#### Commit Guidelines
- Use clear, descriptive commit messages
- Start with a verb (Add, Fix, Update, Remove)
- Keep the first line under 50 characters
- Include more details in the body if needed

Example:
```
Add emergency severity filtering to map

- Implement severity level checkboxes
- Update map markers based on filter selection
- Add visual indicators for active filters
```

#### Pull Request Process
1. Ensure your code follows the guidelines above
2. Update documentation if needed
3. Create a pull request with:
   - Clear title and description
   - Reference any related issues
   - Screenshots of UI changes
   - List of changes made

## 🏗️ Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Local Development
```bash
# Clone your fork
git clone https://github.com/yourusername/aeras-emergency-system.git
cd aeras-emergency-system

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

### Project Structure
```
src/
├── components/          # React components
│   ├── Alerts/         # Alert system components
│   ├── Dashboard/      # Dashboard components
│   ├── Map/           # Map-related components
│   └── Reports/       # Reporting components
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
└── App.tsx           # Main application
```

## 🎨 Design Guidelines

### UI/UX Principles
- **Clarity**: Information should be easy to understand
- **Accessibility**: Design for all users
- **Responsiveness**: Work on all device sizes
- **Performance**: Keep interactions fast and smooth

### Emergency Context
- Use appropriate colors for severity levels
- Maintain urgency without causing panic
- Ensure critical information is prominent
- Consider users in stressful situations

### Color Usage
- **Red**: Critical emergencies, urgent actions
- **Orange**: High severity, warnings
- **Yellow**: Medium severity, caution
- **Green**: Low severity, resolved, success
- **Blue**: Information, navigation, neutral actions

## 🧪 Testing Guidelines

### Manual Testing
- Test all emergency types and severity levels
- Verify responsive design on different screen sizes
- Check map functionality (zoom, markers, popups)
- Test form validation and submission
- Verify alert notifications work correctly

### Browser Testing
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Documentation

### Code Documentation
- Add JSDoc comments for complex functions
- Document component props with TypeScript interfaces
- Include usage examples for utility functions

### README Updates
- Update feature lists when adding new functionality
- Add new configuration options
- Update screenshots if UI changes significantly

## 🚀 Release Process

### Version Numbering
We follow semantic versioning (semver):
- **Major** (1.0.0): Breaking changes
- **Minor** (0.1.0): New features, backwards compatible
- **Patch** (0.0.1): Bug fixes, backwards compatible

### Release Checklist
- [ ] All tests pass
- [ ] Documentation updated
- [ ] Version number updated
- [ ] Changelog updated
- [ ] Build succeeds
- [ ] Deploy to staging for testing

## 🤔 Questions?

If you have questions about contributing:
- Check existing issues and discussions
- Create a new issue with the "question" label
- Reach out to maintainers

## 🙏 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- GitHub contributors page

Thank you for helping make emergency response more effective and accessible!