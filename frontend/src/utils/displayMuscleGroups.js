function formatMuscleGroups(exercises) {
  let muscleGroup = exercises.map(x => {
    if (x.exercise) {
      return x.exercise.muscleGroup;
    } else {
      return "Error";
    }
  });

  console.log(exercises);

  return muscleGroup
    .reduce((accu, curr) => {
      if (accu.indexOf(curr) === -1) {
        accu.push(curr);
      }
      return accu;
    }, [])
    .sort((a, b) => {
      if (a === "Biceps" || a === "Triceps") {
        return 1;
      }

      return b.length - a.length;
    });
}

export { formatMuscleGroups };
