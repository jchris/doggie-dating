import { Link, useParams } from 'react-router-dom';
import { useAccount, useCoState } from 'jazz-react';
import { DogProfile } from '../schema';

export default function ConnectionsPage() {
  const { dogId } = useParams<{ dogId: string }>();
  // Cast the string ID to the proper Jazz ID type
  const dog = useCoState(DogProfile, dogId as any);
  const { me } = useAccount({ resolve: { root: { myDogs: { $each: true } } } });
  
  // Check if current user is the owner of this dog
  const isOwner = me?.root.myDogs?.some(myDog => myDog.id === dogId);
  
  if (!isOwner) {
    return (
      <div className="container mx-auto py-8 text-center">
        <p className="text-red-600">You don't have permission to manage this dog's connections</p>
        <Link to="/home" className="inline-block mt-4 text-[#57B4BA] hover:underline">
          Go back to My Dogs
        </Link>
      </div>
    );
  }
  
  if (!dog) {
    return (
      <div className="container mx-auto py-8 text-center">
        <p>Loading dog profile...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">{dog.name}'s Connections</h1>
        <p className="text-gray-600 mb-8">Manage your dog's friends and superfriends</p>
        
        <div className="bg-[#FDFBEE] rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Superfriends</h2>
          <p className="text-gray-600 mb-4">
            Superfriends get notified when {dog.name} is at the park
          </p>
          
          <div className="bg-white p-8 text-center rounded-lg border">
            <p className="text-gray-500">No superfriends added yet</p>
            <p className="mt-2 text-sm text-gray-400">
              As you connect with other dogs, you can designate them as superfriends
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">All Connections</h2>
          
          <div className="text-center py-10">
            <p className="text-gray-500">No connections yet</p>
            <p className="mt-2 text-sm text-gray-400">
              Share {dog.name}'s profile with other dog owners to make connections
            </p>
            <Link 
              to={`/dog/${dogId}`}
              className="mt-4 inline-block px-4 py-2 bg-[#57B4BA] text-white rounded-md hover:bg-opacity-90 transition"
            >
              View QR Code
            </Link>
          </div>
        </div>
        
        <div className="mt-6">
          <Link to={`/dog/${dogId}`} className="text-[#57B4BA] hover:underline">
            &larr; Back to {dog.name}'s Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
