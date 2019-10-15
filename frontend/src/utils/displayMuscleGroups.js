function displayMuscleGroups(exercises) {
  let muscleGroup = exercises.map(x => {
    if (x.exercise) {
      return x.exercise.muscleGroup;
    } else {
      return "Error";
    }
  });

  console.log(muscleGroup);

  if (muscleGroup.includes("Triceps") && muscleGroup.includes("Biceps")) {
    muscleGroup.push("Arms");
    muscleGroup = muscleGroup.filter(x => {
      return x !== "Triceps" && x !== "Biceps";
    });
  }

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
    })
    .reduce((accu, curr) => {
      if (accu.length) {
        accu += "/";
      }
      return accu + `${curr}`;
    }, "");
}

export { displayMuscleGroups };
