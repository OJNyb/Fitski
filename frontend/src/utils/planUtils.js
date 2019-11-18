import { Types } from "mongoose";
const { ObjectId } = Types;

function createDays() {
  let days = [];

  for (let i = 0; i < 7; i++) {
    const _id = new ObjectId().toHexString();
    days.push({ _id });
  }
  return { days };
}

function createWeekIds(copyWeek) {
  const days = createWeekdayIds(copyWeek);
  const weekId = new ObjectId().toHexString();

  return { weekId, days };
}

function createWeekdayIds(copyWeek) {
  const { days } = copyWeek;
  const newIds = [];
  for (let i = 0; i < days.length; i++) {
    const day = days[i];
    const { exercises: copyExercises } = day;
    const exercises = [];
    console.log(copyExercises);
    for (let i = 0; i < copyExercises.length; i++) {
      const exercise = copyExercises[i];
      const { sets } = exercise;
      const setIds = [];
      for (let i = 0; i < sets.length; i++) {
        setIds.push(new ObjectId().toHexString());
      }
      const exerId = new ObjectId().toHexString();
      exercises.push({ exerId, setIds });
    }
    const dayId = new ObjectId().toHexString();
    newIds.push({ dayId, exercises });
  }

  return newIds;
}

function createWeek() {
  const _id = new ObjectId().toHexString();
  const { days } = createDays();
  return { _id, days };
}

export { createWeek, createWeekIds, createWeekdayIds };
