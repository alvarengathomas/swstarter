# sw-starter/api - Laravel Backend API

The Laravel backend API for the SWStarter Star Wars application. This API serves as a proxy to the Star Wars API (https://swapi.tech) with comprehensive statistics tracking, background job processing, and robust error handling.

## 🌟 Features

- **Star Wars API Proxy**: Full integration with https://swapi.tech for characters and movies
- **Statistics Tracking**: Real-time query analytics with 5-minute background recomputation
- **Response Time Monitoring**: Tracks and analyzes API response performance
- **Search Analytics**: Top queries, usage patterns, and peak hour detection
- **Background Processing**: Laravel scheduler for automated statistics computation
- **File-based Caching**: Efficient caching without external dependencies
- **Error Handling**: Comprehensive logging and graceful error responses

## 🛠 Tech Stack

- **Laravel** - Modern PHP framework with latest features
- **PHP** - Latest PHP with performance improvements and type safety
- **Guzzle HTTP** - Robust HTTP client for Star Wars API integration
- **File Caching** - Laravel's file-based cache for statistics storage
- **Laravel Scheduler** - Background task automation
- **Artisan Commands** - Custom commands for statistics computation

## 🚀 Getting Started

### Prerequisites
- PHP
- Composer
- Laravel compatible environment

### Installation

```bash
# Navigate to API directory
cd apps/api

# Install dependencies
composer install

# Copy environment file (if needed)
cp .env.example .env

# Generate application key
php artisan key:generate

# Start the development server
php artisan serve
```

### Development Server Options

```bash
# Standard Laravel server (localhost:8000)
php artisan serve

# Custom host and port
php artisan serve --host=0.0.0.0 --port=8000

# Comprehensive development mode (with queue and logs)
composer run dev
```

## 📊 API Endpoints

### Core Endpoints
```bash
GET  /api/health                    # Health check with timestamp
GET  /up                           # Laravel application status
POST /api/search                   # Search for people or films
GET  /api/person/{id}              # Get character details with films
GET  /api/film/{id}                # Get movie details with characters
GET  /api/statistics               # Get usage statistics
```

### Search Endpoint
```bash
POST /api/search
Content-Type: application/json

{
  "query": "luke",
  "type": "people"  // or "films"
}
```

### Response Examples

#### Health Check
```json
{
  "status": "ok",
  "timestamp": "2025-08-19T23:44:04.940236Z"
}
```

#### Statistics Response
```json
{
  "success": true,
  "statistics": {
    "total_searches": 7,
    "top_queries": [
      {
        "query": "luke",
        "count": 3,
        "percentage": 42.9
      }
    ],
    "average_response_time_ms": 842.12,
    "peak_hour": 23,
    "last_updated": "2025-08-19 23:30:59"
  }
}
```

## 🏗 Project Structure

```
app/
├── Console/Commands/
│   └── ComputeStatistics.php      # Statistics computation command
├── Http/Controllers/
│   ├── Controller.php             # Base controller
│   └── StarWarsController.php     # Main API controller
├── Providers/
│   └── AppServiceProvider.php     # Service provider configuration
routes/
├── api.php                        # API route definitions
├── web.php                        # Web routes (Laravel health check)
composer.json                      # Dependencies and scripts
.env                              # Environment configuration
```

## 🎯 Key Features

### StarWarsController
The main controller handling all Star Wars API operations:

- **Search Functionality**: Proxies search requests to SWAPI
- **Character Details**: Fetches person data with associated films
- **Movie Details**: Retrieves film data with character listings
- **Statistics Endpoint**: Returns computed usage analytics
- **Response Time Tracking**: Monitors API performance
- **Error Handling**: Comprehensive logging and error responses

### Statistics System
Sophisticated analytics tracking:

```php
// Tracked metrics
- Total search queries
- Top 5 queries with percentages
- Average response times
- Peak usage hours
- Search frequency by hour
- Query performance monitoring
```

### Background Processing
Automated statistics computation:

```bash
# Manual statistics computation
php artisan statistics:compute

# Scheduler runs every minute (checks for 5-minute tasks)
php artisan schedule:work
```

## 🔧 Configuration

### Environment Variables
```env
APP_NAME="SWStarter API"
APP_ENV=local
APP_KEY=base64:your-key-here
APP_DEBUG=true
APP_URL=http://localhost:8000

# Caching
CACHE_STORE=file

# Queue Configuration
QUEUE_CONNECTION=sync

# Star Wars API
SWAPI_BASE_URL=https://swapi.tech/api
```

### Composer Scripts
```bash
# Development mode with all services
composer run dev

# Run tests
composer test

# Code formatting (if available)
composer run format
```

## 📈 Statistics Features

### Data Tracked
- **Search Queries**: Query text, timestamp, IP address
- **Response Times**: API performance monitoring
- **Usage Patterns**: Hourly search distribution
- **Top Searches**: Most popular queries with percentages

### Computation Schedule
- **Frequency**: Every 5 minutes via Laravel scheduler
- **Storage**: File-based cache for persistence
- **Retention**: 7-day data retention period
- **Performance**: Optimized queries with limited dataset size

### Analytics Available
```php
// Statistics endpoint returns:
{
  "total_searches": int,
  "top_queries": [
    {
      "query": string,
      "count": int,
      "percentage": float
    }
  ],
  "average_response_time_ms": float,
  "peak_hour": int,
  "last_updated": string
}
```

## 🧪 Testing

```bash
# Run PHP unit tests
composer test

# Test specific endpoint
curl -X POST http://localhost:8000/api/search \
  -H "Content-Type: application/json" \
  -d '{"query":"luke","type":"people"}'

# Check statistics
curl http://localhost:8000/api/statistics
```

## 🔍 Debugging

### Logging
Laravel logs are available for debugging:
```bash
# View recent logs
tail -f storage/logs/laravel.log

# Search query tracking
grep "Search query tracked" storage/logs/laravel.log

# Statistics computation
grep "Statistics computed" storage/logs/laravel.log
```

### Artisan Commands
```bash
# Clear cache
php artisan cache:clear

# Clear configuration cache
php artisan config:clear

# View routes
php artisan route:list

# Run scheduler manually
php artisan schedule:run
```

## 🐳 Docker Integration

The API is fully containerized:

```dockerfile
# Dockerfile uses PHP-cli
# Includes Composer and all dependencies
# Optimized for production deployment
```

Container configuration:
```bash
# Build image
docker build -t sw-starter-api .

# Run container
docker run -p 8000:8000 sw-starter-api
```

## 🚀 Deployment

### Production Checklist
- [ ] Set `APP_ENV=production`
- [ ] Set `APP_DEBUG=false`
- [ ] Configure proper `APP_URL`
- [ ] Set up proper logging
- [ ] Configure queue workers
- [ ] Set up scheduler cron job

### Performance Optimizations
- File-based caching for fast statistics access
- Guzzle HTTP pooling for concurrent API requests
- Response time tracking with memory-efficient storage
- Optimized autoloading with Composer

## 📚 API Documentation

### Error Responses
All endpoints return consistent error formats:
```json
{
  "success": false,
  "message": "Error description"
}
```

### CORS Support
CORS is configured for frontend integration with proper headers for cross-origin requests.
