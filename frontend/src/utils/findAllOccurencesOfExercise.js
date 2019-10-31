function findAllOccurencesOfExercise(historyDays, exerciseId) {
  return historyDays.reduce((accu, curr) => {
    const filteredExercises = curr.exercises.filter(
      x => x.exercise._id === exerciseId
    );

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

  console.log(allOcc);
  if (allOcc.length) {
    const { sets } = allOcc[allOcc.length - 1];
    return sets[sets.length - 1];
  }
}

export { findAllOccurencesOfExercise, findLastOccurenceOfExercise };
