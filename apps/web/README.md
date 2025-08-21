# @sw-starter/web - Frontend Application

The React frontend for the SWStarter Star Wars API application. This is a modern, responsive single-page application that provides an intuitive interface for searching Star Wars characters and movies, built to precisely match the provided Zeplin design mockups.

## 🌟 Features

- **Search Interface**: Radio button selection between People and Movies with live search
- **Results Display**: Clean listing of search results with green "SEE DETAILS" buttons
- **Character Pages**: Detailed character information with linked movie appearances
- **Movie Pages**: Film details with character lists and clickable character links
- **Statistics Page**: Real-time API usage analytics and query statistics
- **Responsive Design**: Pixel-perfect implementation matching Zeplin mockups
- **Type Safety**: Full TypeScript coverage for reliable development

## 🛠 Tech Stack

- **React** - Latest React with modern features and performance improvements
- **TypeScript** - Full type safety and enhanced developer experience
- **Vite** - Lightning-fast development server and optimized builds
- **React Router DOM** - Client-side routing for seamless navigation
- **Tailwind CSS** - Utility-first CSS framework for responsive styling
- **Tanstack Query** - Powerful data fetching and state management
- **ESLint** - Code quality and consistency enforcement

## 🚀 Getting Started

### Prerequisites
- Node.js
- npm

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Access the application
# http://localhost:3000
```

### Build

```bash
# Create production build
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx      # Green action buttons
│   ├── FilmDetails.tsx # Movie information display
│   ├── PersonDetails.tsx # Character information display
│   ├── SearchForm.tsx  # Search interface with radio buttons
│   └── SearchResults.tsx # Results listing component
├── pages/              # Route-specific page components
│   ├── FilmPage.tsx    # Individual movie details page
│   ├── PersonPage.tsx  # Individual character details page
│   ├── SearchPage.tsx  # Main search interface page
│   └── StatisticsPage.tsx # API usage statistics page
├── types.ts            # TypeScript type definitions
├── main.tsx           # Application entry point
├── App.tsx            # Root component with routing
└── index.css          # Global styles and Tailwind imports
```

## 🎨 Design Implementation

The application precisely matches all 6 Zeplin mockups:

### 1. Search Form (No Input)
- Clean white cards on gray background (#ededed)
- Green SWStarter header with Query Statistics link
- Radio buttons for People/Movies selection
- Placeholder text: "e.g. Chewbacca, Yoda, Boba Fett"
- Disabled gray search button

### 2. Search Form (Input Entered)
- Same layout with user input in search field
- Green enabled search button

### 3. Loading State
- Search in progress indication
- Maintained form state during API calls

### 4. Results Display
- Left panel: Search form
- Right panel: Results listing
- Green "SEE DETAILS" buttons for each result
- Clean typography and spacing

### 5. Character Details
- Two-column layout: Details | Movies
- Character information display
- Clickable movie links in blue
- Green "BACK TO SEARCH" button

### 6. Movie Details
- Two-column layout: Details | Characters
- Movie information display
- Clickable character links in blue
- Green "BACK TO SEARCH" button

## 🔌 API Integration

The frontend communicates with the Laravel backend API:

```typescript
// API endpoints used
POST /api/search          // Search for characters or movies
GET /api/person/{id}      // Get character details
GET /api/film/{id}        // Get movie details
GET /api/statistics       // Get usage statistics
```

## 🎯 Key Components

### SearchForm
- Radio button selection (People/Movies)
- Input field with validation
- Search button state management
- Form submission handling

### SearchResults
- Results listing with proper formatting
- Green action buttons
- Navigation to detail pages
- Empty state handling

### PersonDetails / FilmDetails
- Structured information display
- Related content linking
- Navigation controls
- Responsive layout

## 🧪 Development

### Available Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Create optimized production build
- `npm run lint` - Run ESLint for code quality
- `npm run preview` - Preview production build locally

### Environment Variables
```env
VITE_API_URL=http://localhost:8000  # Backend API URL
```

### Type Safety
All components and API interactions are fully typed with TypeScript for:
- API response shapes
- Component props
- Route parameters
- Form data structures

## 🔧 Build Configuration

- **Vite**: Modern build tool with ES modules and fast HMR
- **TypeScript**: Strict mode enabled for maximum type safety
- **ESLint**: React-specific rules and best practices
- **Tailwind CSS**: JIT compilation for optimal bundle size

## 🌐 Routing

```typescript
// Route structure
/                    # SearchPage - Main search interface
/person/:id         # PersonPage - Character details
/film/:id          # FilmPage - Movie details
/statistics        # StatisticsPage - API usage stats
```

## 📱 Responsive Design

- **Desktop-first** approach matching Zeplin designs
- **Flexbox layouts** for consistent spacing
- **Tailwind utilities** for responsive breakpoints
- **Consistent typography** throughout the application

## 🚀 Deployment

The frontend is containerized and ready for deployment:

```bash
# Build production Docker image
docker build -t sw-starter-web .

# Run container
docker run -p 3000:3000 sw-starter-web
```