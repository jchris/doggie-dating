import { Link } from 'react-router-dom';
import { Logo } from '../Logo';
import { useIsAuthenticated } from 'jazz-react';
import { BounceCards } from '../components/ui/bounce-cards';

// Import dog images
import dog1 from '../../photos/dog1.webp';
import dog2 from '../../photos/dog2.png';
import dog3 from '../../photos/dog3.webp';
import dog4 from '../../photos/dog4.webp';
import dog5 from '../../photos/dog5.webp';

const dogImages = [dog1, dog2, dog3, dog4, dog5];

const transformStyles = [
  "rotate(5deg) translate(-150px)",
  "rotate(0deg) translate(-70px)",
  "rotate(-5deg)",
  "rotate(5deg) translate(70px)",
  "rotate(-5deg) translate(150px)"
];

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

        <BounceCards
          images={dogImages}
          containerWidth={500}
          containerHeight={500}
          animationDelay={1}
          animationStagger={0.08}
          easeType="elastic.out(1, 0.5)"
          transformStyles={transformStyles}
          className="mx-auto mb-10"
        />
        
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
