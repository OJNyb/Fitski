const { Types } = require("mongoose");
const { ObjectId } = Types;

function createEmptyWeekArray(length) {
  let array = [];
  for (let i = 0; i < length; i++) {
    array.push({});
  }

  return array;
}

function createDummyWeeks() {
  let weeks = [];
  for (let i = 0; i < 1; i++) {
    weeks.push({
      days: createDays(),
      _id: ObjectId()
    });
  }
  return weeks;
}

function createDays() {
  let days = [];
  for (let i = 0; i < 5; i++) {
    days.push({
      _id: ObjectId(),
      exercises: createExercises()
    });
  }
  return days;
}

let names = [
  "Purchase the Plan",
  "This is Fake",
  "Access Restricted",
  "Sneaky Mate",
  "Brah",
  "This is a Mockup",
  "Classified"
];

function createExercises() {
  let exercises = [];
  for (let i = 0; i < 8; i++) {
    exercises.push({
      _id: ObjectId(),
      exercise: {
        unit: "r+w",
        _id: ObjectId(),
        name: names[Math.round(Math.random() * (names.length - 1))]
      },
      sets: createSets(),
      onModel: "exercise"
    });
  }
  return exercises;
}

function createSets() {
  return [
    {
      _id: ObjectId(),
      reps: 8
    },
    {
      _id: ObjectId(),
      reps: 8
    },
    {
      _id: ObjectId(),
      reps: 8
    }
  ];
}

module.exports = { createDummyWeeks, createEmptyWeekArray };
