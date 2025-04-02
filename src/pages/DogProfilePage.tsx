import { Link, useParams } from 'react-router-dom';
import { useAccount, useCoState } from 'jazz-react';
import { DogProfile } from '../schema';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
            <Button variant="outline" asChild>
              <Link to={`/dog/${dogId}/edit`}>
                Edit Profile
              </Link>
            </Button>
          )}
        </div>
        
        <Card className="overflow-hidden">
          <CardContent className="p-6 pt-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3 flex-shrink-0">
                {dog.image ? (
                  <img 
                    src={dog.image} 
                    alt={dog.name} 
                    className="w-full aspect-square object-cover rounded-lg" 
                  />
                ) : (
                  <div className="bg-[#FDFBEE] rounded-lg aspect-square flex items-center justify-center">
                    <span className="text-muted-foreground">No Photo</span>
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
              <CardHeader className="p-0 pb-4">
                <CardTitle className="text-xl">Friends</CardTitle>
              </CardHeader>
              <Card className="bg-accent/50">
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground">No friends added yet</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-8">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="text-xl">Comments</CardTitle>
              </CardHeader>
              <Card className="bg-accent/50">
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground">No comments yet</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-8">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="text-xl">Share Profile</CardTitle>
              </CardHeader>
              <Card className="bg-accent/50">
                <CardContent className="p-8 text-center">
                  <div className="bg-white inline-block p-4 border rounded">
                    <p className="mb-2">QR Code will appear here</p>
                  </div>
                  <p className="mt-4 text-muted-foreground">Scan to view {dog.name}'s profile</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-6 flex justify-between">
          <Button variant="ghost" className="text-[#57B4BA] hover:text-[#57B4BA]/90 p-0" asChild>
            <Link to="/home">
              &larr; Back to My Dogs
            </Link>
          </Button>
          
          {isOwner && (
            <Button variant="ghost" className="text-[#57B4BA] hover:text-[#57B4BA]/90 p-0" asChild>
              <Link to={`/dog/${dogId}/connections`}>
                Manage Connections &rarr;
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
