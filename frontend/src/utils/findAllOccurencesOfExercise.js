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

export { findAllOccurencesOfExercise };
