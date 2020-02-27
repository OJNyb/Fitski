function formatMuscleGroups(exercises) {
  let muscleGroup = exercises.map(x => {
    if (x.exercise) {
      return x.exercise.muscleGroup;
    } else {
      return "Error";
    }
  });

  return muscleGroup
    .reduce((accu, curr) => {
      if (accu.map(x => x._id).indexOf(curr._id) === -1) {
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
