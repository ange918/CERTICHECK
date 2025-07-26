# Programme FUTUR Certificate Authentication System

## Overview

This is a full-stack web application for authenticating certificates from the "Programme FUTUR" educational program. The system allows users to search for students by their matricule (student ID) to verify their certificates and provides an admin interface for managing student records.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a monorepo structure with a clear separation between client and server code:

- **Frontend**: React with TypeScript using Vite as the build tool
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM (currently using in-memory storage for development)
- **UI Framework**: Tailwind CSS with shadcn/ui components
- **State Management**: TanStack React Query for server state management

## Key Components

### Frontend Architecture
- **React Router**: Uses Wouter for lightweight client-side routing
- **UI Components**: Comprehensive set of reusable components built with Radix UI primitives
- **Styling**: Tailwind CSS with custom color variables for brand consistency
- **Forms**: React Hook Form with Zod validation
- **State Management**: React Query for server state, local React state for UI state

### Backend Architecture
- **Express Server**: RESTful API with middleware for logging and error handling
- **Storage Layer**: Abstract storage interface (currently using in-memory implementation)
- **Validation**: Zod schemas shared between client and server
- **Development**: Vite integration for hot module replacement in development

### Database Schema
The system defines two main entities:
- **Students**: Contains student information including name, matricule, photo, and study programs
- **Users**: For admin authentication (future implementation)

### API Endpoints
- `GET /api/students/search/:matricule` - Search for a student by matricule
- `POST /api/students` - Add a new student (admin only)
- `GET /api/students` - Get all students (admin only)

## Data Flow

1. **Student Search**: Users enter a matricule number, which triggers an API call to search for the student
2. **Certificate Verification**: If found, the student's information and certificate status are displayed
3. **Admin Operations**: Admins can log in with a password to access student management features
4. **Data Persistence**: Currently uses in-memory storage with sample data; configured for PostgreSQL with Drizzle ORM

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL client for Neon database
- **drizzle-orm**: Type-safe ORM for database operations
- **@tanstack/react-query**: Server state management
- **@radix-ui/**: Collection of unstyled, accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **zod**: Schema validation library

### Development Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Type safety across the entire application
- **ESBuild**: Fast JavaScript bundler for production builds

## Deployment Strategy

The application is configured for deployment with:

### Build Process
- **Frontend**: Built with Vite and output to `dist/public`
- **Backend**: Bundled with ESBuild to `dist/index.js`
- **Database**: Drizzle migrations in `migrations/` directory

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string
- **NODE_ENV**: Environment setting (development/production)

### Scripts
- `npm run dev`: Development server with hot reload
- `npm run build`: Production build for both client and server
- `npm run start`: Start production server
- `npm run db:push`: Push database schema changes

The application is structured to work well on platforms like Replit, with automatic detection of the Replit environment and appropriate configuration adjustments.