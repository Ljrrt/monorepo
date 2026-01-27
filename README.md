# Monorepo Overview

This monorepo is a prototype for a modular, full-stack application built with TypeScript and React. It is organized into several packages and apps, each serving a specific purpose:

- **packages/common**: Shared utilities, functions, types, icons, and styles used across the project.
- **packages/ui**: Reusable UI components and effects for building interfaces.
- **packages/services**: Backend and client-side service logic, including API clients and realtime communication. 
- **backend**: Server-side code, including API routes for text, image, and multimodal generation.
- **apps/**: Frontend apps.

The system uses Supabase for realtime events and storage, and integrates AI-powered image and text generation. The frontend communicates with the backend via REST APIs and realtime channels through supabase Brodcast.

