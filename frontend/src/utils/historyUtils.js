import { Types } from "mongoose";
const { ObjectId } = Types;

export function getNewExerciseIds(exercises) {
  const newIds = [];
  for (let i = 0; i < exercises.length; i++) {
    const exerId = new ObjectId().toHexString();
    const setIds = [];
    const { sets } = exercises[i];
    for (let i = 0; i < sets.length; i++) {
      setIds.push(new ObjectId().toHexString());
    }
    newIds.push({ exerId, setIds });
  }

  return newIds;
}
