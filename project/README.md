# AERAS - AI-Powered Emergency Response System

<div align="center">
  <img src="https://images.pexels.com/photos/73833/worm-s-eye-view-photography-of-concrete-buildings-73833.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop" alt="AERAS Emergency Response System" width="100%" height="200" style="object-fit: cover; border-radius: 10px;">
  
  [![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC.svg)](https://tailwindcss.com/)
  [![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF.svg)](https://vitejs.dev/)
  [![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
</div>

## 🚨 Overview

AERAS (AI-Powered Emergency Response System) is a cutting-edge web application designed to revolutionize emergency response and community safety. Built with modern web technologies, it provides real-time emergency monitoring, AI-powered threat assessment, and community-driven incident reporting.

### ✨ Key Features

- **🗺️ Interactive Emergency Map** - Real-time visualization of emergencies with severity indicators
- **🤖 AI-Powered Classification** - Intelligent emergency categorization and threat assessment
- **📱 Community Reporting** - Easy-to-use emergency reporting interface
- **🔔 Live Alert System** - Real-time notifications for critical incidents
- **📊 Analytics Dashboard** - Comprehensive emergency statistics and trends
- **🎯 Geolocation Support** - Location-aware emergency detection and reporting
- **🔒 Responsive Design** - Optimized for desktop, tablet, and mobile devices

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS for modern, responsive design
- **Build Tool**: Vite for fast development and optimized builds
- **Maps**: Leaflet with React-Leaflet for interactive mapping
- **Icons**: Lucide React for consistent iconography
- **Date Handling**: date-fns for time formatting
- **Code Quality**: ESLint with TypeScript support

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/aeras-emergency-system.git
   cd aeras-emergency-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Build for Production

```bash
npm run build
npm run preview
```

## 📱 Application Features

### Dashboard
- **Real-time Statistics**: Active emergencies, resolution rates, AI accuracy metrics
- **Emergency Feed**: Live list of reported incidents with community voting
- **Alert Notifications**: Instant alerts for critical situations

### Interactive Map
- **Emergency Visualization**: Color-coded markers based on severity levels
- **Affected Radius**: Visual representation of emergency impact zones
- **Real-time Updates**: Live tracking of emergency status changes
- **Filtering Options**: Customizable views for different emergency types

### Emergency Reporting
- **Multi-category Support**: 8 emergency types including flooding, fires, medical, etc.
- **AI Processing**: Intelligent classification and confidence scoring
- **Geolocation Integration**: Automatic location detection
- **Media Support**: Photo and voice note capabilities (UI ready)

### Emergency Types Supported
- 💧 **Flooding/Waterlogging**
- ⚡ **Power Outages**
- 🌬️ **Air Quality Issues**
- 🚨 **Safety/Security Incidents**
- 🔥 **Fire Emergencies**
- 🏥 **Medical Emergencies**
- 🚗 **Traffic Incidents**
- ⛈️ **Weather Emergencies**

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Alerts/
│   │   └── AlertsPanel.tsx          # Real-time alert notifications
│   ├── Dashboard/
│   │   ├── EmergencyList.tsx        # Emergency feed component
│   │   └── StatsCard.tsx            # Statistics display cards
│   ├── Map/
│   │   └── EmergencyMap.tsx         # Interactive Leaflet map
│   └── Reports/
│       └── ReportForm.tsx           # Emergency reporting interface
├── types/
│   └── emergency.ts                 # TypeScript type definitions
├── utils/
│   └── mockData.ts                  # Mock data generators
├── App.tsx                          # Main application component
├── main.tsx                         # Application entry point
└── index.css                        # Global styles with Tailwind
```

## 🎨 Design System

### Color Palette
- **Primary**: Red tones for emergency contexts
- **Secondary**: Blue for informational elements
- **Success**: Green for resolved incidents
- **Warning**: Yellow/Orange for medium severity
- **Critical**: Deep red for high-priority alerts

### Typography
- **Headings**: Bold, clear hierarchy
- **Body**: Readable sans-serif fonts
- **Code**: Monospace for technical elements

### Spacing
- Consistent 8px grid system
- Generous whitespace for clarity
- Responsive breakpoints for all devices

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_APP_TITLE=AERAS Emergency Response System
VITE_MAP_DEFAULT_LAT=40.7128
VITE_MAP_DEFAULT_LNG=-74.0060
VITE_API_BASE_URL=https://api.aeras.com
```

### Customization
- **Emergency Types**: Modify `src/types/emergency.ts`
- **Mock Data**: Update `src/utils/mockData.ts`
- **Styling**: Customize `tailwind.config.js`
- **Map Settings**: Configure in `src/components/Map/EmergencyMap.tsx`

## 📊 Performance Features

- **Code Splitting**: Automatic route-based splitting
- **Lazy Loading**: Components loaded on demand
- **Optimized Images**: Efficient asset loading
- **Responsive Design**: Mobile-first approach
- **Fast Refresh**: Instant development feedback

## 🧪 Testing

```bash
# Run linting
npm run lint

# Type checking
npx tsc --noEmit

# Build verification
npm run build
```

## 🚀 Deployment

### Netlify (Recommended)
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on push

### Vercel
1. Import project from GitHub
2. Framework preset: Vite
3. Build command: `npm run build`
4. Output directory: `dist`

### Manual Deployment
```bash
npm run build
# Upload dist/ folder to your hosting provider
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Maintain responsive design principles
- Write clear, descriptive commit messages
- Test across different devices and browsers

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Leaflet** for the interactive mapping capabilities
- **Lucide** for the beautiful icon set
- **Vite** for the lightning-fast build tool

## 📞 Support

For support, questions, or feature requests:
- Create an issue on GitHub
- Email: support@aeras.com
- Documentation: [docs.aeras.com](https://docs.aeras.com)

## 🔮 Future Roadmap

- [ ] Real-time WebSocket integration
- [ ] Push notification support
- [ ] Mobile app development
- [ ] Advanced AI/ML integration
- [ ] Multi-language support
- [ ] Government API integrations
- [ ] Advanced analytics and reporting
- [ ] User authentication system

---

<div align="center">
  <p>Built with ❤️ for safer communities</p>
  <p>© 2025 AERAS Emergency Response System</p>
</div>