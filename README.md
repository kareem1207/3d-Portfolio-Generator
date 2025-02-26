# 3D Portfolio Generator

Welcome to 3D Portfolio Generator! This tool allows you to create stunning 3D portfolios to showcase your work, skills, and experiences in an immersive and interactive environment.


## 🚀 Features

- Interactive 3D environments to showcase your work
- Customizable templates and themes
- Responsive design that works on desktop and mobile devices
- Easy integration with your existing projects
- Export options for web hosting
- Real-time previews of your portfolio
- User-friendly interface, no 3D modeling experience required

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14.0.0 or later)
- [npm](https://www.npmjs.com/) (v6.0.0 or later) or [yarn](https://yarnpkg.com/) (v1.22.0 or later)
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- [Git](https://git-scm.com/) (optional, for contributing)

## 🔧 Installation

1. Clone the repository:

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
   - Rename `.env.example` to `.env`
   - Fill in the required environment variables

```bash
# Database Configuration
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"

# Authentication Setup
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"

# OAuth Provider Configuration
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Database Connection
MONGODB_URI="your_mongodb_connection_string"
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open your browser and navigate to `http://localhost:3000`

## 🔑 API Keys and Services Setup

### Required Services Configuration

1. **Database Setup**:
   - Set up a PostgreSQL database
   - Configure your connection string in `DATABASE_URL`
   - Alternative: Set up MongoDB and configure `MONGODB_URI`

2. **Authentication Setup**:
   - Generate a secure `NEXTAUTH_SECRET` using:
     ```bash
     openssl rand -base64 32
     ```
   - Set your `NEXTAUTH_URL` to your application's URL

3. **OAuth Provider Setup**:

   a. Google OAuth:
   - Visit [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project
   - Enable OAuth 2.0
   - Create credentials
   - Add authorized redirect URIs
   - Copy Client ID and Secret to your `.env`

   b. GitHub OAuth:
   - Go to [GitHub Developer Settings](https://github.com/settings/developers)
   - Create new OAuth App
   - Set homepage URL and callback URL
   - Copy Client ID and Secret to your `.env`

### Verify Configuration

Test your setup with:
```bash
# Verify database connection
npm run db:verify

# Test authentication
npm run auth:test
```

## 🛠️ Advanced Configuration

### Performance Profiles
```javascript
// In config.js
module.exports = {
  low: {
    textureSize: 1024,
    shadowQuality: "low",
    maxPolygons: 500000
  },
  high: {
    textureSize: 4096,
    shadowQuality: "high",
    maxPolygons: 2000000
  }
}
```

### Debug Mode
Enable debugging by running in console:
```javascript
window.DEBUG_MODE = true;
```

## 📱 Mobile Optimization Tips
- Use "low" performance setting
- Compress textures and models
- Limit animations
- Test on various devices

## 📥 Detailed Setup Guide

### Cloning and Installation

1. Fork the repository:
   - Visit https://github.com/yourusername/3d-Portfolio-Generator
   - Click the "Fork" button in the top-right corner
   - Select your GitHub account as the destination

2. Clone your forked repository:
```bash
git clone https://github.com/your-username/3d-Portfolio-Generator.git
cd 3d-Portfolio-Generator
```

3. Add upstream remote:
```bash
git remote add upstream https://github.com/original-owner/3d-Portfolio-Generator.git
```

4. Create a new branch for your work:
```bash
git checkout -b feature/your-feature-name
```

### Setting Up Development Environment

1. Install project dependencies:
```bash
npm install
# or with yarn
yarn install
```

2. Configure environment variables:
```bash
# Copy the example env file
cp .env.example .env

# Edit .env with your values
nano .env
```

3. Start development server:
```bash
npm run dev
# or
yarn dev
```

## 🤝 Contributing Guidelines

### Contribution Workflow

1. **Update your fork**:
```bash
git checkout main
git fetch upstream
git rebase upstream/main
git push origin main
```

2. **Create feature branch**:
```bash
git checkout -b feature/your-feature
```

3. **Make your changes**:
- Write clean, commented code
- Follow our coding standards
- Add tests for new features

4. **Commit your changes**:
```bash
git add .
git commit -m "feat: add new feature X"
```

5. **Push to your fork**:
```bash
git push origin feature/your-feature
```

6. **Create Pull Request**:
- Go to your fork on GitHub
- Click "New Pull Request"
- Select your feature branch
- Fill in the PR template
- Add screenshots if applicable

### Code Style Guidelines

- Use ESLint and Prettier configurations
- Follow component naming conventions
- Write meaningful commit messages
- Keep components small and focused
- Document complex logic

### Testing Requirements

```bash
# Run tests before submitting PR
npm run test

# Check code coverage
npm run test:coverage

# Run linting
npm run lint
```

### Common Issues and Solutions

1. **WebGL Not Working**:
   - Check browser compatibility
   - Update graphics drivers
   - Enable hardware acceleration

2. **Performance Issues**:
   - Use performance profiler
   - Check model polygon count
   - Optimize texture sizes

3. **Environment Setup**:
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules: `rm -rf node_modules`
   - Reinstall dependencies: `npm install`
