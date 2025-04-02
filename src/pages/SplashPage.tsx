import { Link } from 'react-router-dom';
import { Logo } from '../Logo';
import { useIsAuthenticated } from 'jazz-react';

export default function SplashPage() {
  const isAuthenticated = useIsAuthenticated();

  return (
    <div className="container mx-auto py-20 text-center">
      <div className="max-w-3xl mx-auto">
        <Logo />
        <h1 className="text-4xl font-bold mt-10 mb-6 text-indigo-600">Welcome to Doggie Dating</h1>
        <p className="text-xl mb-10">
          Connect with other dog owners at the park when your dogs vibe together.
          Create a profile for your dog, share it, and make new friends!
        </p>
        
        <div className="flex justify-center gap-4">
          {isAuthenticated ? (
            <Link 
              to="/home" 
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition"
            >
              View My Dogs
            </Link>
          ) : (
            <p className="px-8 py-3 bg-gray-100 text-gray-800 rounded-lg">
              Sign in to get started
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
