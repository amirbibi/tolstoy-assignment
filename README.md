# URL Metadata Fetcher

## Overview

URL Metadata Fetcher is a full-stack web application that allows users to input multiple URLs and fetch metadata (title, description, and image) for each URL. The application consists of a React-based front-end and requires a Node.js back-end (not included in this repository).

## Features

- Input multiple URLs (minimum 3)
- Fetch metadata for each URL
- Display fetched metadata in a visually appealing way
- Error handling for invalid URLs or failed metadata retrieval

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

## Setup

### Frontend

1. Clone the repository:

   ```
   git clone https://github.com/amirbibi/tolstoy
   cd tolstoy
   ```

2. Install dependencies:
   ```
   npm install
   ```

### Backend

1. Navigate to the backend directory:

   ```
   cd backend
   ```

2. Install backend dependencies:

   ```
   npm install
   ```

## Running the Application

### Start the Backend Server

1. From the backend directory, run:
   ```
   npm start
   ```
   The server should start on http://localhost:5000.

### Start the Frontend Development Server

2. From the frontend directory, run:

   ```
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Testing

### Frontend Tests

Run the frontend test suite:

```
npm test
```

### Backend Tests

From the backend directory, run:

```
npm test
```

## Design Choices and Trade-offs

While the project is currently small, it's structured for easy scalability:

1. **Component Structure**:

   - Organized into two main categories:
     a) Reusable components (`src/components/`):

     - Generic components (`Card`, `ErrorMessage`)
     - Further categorized into `common/` and `ui/` for better organization
     - Promotes code reuse and consistency across the application
       b) Page-specific components (`src/pages/`):
     - Each page (`Main`) has its own directory
     - Contains the main page component, component css, and all its children
     - Keeps related components together, improving organization and maintainability

   - Benefits:
     - Clear separation of concerns
     - Easier navigation and maintenance
     - Simplifies addition of new pages or features
     - Scalable structure that can accommodate project growth

2. **State Management**: Uses React's `useState` hook, suitable for the current scale and avoiding unnecessary complexity.

3. **Styling**: Employs CSS modules for component-specific styles and a global CSS file for app-wide styles, promoting maintainability.

4. **Responsiveness**: Utilizes flexbox and CSS Grid for basic responsiveness, with potential for further optimization.

5. **Testing**: Includes basic unit tests for frontend and backend, laying groundwork for more comprehensive testing.

6. **Backend Architecture**: Follows a simple MVC structure, separating concerns for easier future expansion.
