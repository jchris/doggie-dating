import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAccount, useCoState } from 'jazz-react';
import { DogProfile } from '../schema';

export default function CreateEditDogPage() {
  const { dogId } = useParams<{ dogId: string }>();
  const navigate = useNavigate();
  const isEditMode = !!dogId;
  
  const existingDog = useCoState(DogProfile, dogId);
  const { me } = useAccount({ resolve: { root: { myDogs: true } } });
  
  const [name, setName] = useState(existingDog?.name || '');
  const [breed, setBreed] = useState(existingDog?.breed || '');
  const [age, setAge] = useState(existingDog?.age?.toString() || '');
  const [gender, setGender] = useState(existingDog?.gender || 'unknown');
  const [interests, setInterests] = useState(existingDog?.interests || '');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!me?.root.myDogs) {
      return;
    }
    
    if (isEditMode && existingDog) {
      // Update existing dog
      existingDog.name = name;
      existingDog.breed = breed;
      existingDog.age = Number(age);
      existingDog.gender = gender as "male" | "female" | "unknown";
      existingDog.interests = interests;
      
      navigate(`/dog/${dogId}`);
    } else {
      // Create new dog
      const newDog = DogProfile.create({
        name,
        breed,
        age: Number(age),
        gender: gender as "male" | "female" | "unknown",
        interests,
      });
      
      me.root.myDogs.push(newDog);
      navigate(`/dog/${newDog.id}`);
    }
  };
  
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          {isEditMode ? `Edit ${existingDog?.name}'s Profile` : 'Add a New Dog'}
        </h1>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          <div className="grid gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#57B4BA]"
              />
            </div>
            
            <div>
              <label htmlFor="breed" className="block text-sm font-medium text-gray-700 mb-1">
                Breed
              </label>
              <input
                id="breed"
                type="text"
                required
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#57B4BA]"
              />
            </div>
            
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <input
                id="age"
                type="number"
                min="0"
                required
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#57B4BA]"
              />
            </div>
            
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#57B4BA]"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="unknown">Unknown</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="interests" className="block text-sm font-medium text-gray-700 mb-1">
                Interests (comma separated)
              </label>
              <input
                id="interests"
                type="text"
                placeholder="ball, swimming, fetch"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#57B4BA]"
              />
            </div>
          </div>
          
          <div className="mt-8 flex justify-end gap-3">
            <Link
              to={isEditMode ? `/dog/${dogId}` : '/home'}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-4 py-2 bg-[#015551] text-white rounded-md hover:bg-opacity-90 transition"
            >
              {isEditMode ? 'Save Changes' : 'Create Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
