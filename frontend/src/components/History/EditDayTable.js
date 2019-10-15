import React from "react";
import { displayMuscleGroups } from "../../utils/displayMuscleGroups";

import DayExercise from "./DayExercise";

import "./editDay.css";

const EditDayTable = ({
  day,
  showWeight,
  handleAddSet,
  handleEditSet,
  handleDeleteExercise
}) => {
  const { exercises } = day;

  let exerciseDisplay = exercises.map(exercise => {
    if (!exercise || !exercise.exercise) {
      return null;
    } else {
      return (
        <DayExercise
          dayId={day._id}
          key={exercise._id}
          exercise={exercise}
          showWeight={showWeight}
          onAddSet={handleAddSet}
          handleEditSet={handleEditSet}
          onDeleteExercise={handleDeleteExercise}
        />
      );
    }
  });

  let muscleGroup = displayMuscleGroups(exercises);

  return (
    <>
      <div className="history-add-muscle-group-container">
        {muscleGroup.length !== 0 && (
          <>
            {/* <p className="history-muscle-group-label">Muscle group</p> */}
            <h3 className="history-muscle-group">{muscleGroup}</h3>
          </>
        )}
      </div>

      {/* <div className="history-add-header">
        <div className="history-exercise-row">Exercise</div>
        <div>
          {showWeight && <div className="history-row">Weight</div>}
          <div className="history-row">Reps</div>
        </div>
      </div> */}
      <div className="history-add-body">{exerciseDisplay}</div>
    </>
  );
};

export default EditDayTable;

// import React from "react";
// import { displayMuscleGroups } from "../../../utils/displayMuscleGroups";

// import DayExercise from "./DayExercise";

// import "./editDay.css";

// const EditDayTable = ({
//   day,
//   showWeight,
//   handleEditExercise,
//   handleDeleteExercise
// }) => {
//   const { exercises } = day;

//   let exerciseDisplay = exercises.map(exercise => {
//     if (!exercise || !exercise.exercise) {
//       return null;
//     } else {
//       return (
//         <DayExercise
//           dayId={day._id}
//           key={exercise._id}
//           exercise={exercise}
//           showWeight={showWeight}
//           onEditExercise={handleEditExercise}
//           onDeleteExercise={handleDeleteExercise}
//         />
//       );
//     }
//   });

//   let muscleGroup = displayMuscleGroups(exercises);

//   return (
//     <>
//       <div className="history-add-muscle-group-container">
//         {muscleGroup.length !== 0 && (
//           <>
//             <p className="history-muscle-group-label">Muscle group</p>
//             <h3 className="history-muscle-group">{muscleGroup}</h3>
//           </>
//         )}
//       </div>

//       <div className="history-add-header">
//         <div className="history-exercise-row">Exercise</div>
//         <div>
//           <div className="history-row">Sets</div>
//           {showWeight && <div className="history-row">Weight</div>}
//           <div className="history-row">Reps</div>
//         </div>
//       </div>
//       <div className="history-add-body">{exerciseDisplay}</div>
//     </>
//   );
// };

// export default EditDayTable;
