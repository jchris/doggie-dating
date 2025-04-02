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
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          Add New Dog
        </Link>
      </div>
      
      {me?.root.myDogs && me.root.myDogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {me.root.myDogs.map((dog) => (
            <div key={dog.id} className="border rounded-lg p-6 shadow-sm hover:shadow-md transition">
              <h2 className="text-xl font-semibold">{dog.name}</h2>
              <p className="text-gray-600">{dog.breed}, {dog.age} years old</p>
              <p className="mt-2 text-sm text-gray-500">
                <span className="font-medium">Interests:</span> {dog.interests}
              </p>
              <div className="mt-4 flex justify-end">
                <Link 
                  to={`/dog/${dog.id}`}
                  className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 transition"
                >
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="mb-4 text-gray-600">You don't have any dogs yet.</p>
          <Link 
            to="/dog/new"
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          >
            Add Your First Dog
          </Link>
        </div>
      )}
    </div>
  );
}
