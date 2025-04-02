import { DogProfile } from "../schema";
import dogImage from "../../photos/dog2.png";

/**
 * Creates demo dog profiles for testing and demonstration purposes
 */
export async function createDemoDogProfiles(account: any) {
  if (!account.root.myDogs || account.root.myDogs.length === 0) {
    console.log("Creating demo dog profiles...");
    
    // Convert the image file to a data URL
    const dataUrl = await convertImageToDataURL(dogImage);
    
    // Create some sample dogs
    const dog1 = DogProfile.create({
      name: "Max",
      breed: "Golden Retriever",
      age: 3,
      gender: "male",
      interests: "Frisbee, swimming, belly rubs",
      image: dataUrl
    });
    await account.root.myDogs.push(dog1);
    
    const dog2 = DogProfile.create({
      name: "Luna",
      breed: "Border Collie",
      age: 2,
      gender: "female",
      interests: "Agility, hiking, chasing balls",
      image: ""
    });
    await account.root.myDogs.push(dog2);
    
    const dog3 = DogProfile.create({
      name: "Cooper",
      breed: "French Bulldog",
      age: 4,
      gender: "male",
      interests: "Napping, short walks, treats",
      image: ""
    });
    await account.root.myDogs.push(dog3);
    
    console.log("Demo dog profiles created successfully!");
  }
}

/**
 * Helper function to convert an image to a data URL
 */
async function convertImageToDataURL(imagePath: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    img.src = imagePath;
  });
}
