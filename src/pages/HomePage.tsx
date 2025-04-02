import { Link } from 'react-router-dom';
import { useAccount } from 'jazz-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const { me } = useAccount({ 
    resolve: { root: { myDogs: { $each: true } } }
  });
  
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Dogs</h1>
        <Button variant="darkTeal" asChild>
          <Link to="/dog/new">
            Add New Dog
          </Link>
        </Button>
      </div>
      
      {me?.root.myDogs && me.root.myDogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {me.root.myDogs.map((dog) => (
            <Card key={dog.id} className="overflow-hidden hover:shadow-md transition">
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
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold">{dog.name}</h2>
                <p className="text-gray-600">{dog.breed}{dog.age ? `, ${dog.age} years old` : ''}</p>
                <p className="mt-2 text-sm text-gray-500">
                  <span className="font-medium">Interests:</span> {dog.interests}
                </p>
                <CardFooter className="mt-4 p-0 flex justify-end">
                  <Button variant="teal" asChild>
                    <Link to={`/dog/${dog.id}`}>
                      View Profile
                    </Link>
                  </Button>
                </CardFooter>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <CardContent>
            <p className="mb-4 text-gray-600">You don't have any dogs yet.</p>
            <Button variant="darkTeal" asChild>
              <Link to="/dog/new">
                Add Your First Dog
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
