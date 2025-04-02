import { Link } from 'react-router-dom';
import { useAccount } from 'jazz-react';

export default function HomePage() {
  const { me } = useAccount({ 
    resolve: { root: { myDogs: { $each: true } } }
  });
  
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Dogs</h1>
        <Link 
          to="/dog/new" 
          className="px-4 py-2 bg-[#015551] text-white rounded hover:bg-opacity-90 transition"
        >
          Add New Dog
        </Link>
      </div>
      
      {me?.root.myDogs && me.root.myDogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {me.root.myDogs.map((dog) => (
            <div key={dog.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition bg-white">
              {dog.image ? (
                <div className="h-48 overflow-hidden">
                  <img 
                    src={dog.image} 
                    alt={dog.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
              ) : (
                <div className="h-48 bg-[#FDFBEE] flex items-center justify-center">
                  <span className="text-gray-500">No photo</span>
                </div>
              )}
              <div className="p-6">
                <h2 className="text-xl font-semibold">{dog.name}</h2>
                <p className="text-gray-600">{dog.breed}{dog.age ? `, ${dog.age} years old` : ''}</p>
                <p className="mt-2 text-sm text-gray-500">
                  <span className="font-medium">Interests:</span> {dog.interests}
                </p>
                <div className="mt-4 flex justify-end">
                  <Link 
                    to={`/dog/${dog.id}`}
                    className="px-4 py-2 bg-[#57B4BA] text-white rounded hover:bg-opacity-90 transition"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="mb-4 text-gray-600">You don't have any dogs yet.</p>
          <Link 
            to="/dog/new"
            className="px-4 py-2 bg-[#015551] text-white rounded hover:bg-opacity-90 transition"
          >
            Add Your First Dog
          </Link>
        </div>
      )}
    </div>
  );
}
