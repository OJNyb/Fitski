import React from "react";

const ExercisesBigView = ({
  search,
  isPending,
  muscleGroup,
  onAddExercise,
  exercisesToShow,
  handleSearchChange,
  handleSelectChange
}) => {
  if (isPending) exercisesDisplay = <p>Loading...</p>;

  let exercisesDisplay;
  if (exercisesToShow) {
    exercisesDisplay = exercisesToShow.map(x => (
      <div
        className="exercises-item"
        key={x._id}
        onClick={() => onAddExercise(x)}
      >
        {x.name}
      </div>
    ));
  }

  return (
    <div className="exercises-container">
      <div className="exercises-head">
        <div className="exercise-search-container">
          <i className="material-icons">search</i>
          <input value={search} onChange={handleSearchChange} />
        </div>

        {/* <div className="exercises-filter-container">
           <span>Muscle group</span>
           <select onChange={handleSelectChange} selected={muscleGroup}>
            <option>All</option>
            <option>Abs</option>
            <option>Back</option>
            <option>Legs</option>
            <option>Chest</option>
            <option>Biceps</option>
            <option>Triceps</option>
            <option>Shoulders</option>
          </select> 
        </div>*/}
        <div className="exercise-muscle-group-button">
          <i className="material-icons-round">arrow_back_ios</i>
          <span>Muscle groups</span>
        </div>
      </div>
      <div className="exercises-body">
        <div></div>
        <div>{exercisesDisplay}</div>
      </div>
    </div>
  );
};

export default ExercisesBigView;
