import React, { useState, useEffect, useContext } from "react";
import { addMuscleGroup, editMuscleGroup } from "../../../utils/exerciseClient";
import { ExerciseContext } from "../../../context/exerciseContext";

import Modal from "../Modal/Modal";
import MobileInput from "../Form/MobileInput";
import { CirclePicker } from "react-color";
import ErrorMessage from "../Modal/ErrorMessage";

const colors = [
  "#e21111",
  "#f44336",
  "#e91e63",
  "#9c27b0",
  "#673ab7",
  "#3f51b5",
  "#2196f3",
  "#03a9f4",
  "#00bcd4",
  "#009688",
  "#4caf50",
  "#8bc34a",
  "#cddc39",
  "#ffeb3b",
  "#ffc107",
  "#ff9800",
  "#795548",
  "#607d8b"
];

function isColorAssigned(color, muscleGroups) {
  const colors = muscleGroups.map(x => x.color);
  let index = colors.indexOf(color);
  if (index > -1) {
    return muscleGroups[index];
  }
  return false;
}

const AddCategoryModal = ({
  hideModal,
  muscleGroups,
  setMuscleGroup,
  muscleGroupToEdit
}) => {
  let initName = "";
  let initColor = "";
  let header = "Add Category";
  if (muscleGroupToEdit) {
    const { name, color } = muscleGroupToEdit;
    initName = name;
    initColor = color;
    header = "Edit Category";
  }
  const [name, setName] = useState(initName);
  const [color, setColor] = useState(initColor);
  const [isAssigned, setIsAssigned] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);
  const { dispatch } = useContext(ExerciseContext);

  useEffect(() => {
    function findFirstUnusedColor() {
      if (!initColor.length) {
        for (let color of colors) {
          const isAssigned = isColorAssigned(color, muscleGroups);
          if (!isAssigned) {
            setColor(color);
            break;
          }
        }
      }
    }

    findFirstUnusedColor();
  }, [initColor.length, muscleGroups]);

  function onChange(e) {
    setName(e.target.value);
  }

  function onSubmit() {
    if (!name) {
      return setError("Name is required");
    }
    if (!color) {
      return setError("Color is required");
    }
    setIsPending(true);
    if (muscleGroupToEdit) {
      let values = {};
      if (name !== initName) {
        values.name = name;
      }
      if (color !== initColor) {
        values.color = color;
      }
      editMuscleGroup(dispatch, muscleGroupToEdit._id, values)
        .then(() => {
          hideModal();
        })
        .catch(err => {
          setError(err);
          setIsPending(false);
        });
    } else {
      addMuscleGroup(dispatch, name, color)
        .then(muscleGroupId => {
          hideModal();
          let mgIndex = muscleGroups.map(x => x._id).indexOf(muscleGroupId);
          console.log(mgIndex);
          setMuscleGroup(muscleGroups[mgIndex]);
        })
        .catch(err => {
          setError(err);
          setIsPending(false);
        });
    }
  }

  function onColorChange(color) {
    const { hex } = color;
    setColor(hex);
    const isAssigned = isColorAssigned(hex, muscleGroups);
    setIsAssigned(isAssigned);
  }

  let children;
  if (muscleGroupToEdit && !muscleGroupToEdit.custom) {
    children = (
      <p className="black mt-0">You can't edit the default categories</p>
    );
  } else {
    children = (
      <div className={"width-100p border-box add-exercise-form-container"}>
        {error && <ErrorMessage message={error} />}
        <div className="add-category-name-input-box">
          <MobileInput
            type={"text"}
            label={"Name"}
            field={{ name: "Name", value: name, onChange }}
            form={{ touched: {}, errors: {} }}
            maxLength={30}
            autoComplete={"off"}
          />
        </div>
        <div className="flex-col-cen">
          <CirclePicker
            onChange={onColorChange}
            color={color}
            colors={colors}
          />
          <p className="color-light-gray font-13 add-category-color-assigned-p">
            {isAssigned && (
              <>
                This color is also assigned to{" "}
                <span className="font-w-500">{isAssigned.name}</span>
              </>
            )}
          </p>
        </div>
        <div className="flex-center modal-mobile-delete-btn-container">
          <button
            className="theme-btn-filled mobile-modal-delete-btn padding-5 margin-0-10"
            onClick={onSubmit}
            disabled={isPending}
          >
            Confirm
          </button>
          <button
            className="cancel-btn padding-5 margin-0-10"
            onClick={hideModal}
            disabled={isPending}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return <Modal header={header} children={children} toggleModal={hideModal} />;
};

export default AddCategoryModal;
