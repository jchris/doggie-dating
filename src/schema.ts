/**
 * Learn about schemas here:
 * https://jazz.tools/docs/react/schemas/covalues
 */

import { Account, CoList, CoMap, Group, Profile, co } from "jazz-tools";

/** The account profile is an app-specific per-user public `CoMap`
 *  where you can store top-level objects for that user */
export class JazzProfile extends Profile {
  /**
   * Learn about CoValue field/item types here:
   * https://jazz.tools/docs/react/schemas/covalues#covalue-fielditem-types
   */
  firstName = co.string;

  // Add public fields here
}

/**
 * Dog profile for the Doggie Dating app
 */
export class DogProfile extends CoMap {
  name = co.string;
  breed = co.string;
  age = co.number;
  gender = co.literal("male", "female", "unknown");
  interests = co.array(co.string); // e.g. ["tag", "ball", "chase"]
}

// List of dog profiles
export class DogList extends CoList<DogProfile> {
  static itemType = DogProfile;
}

/** The account root is an app-specific per-user private `CoMap`
 *  where you can store top-level objects for that user */
export class AccountRoot extends CoMap {
  dateOfBirth = co.Date;
  
  // User's dogs
  myDogs = co.ref(DogList);

  // Add private fields here

  get age() {
    if (!this.dateOfBirth) return null;

    return new Date().getFullYear() - this.dateOfBirth.getFullYear();
  }
}

export class JazzAccount extends Account {
  profile = co.ref(JazzProfile);
  root = co.ref(AccountRoot);

  /** The account migration is run on account creation and on every log-in.
   *  You can use it to set up the account root and any other initial CoValues you need.
   */
  migrate(this: JazzAccount) {
    if (this.root === undefined) {
      const group = Group.create();

      this.root = AccountRoot.create(
        {
          dateOfBirth: new Date("1/1/1990"),
          myDogs: DogList.create({}),
        },
        group,
      );
      
      // Add a sample dog for testing
      const sampleDog = DogProfile.create({
        name: "Buddy",
        breed: "Golden Retriever",
        age: 3,
        gender: "male",
        interests: ["ball", "swimming", "fetch"],
      });
      
      if (this.root.myDogs) {
        this.root.myDogs.push(sampleDog);
      }
    }

    if (this.profile === undefined) {
      const group = Group.create();
      group.addMember("everyone", "reader"); // The profile info is visible to everyone

      this.profile = JazzProfile.create(
        {
          name: "Anonymous user",
          firstName: "",
        },
        group,
      );
    }
  }
}
