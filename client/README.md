# Dynamic Dashboard with Authentication and API Integration

This project is a fully functional, dynamic dashboard built with Next.js (App Router), Material UI, and React. It includes user authentication, API data fetching, filtering, pagination, and a responsive layout with a light/dark theme toggle.

## Features

- **Authentication Flow**:
  - Login page with email and password validation.
  - Mock JWT token stored in `localStorage` for authentication.
  - Protected dashboard route (redirects to login if not authenticated).
  - Logout functionality.

- **Dashboard Page**:
  - Responsive layout with a header, sidebar, and main content area.
  - Displays data fetched from the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/posts) in a table.
  - Search and filter functionality (by title or ID).
  - Pagination (5 posts per page).
  - Interactive table with clickable rows to view post details in a dialog.
  - Refresh button to reload data.
  - Loading spinner while fetching data.
  - Error handling for failed API calls.

- **Styling and Interactivity**:
  - Built with Material UI for a polished and responsive UI.
  - Light/dark theme toggle with persistence in `localStorage`.
  - Animations (e.g., fade-in for the table, zoom on search bar focus).
  - Interactive login page with real-time validation, show password toggle, and loading state.
  - Enhanced search bar with clear button and search icon.
  - Hover effects on table rows and buttons.

- **Tech Stack**:
  - **Framework**: Next.js (App Router)
  - **Styling**: Material UI
  - **Authentication**: Mock JWT Token
  - **API**: JSONPlaceholder
  - **Fonts**: Geist and Geist Mono (via `next/font/google`)
  - **Icons**: React Icons and Material UI Icons

## Prerequisites

- **Node.js**: Version 14.x or later (includes npm). Download from [nodejs.org](https://nodejs.org/).
- **Git**: For version control (optional but recommended). Install from [git-scm.com](https://git-scm.com/).

## Setup Instructions

1. **Clone the Repository** (if applicable):
   ```bash
   git clone <repository-url>
   cd client