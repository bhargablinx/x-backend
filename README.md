# X Backend

X Backend is the API for a micro-blogging platform inspired by Twitter/X. It handles authentication, post creation, social following, feeds, comments, likes, and avatar uploads.

## Overview

This service is built with:

- `Node.js`
- `Express`
- `MongoDB` with `Mongoose`
- `JWT` authentication
- `Multer` for file uploads
- `Cloudinary` for media storage
- `Cookie` and bearer-token based auth handling

## Core Features

- User registration, login, logout, and account deletion
- Avatar upload during registration
- Refresh-token endpoint for session renewal
- Create, read, and delete posts
- Like and unlike posts
- Comment on posts and fetch comments
- Follow and unfollow users
- View followers and followings
- Personalized feed from followed accounts
- General feed for browsing posts

## Project Structure

- `src/index.js` - application entry point
- `src/app.js` - Express app setup and middleware registration
- `src/db/connection.js` - MongoDB connection
- `src/controllers/` - business logic for users, posts, feeds, likes, comments, and follows
- `src/routes/` - API route definitions
- `src/models/` - Mongoose schemas
- `src/middlewares/` - authentication and upload middleware
- `src/utils/` - helper utilities

## Requirements

- Node.js 18+
- MongoDB database
- Cloudinary account for avatar/media uploads

## Environment Variables

Create a `.env` file in the project root with at least the following values:

```env
PORT=8000
MONGODB_URL=mongodb://127.0.0.1:27017
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
CORS_ORIGIN=http://localhost:3000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

The MongoDB connection uses `${MONGODB_URL}/x-db`, so the database name is derived from the base URL above.

## Installation

```bash
npm install
```

## Run Locally

```bash
npm start
```

The server will connect to MongoDB and start listening on the configured `PORT`.

## Authentication

Protected routes require authentication through one of these mechanisms:

- `accessToken` cookie
- `Authorization: Bearer <token>` header

Most write operations and user-specific reads require a valid authenticated user.

## API Reference

### User Routes

| Method   | Endpoint                        | Description                                 |
| -------- | ------------------------------- | ------------------------------------------- |
| `POST`   | `/user/register`                | Register a new user and upload an avatar    |
| `POST`   | `/user/login`                   | Login user                                  |
| `POST`   | `/user/logout`                  | Logout authenticated user                   |
| `GET`    | `/user/posts`                   | Get posts created by the authenticated user |
| `GET`    | `/user/refresh-token`           | Generate a new access token                 |
| `DELETE` | `/user/delete`                  | Delete the authenticated user               |
| `GET`    | `/user/username/:username`      | Find a user by username                     |
| `POST`   | `/user/:userId/follow`          | Follow a user                               |
| `DELETE` | `/user/:userId/follow`          | Unfollow a user                             |
| `DELETE` | `/user/followers/:targetUserId` | Remove a follower                           |
| `GET`    | `/user/:userId/followers`       | List followers for a user                   |
| `GET`    | `/user/:userId/followings`      | List followings for a user                  |

### Post Routes

| Method   | Endpoint                 | Description             |
| -------- | ------------------------ | ----------------------- |
| `POST`   | `/post`                  | Create a post           |
| `GET`    | `/post`                  | Get all posts           |
| `GET`    | `/post/:postId`          | Get a single post       |
| `DELETE` | `/post/:postId`          | Delete a post           |
| `POST`   | `/post/:postId/comments` | Add a comment to a post |
| `GET`    | `/post/:postId/comments` | Get comments for a post |
| `POST`   | `/post/:postId/like`     | Like a post             |
| `DELETE` | `/post/:postId/like`     | Unlike a post           |

### Feed Routes

| Method | Endpoint           | Description              |
| ------ | ------------------ | ------------------------ |
| `GET`  | `/feed`            | General feed             |
| `GET`  | `/feed/followings` | Feed from followed users |

## Current Status

Implemented:

- Authentication and user management
- Post creation and retrieval
- Likes and comments
- Follow relationships and feed generation

Pending:

- Follower management UX refinement
- Automated test coverage
- More complete API documentation with request and response examples

## Notes

- Posts currently cannot be edited.
- The app uses MongoDB documents for users, posts, comments, likes, and follows.
- The current `npm start` script runs `nodemon`, which is convenient for development but not ideal for production deployments.
