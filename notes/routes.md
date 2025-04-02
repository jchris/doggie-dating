# Doggie Dating App Implementation Plan

## Overview

Doggie Dating is a social app for dog owners to connect when their dogs meet at the park. It allows owners to create profiles for their dogs, share them via QR codes or URLs, and build a network of dog connections.

## Key Features

1. **Dog Cards**
   - Each dog has a profile card with name, photo, breed, age, gender, and interests
   - Cards are shareable via QR code and URL
   - Dog owners can save connections to other dogs
   - Comments can be added to dog cards
   - QR code displayed at the bottom of each dog card

2. **User Account Features**
   - Authentication system for dog owners
   - Ability to create and manage multiple dog profiles
   - Save connections to other dogs
   - Designate certain dogs as "superfriends" who get park notifications

3. **Notifications**
   - Notify "superfriends" when a dog is at the park

## Tech Stack

- React with TypeScript
- Jazz Tools for data management and syncing
- TailwindCSS for styling

## Data Schema

```typescript
// Dog profile schema
export class DogProfile extends CoMap {
  name = co.string;
  photo = co.optional.ref(ImageDefinition); // For dog's photo
  breed = co.string;
  age = co.number;
  gender = co.literal("male", "female", "unknown");
  interests = co.list(co.string); // e.g. ["tag", "ball", "chase"]
  connections = co.list(co.ref(DogProfile)); // Other dogs this dog has connected with
  superfriends = co.list(co.ref(DogProfile)); // Special connections that get park notifications
  comments = co.list(co.ref(Comment));
  isAtPark = co.boolean; // Flag to indicate if dog is currently at the park
}

// Comment schema for dog profiles
export class Comment extends CoMap {
  author = co.ref(JazzAccount); // Who wrote the comment
  text = co.string;
  timestamp = co.Date;
}

// Extend the account root to include dogs
export class AccountRoot extends CoMap {
  dateOfBirth = co.Date;
  
  // User's dogs
  myDogs = co.list(co.ref(DogProfile));
  
  // Saved connections (dogs the user has connected with)
  savedConnections = co.list(co.ref(DogProfile));

  // Current user's active status
  atParkWithDog = co.optional.ref(DogProfile); // If at park, which dog they have
}
```

## Routes and Component Structure

0. **Static Splash**
   - Simple static page with a logo and a message

1. **Home Page** (`/`)
   - Welcome message for new users
   - List of user's dogs
   - Quick access to add a new dog
   - Activity feed of recent connections

2. **Dog Profile Page** (`/dog/:dogId`)
   - Display dog card with all information
   - Edit functionality for dog owner
   - Comments section
   - List of friends on this page
   - QR code generator at the bottom of the page
   - Connect/superfriend buttons

3. **Create/Edit Dog** (`/dog/new` and `/dog/:dogId/edit`)
   - Form to create or edit dog details
   - Photo upload capability

4. **Connections Page** (`/dog/:dogId/connections`)
   - List of all dog connections
   - Filter and sort options
   - Ability to designate superfriends
   - Private to owner

## Implementation Steps

1. **Setup & Configuration**
   - Update schema.ts with our data models
   - Configure React Router for navigation
   - Set up authentication flows

2. **Core Features Implementation**
   - Dog profile creation/editing
   - Photo upload and storage functionality
   - QR code generation for sharing
   - Comment system

3. **Connections & Sharing Logic**
   - Implement connection saving functionality
   - Build the superfriends designation
   - Create notification system for park alerts

4. **UI Implementation**
   - Design dog card component
   - Build profile view and edit pages
   - Create connections list view
   - Design and implement QR display component

5. **Testing & Refinement**
   - Test across devices
   - Verify offline functionality
   - Ensure proper data syncing
