# SWStarter - Star Wars API Application

A full-stack Star Wars character and movie search application built for the LawnStarter coding exercise. This application serves as a proxy to the Star Wars API (https://swapi.tech) with real-time statistics tracking and a responsive user interface matching the provided Zeplin designs.

## 🌟 Features

- **Search Interface**: Search for Star Wars characters and movies with live results
- **Character Details**: View detailed information about characters including their movie appearances
- **Movie Details**: Browse movie information with character lists and clickable links
- **Statistics Tracking**: Real-time API usage analytics updated every 5 minutes
- **Responsive Design**: Pixel-perfect implementation of Zeplin mockups
- **Docker Ready**: Complete containerization for easy deployment

## 🛠 Tech Stack

### Frontend (@sw-starter/web)
- **React** with TypeScript
- **Vite** for development and bundling
- **React Router DOM** for navigation
- **Tailwind CSS** for styling
- **Tanstack Query** for API state management

### Backend (sw-starter/api)
- **Laravel** framework
- **PHP** 
- **Guzzle HTTP** for Star Wars API integration
- **File-based caching** for statistics storage
- **Laravel Scheduler** for background statistics computation

### Infrastructure
- **Docker Compose** for container orchestration
- **Turborepo** for monorepo management
- **Background Services** for statistics processing

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js (for local development)
- PHP (for local development)

### Option 1: Docker (Recommended)

```bash
# Clone the repository
git clone https://github.com/alvarengathomas/swstarter

# Start all services
docker-compose up --build

# Access the application
# Frontend: http://localhost:3000
# API: http://localhost:8000
# Statistics: http://localhost:8000/api/statistics
```

### Option 2: Local Development

```bash
# Install dependencies
npm install

# Start all services in development mode
npm run dev

# Or start services individually:
# Backend: cd apps/api && php artisan serve
# Frontend: cd apps/web && npm run dev
```

## 🏗 Project Structure

```
├── apps/
│   ├── api/                    # Laravel backend
│   │   ├── app/Http/Controllers/StarWarsController.php
│   │   ├── app/Console/Commands/ComputeStatistics.php
│   │   └── routes/api.php
│   └── web/                    # React frontend
│       ├── src/
│       │   ├── pages/          # Page components
│       │   ├── components/     # Reusable components
│       │   └── types.ts        # TypeScript definitions
├── screenshots/                # Zeplin design mockups
├── docker-compose.yml          # Container orchestration
└── docs/exercise.md           # Original exercise requirements
```

## 🔧 Available Scripts

### Root Level (Turborepo)
```bash
npm run dev          # Start all services in development
npm run build        # Build all applications
npm run lint         # Lint all projects
npm run check-types  # Type check all TypeScript
```

### Frontend (apps/web)
```bash
npm run dev          # Development server
npm run build        # Production build
npm run preview      # Preview production build
```

### Backend (apps/api)
```bash
php artisan serve                    # Start Laravel server
php artisan statistics:compute       # Manual statistics computation
composer run dev                     # Full development mode
```

## 📊 API Endpoints

- `GET /api/health` - Health check endpoint
- `POST /api/search` - Search for people or films
- `GET /api/person/{id}` - Get person details with films
- `GET /api/film/{id}` - Get film details with characters
- `GET /api/statistics` - Get usage statistics (updated every 5 minutes)

## 🐳 Docker Services

- **sw-starter-api**: Laravel backend (port 8000)
- **sw-starter-web**: React frontend (port 3000)
- **sw-starter-scheduler**: Background statistics computation
- **sw-starter-network**: Internal container networking

## 📈 Statistics Features

The application tracks and computes:
- Total search queries performed
- Top 5 most searched terms with percentages
- Average API response times
- Peak usage hours
- Automatic recomputation every 5 minutes via Laravel scheduler

## 🎨 Design Implementation

The user interface precisely matches the provided Zeplin mockups:
1. Search form with People/Movies radio selection
2. Input field with placeholder text
3. Results display with green "SEE DETAILS" buttons
4. Character detail pages with movie links
5. Movie detail pages with character lists
6. Responsive layout with proper spacing and typography

## 🧪 Testing

```bash
# Backend tests
cd apps/api && composer test

# Frontend linting
cd apps/web && npm run lint
```

## 📝 Environment Variables

### Backend (.env)
```
APP_NAME="SWStarter API"
APP_ENV=local
APP_DEBUG=true
CACHE_STORE=file
QUEUE_CONNECTION=sync
```

### Frontend
```
VITE_API_URL=http://localhost:8000
```

## 🚢 Deployment

The application is fully containerized:

```bash
# Start services
docker-compose up

# Stop services
docker-compose down
``` 

## ❓ Interview Questions & Answers

1. **What are you hoping to find in your next position that would make us the right next step in your career?**

    I am looking for an environment where I can grow technically and contribute to impactful projects, while collaborating with talented teams and sharing knowledge. I am interested in opportunities for future growth into positions such as Tech Lead or Principal Engineer. LawnStarter’s focus on engineering ownership and deploying to production matches my desire to deliver high-quality solutions and continuously develop my skills, with the potential to take on greater responsibility over time.

2. **What have you learned so far about us that has excited you?**

    I am excited by LawnStarter’s approach of empowering engineers to take ownership of features from the planning phase all the way through to production. The “carpaccio”-sized small tasks makes it easier to deliver value quickly while maintaining high quality. I appreciate that each task is part of a larger company goal and that the work is connected to a broader vision. This structure creates a sense of purpose and collaboration, allowing engineers to see how their contributions fit into the overall success of the company.

3. **Have you worked in an environment where developers own delivering features all the way to production? We have QA (Quality Assurance) and a Product Operations team, however, they exist to provide support to engineers. Are you comfortable going to a place where the quality buck stops with the engineers and you have the ability to deploy and observe your own code in production?**

    Yes, I have past experience taking full ownership of entire applications, not just delivering code but also handling testing, deployment and monitoring in production. In these roles, I was responsible for the complete lifecycle: writing and reviewing code, implementing automated and manual tests, deploying updates and actively monitoring application health and performance. This end-to-end responsibility enabled me to quickly identify and resolve issues, ensure reliability and continuously improve both the product and my own skills. I collaborated closely with QA, Product and Operations teams to support a smooth delivery process and maintain high standards in production.

4. **What is the next technology or subject you are hoping to learn about?**

    I want to learn more about AI software development, especially how to add AI features to applications and make them better for users. I’m also interested in using AI tools to help me work faster, like smart code assistants, automated testing and improving workflows. I’d like to explore practical uses of LLMs in real-world products next.