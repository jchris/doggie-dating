import { Link, useParams } from 'react-router-dom';
import { useAccount, useCoState } from 'jazz-react';
import { DogProfile } from '../schema';

export default function DogProfilePage() {
  const { dogId } = useParams<{ dogId: string }>();
  const dog = useCoState(DogProfile, dogId as any);
  const { me } = useAccount({ resolve: { root: { myDogs: { $each: true } } } });
  
  // Check if current user is the owner of this dog
  const isOwner = me?.root.myDogs?.some(myDog => myDog.id === dogId);
  
  if (!dog) {
    return (
      <div className="container mx-auto py-8 text-center">
        <p>Loading dog profile...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{dog.name}'s Profile</h1>
          {isOwner && (
            <Link 
              to={`/dog/${dogId}/edit`}
              className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 transition"
            >
              Edit Profile
            </Link>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3 flex-shrink-0">
                {dog.image ? (
                  <img 
                    src={dog.image} 
                    alt={dog.name} 
                    className="w-full aspect-square object-cover rounded-lg" 
                  />
                ) : (
                  <div className="bg-gray-200 rounded-lg aspect-square flex items-center justify-center">
                    <span className="text-gray-500">No Photo</span>
                  </div>
                )}
              </div>
              
              <div className="md:w-2/3">
                <div className="grid gap-4">
                  <div>
                    <h2 className="text-gray-500 text-sm">Breed</h2>
                    <p className="font-medium">{dog.breed}</p>
                  </div>
                  
                  <div>
                    <h2 className="text-gray-500 text-sm">Age</h2>
                    <p className="font-medium">{dog.age} years old</p>
                  </div>
                  
                  <div>
                    <h2 className="text-gray-500 text-sm">Gender</h2>
                    <p className="font-medium capitalize">{dog.gender}</p>
                  </div>
                  
                  <div>
                    <h2 className="text-gray-500 text-sm">Interests</h2>
                    <p className="font-medium">{dog.interests}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Friends</h2>
              <div className="bg-gray-50 py-8 text-center rounded">
                <p className="text-gray-500">No friends added yet</p>
              </div>
            </div>
            
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Comments</h2>
              <div className="bg-gray-50 py-8 text-center rounded">
                <p className="text-gray-500">No comments yet</p>
              </div>
            </div>
            
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Share Profile</h2>
              <div className="bg-gray-50 p-8 text-center rounded">
                <div className="bg-white inline-block p-4 border rounded">
                  <p className="mb-2">QR Code will appear here</p>
                </div>
                <p className="mt-4 text-gray-500">Scan to view {dog.name}'s profile</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-between">
          <Link to="/home" className="text-indigo-600 hover:underline">
            &larr; Back to My Dogs
          </Link>
          
          {isOwner && (
            <Link 
              to={`/dog/${dogId}/connections`}
              className="text-indigo-600 hover:underline"
            >
              Manage Connections &rarr;
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
