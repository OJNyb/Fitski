import React from "react";

import "./planTable.css";

const PlanTable = () => {
  return (
    <div>
      <table className="plan-table">
        <thead>
          <tr>
            <th />
            <th>Body part</th>
            <th>Exercise</th>
            <th>Sets</th>
            <th>Reps</th>
            <th>Rest</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="plan-day-cell" rowSpan={4}>
              <p>1</p>
            </td>
            <td className="plan-exercise-cell" rowSpan={4}>
              Chest
            </td>
            <td>Flat barbell bench press</td>
            <td>3</td>
            <td>5</td>
            <td>2-3min</td>
          </tr>
          <tr>
            <td>Flat barbell bench press</td>
            <td>3</td>
            <td>5</td>
            <td>2-3min</td>
          </tr>
          <tr>
            <td>Flat barbell bench press</td>
            <td>3</td>
            <td>5</td>
            <td>2-3min</td>
          </tr>
          <tr>
            <td>Flat barbell bench press</td>
            <td>3</td>
            <td>5</td>
            <td>2-3min</td>
          </tr>
        </tbody>

        <tbody>
          <tr>
            <td className="plan-day-cell" rowSpan={4}>
              <p>2</p>
            </td>
            <td className="plan-exercise-cell" rowSpan={4}>
              Back
            </td>
            <td>Flat barbell bench press</td>
            <td>3</td>
            <td>5</td>
            <td>2-3min</td>
          </tr>
          <tr>
            <td>Flat barbell bench press</td>
            <td>3</td>
            <td>5</td>
            <td>2-3min</td>
          </tr>
          <tr>
            <td>Flat barbell bench press</td>
            <td>3</td>
            <td>5</td>
            <td>2-3min</td>
          </tr>
          <tr>
            <td>Flat barbell bench press</td>
            <td>3</td>
            <td>5</td>
            <td>2-3min</td>
          </tr>
        </tbody>

        <tbody>
          <tr>
            <td className="plan-day-cell" rowSpan={4}>
              <p>3</p>
            </td>
            <td className="plan-exercise-cell" rowSpan={4}>
              Shoulders
            </td>
            <td>Flat barbell bench press</td>
            <td>3</td>
            <td>5</td>
            <td>2-3min</td>
          </tr>
          <tr>
            <td>Flat barbell bench press</td>
            <td>3</td>
            <td>5</td>
            <td>2-3min</td>
          </tr>
          <tr>
            <td>Flat barbell bench press</td>
            <td>3</td>
            <td>5</td>
            <td>2-3min</td>
          </tr>
          <tr>
            <td>Flat barbell bench press</td>
            <td>3</td>
            <td>5</td>
            <td>2-3min</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PlanTable;
