function findAllOccurencesOfExercise(historyDays, exerciseId) {
  console.log(historyDays, exerciseId);
  return historyDays.reduce((accu, curr) => {
    const filteredExercises = curr.exercises.filter(x => {
      const { exercise } = x;
      if (!exercise) return false;
      return exercise._id === exerciseId;
    });

    if (filteredExercises.length)
      accu.push({
        date: curr.date,
        sets: filteredExercises[0].sets
      });
    return accu;
  }, []);
}

function findLastOccurenceOfExercise(historyDays, exerciseId) {
  let allOcc = findAllOccurencesOfExercise(historyDays, exerciseId);
  if (allOcc.length) {
    const { sets } = allOcc[allOcc.length - 1];
    return sets[sets.length - 1];
  }
}

function findLastOccurenceOfExercisePlan(weeks, exerciseId) {
  let lastSet;
  for (let i = weeks.length - 1; i >= 0; i--) {
    if (lastSet) break;
    const { days } = weeks[i];
    for (let i = days.length - 1; i >= 0; i--) {
      if (lastSet) break;
      const { exercises } = days[i];
      for (let i = exercises.length - 1; i >= 0; i--) {
        if (lastSet) break;
        if (!exercises[i].exercise) continue;
        const {
          sets,
          exercise: { _id }
        } = exercises[i];
        if (_id === exerciseId) {
          lastSet = sets[sets.length - 1];
          break;
        }
      }
    }
  }
  return lastSet || { reps: 0 };
}

export {
  findAllOccurencesOfExercise,
  findLastOccurenceOfExercise,
  findLastOccurenceOfExercisePlan
};
