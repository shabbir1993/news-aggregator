# News Aggregator

A React-based news aggregator application that fetches articles from The Guardian and New York Times APIs.

## Features

- Search for articles
- Filter by date, category, and source
- Responsive design with full-width date picker on mobile devices
- Loading spinner while fetching data

## Prerequisites

- Node.js (v16 or higher)
- Docker

## Getting Started

### Clone the repository

```bash
git clone https://github.com/yourusername/news-aggregator.git
cd news-aggregator
```

## Environment Variables
Create a .env file in the root of the project with the following content:

REACT_APP_GUARDIAN_API_KEY=your_guardian_api_key
REACT_APP_NY_TIMES_API_KEY=your_ny_times_api_key

Replace your_guardian_api_key and your_ny_times_api_key with your actual API keys.

## Install dependencies
Fromt the root of the project run following : 

```bash
npm install
```

## Running the App
```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Running via Docker

## Build Docker Image
From the root of the project folder run following : 

```bash
docker build -t news-aggregator .
```

## List Docker Images
```bash
docker images
```

## Run the Docker Container

Copy the IMAGE ID from the previous step and run the following command:
```bash
docker run -p 3000:3000 <IMAGE_ID>
```
Replace <IMAGE_ID> with the actual ID of your Docker image.

The application will be available at http://localhost:3000.

## Project Structure
 - src/: Contains all the source code
 - components/: Reusable React components
 - hooks/: Custom React hooks
 - constants/: Constants used throughout the application



