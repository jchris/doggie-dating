# Doggie Dating App Scaffold Implementation Plan

## Overview

This plan focuses only on setting up the basic scaffold for the Doggie Dating app without implementing the full features yet. The goal is to establish a working structure with proper routing and placeholder components.

## Step 1: Update Schema

Update `schema.ts` with minimal dog profile structure:

```typescript
import { Account, CoList, CoMap, Group, Profile, co } from "jazz-tools";

// Proper CoList classes
export class ListOfDogs extends CoList.Of(co.ref(DogProfile)) {}
export class ListOfComments extends CoList.Of(co.ref(Comment)) {}

// Dog profile schema
export class DogProfile extends CoMap {
  name = co.string;
  breed = co.string;
  age = co.number;
  gender = co.literal("male", "female", "unknown");
  comments = co.ref(ListOfComments);
  isAtPark = co.boolean;
}

// Comment schema for dog profiles
export class Comment extends CoMap {
  text = co.string;
  timestamp = co.Date;
}

// Container for dogs following Jazz patterns
export class DogContainer extends CoMap {
  dogs = co.ref(ListOfDogs);
}

// Account root following Jazz rules
export class AccountRoot extends CoMap {
  container = co.ref(DogContainer);
  version = co.optional.number;
}

// User profile with validation
export class UserProfile extends Profile {
  name = co.string;

  static validate(data: { name?: string; email?: string }) {
    const errors: string[] = [];
    if (!data.name?.trim()) {
      errors.push("Please enter a name.");
    }
    if (!data.email?.trim()) {
      errors.push("Please enter an email.");
    }
    return { errors };
  }
}

// Account with proper migration
export class JazzAccount extends Account {
  profile = co.ref(UserProfile);
  root = co.ref(AccountRoot);

  async migrate(creationProps?: { name: string }) {
    if (this.root === undefined) {
      // Create container with proper group ownership
      const containerGroup = Group.create();
      const defaultContainer = DogContainer.create({
        dogs: ListOfDogs.create([], containerGroup)
      }, containerGroup);

      // Initialize root owned by account
      this.root = AccountRoot.create(
        { container: defaultContainer, version: 0 },
        { owner: this }
      );
    }

    if (this.profile === undefined && creationProps?.name) {
      // Create public profile
      const publicGroup = Group.create();
      publicGroup.addMember("everyone", "reader");
      
      this.profile = UserProfile.create(
        { name: creationProps.name },
        publicGroup
      );
    }
  }
}

// Register account schema
declare module "jazz-react" {
  interface Register {
    Account: JazzAccount;
  }
}
```

## Step 2: Set Up Routing

1. Install React Router:
```bash
pnpm add react-router-dom
```

2. Create a basic router structure in `main.tsx`:
```typescript
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <JazzProvider
        sync={{
          peer: `wss://cloud.jazz.tools/?key=${apiKey}`,
        }}
        AccountSchema={JazzAccount}
      >
        <App />
      </JazzProvider>
    </BrowserRouter>
  </StrictMode>,
);
```

3. Set up routes in `App.tsx`:
```typescript
import { Routes, Route } from 'react-router-dom';
import SplashPage from './pages/SplashPage';
import HomePage from './pages/HomePage';
import DogProfilePage from './pages/DogProfilePage';
import CreateEditDogPage from './pages/CreateEditDogPage';
import ConnectionsPage from './pages/ConnectionsPage';

function App() {
  // ...
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/dog/:dogId" element={<DogProfilePage />} />
        <Route path="/dog/new" element={<CreateEditDogPage />} />
        <Route path="/dog/:dogId/edit" element={<CreateEditDogPage />} />
        <Route path="/dog/:dogId/connections" element={<ConnectionsPage />} />
      </Routes>
    </>
  );
}
```

## Step 3: Create Placeholder Components

Create basic placeholder components for each page:

1. Create a folder structure:
```
src/
├── components/
│   ├── Header.tsx
│   ├── DogCard.tsx
│   └── AuthButton.tsx (existing)
└── pages/
    ├── SplashPage.tsx
    ├── HomePage.tsx
    ├── DogProfilePage.tsx
    ├── CreateEditDogPage.tsx
    └── ConnectionsPage.tsx
```

2. Create each page component with minimal placeholder content

## Step 4: Implement Header Component

Create a header component with navigation and authentication:

```typescript
// src/components/Header.tsx
import { Link } from 'react-router-dom';
import { AuthButton } from '../AuthButton';

export function Header() {
  return (
    <header className="container mx-auto py-4 flex justify-between items-center">
      <div className="flex items-center">
        <Link to="/" className="text-2xl font-bold">Doggie Dating</Link>
      </div>
      <nav className="flex items-center gap-4">
        <Link to="/home">My Dogs</Link>
        <AuthButton />
      </nav>
    </header>
  );
}
```

## Step 5: Basic Home Page

Implement a minimal home page that displays a list of the user's dogs:

```typescript
// src/pages/HomePage.tsx
import { Link } from 'react-router-dom';
import { useAccount } from 'jazz-react';

export default function HomePage() {
  const { me } = useAccount({ 
    resolve: { root: { myDogs: { $each: true } } }
  });
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">My Dogs</h1>
      
      {me?.root.myDogs && me.root.myDogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {me.root.myDogs.map((dog) => (
            <div key={dog.id} className="border rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold">{dog.name}</h2>
              <p>{dog.breed}, {dog.age} years old</p>
              <Link 
                to={`/dog/${dog.id}`}
                className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded"
              >
                View Profile
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="mb-4">You don't have any dogs yet.</p>
          <Link 
            to="/dog/new"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Your First Dog
          </Link>
        </div>
      )}
    </div>
  );
}
```

## Step 6: Add Test Data on Account Creation

Update the account migration to add a sample dog when a new account is created:

```typescript
// In schema.ts, update the migrate method
migrate(this: JazzAccount) {
  if (this.root === undefined) {
    const group = Group.create();

    this.root = AccountRoot.create(
      {
        dateOfBirth: new Date("1/1/1990"),
        myDogs: [],
      },
      group,
    );
    
    // Add a sample dog for testing
    const sampleDog = DogProfile.create({
      name: "Buddy",
      breed: "Golden Retriever",
      age: 3,
      gender: "male",
      interests: ["ball", "swimming", "fetch"],
    });
    
    this.root.myDogs.push(sampleDog);
  }
}
```

## Testing the Scaffold

1. Start the development server:
```bash
pnpm dev
```

2. Verify routing is working by navigating to:
   - Splash page: `/`
   - Home page: `/home`
   - Dog profile page: `/dog/:dogId` (using sample dog ID)
   
3. Confirm authentication is working by logging in/out

4. Verify the placeholder layouts render correctly on different screen sizes
