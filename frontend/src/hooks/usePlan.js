import { useEffect, useReducer } from "react";
import axios from "axios";

const IS_PENDING = "IS_PENDING";
const IS_REJECTED = "IS_REJECTED";
const SET_PLAN = "SET_PLAN";
const EDIT_PLAN = "EDIT_PLAN";
const ADD_WEEK = "ADD_WEEK";
const DELETE_WEEK = "DELETE_WEEK";
const ADD_EXERCISE = "ADD_EXERCISE";
const EDIT_EXERCISE = "EDIT_EXERCISE";
const DELETE_EXERCISE = "DELETE_EXERCISE";

function planReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case IS_REJECTED: {
      return {
        ...state,
        isRejected: true,
        isPending: false,
        error: payload.error
      };
    }
    case IS_PENDING: {
      return {
        ...state,
        isPending: true,
        isRejected: false,
        error: null
      };
    }
    case SET_PLAN: {
      const { woPlan } = payload;
      return {
        ...state,
        woPlan,
        isPending: false
      };
    }
    // case ADD_FOOD: {
    //   const { dayId, mealId, amount, food, id } = payload;
    //   const { mealplan } = state;

    //   let newFood = {
    //     food,
    //     quantity: {
    //       amount,
    //       unit: {
    //         name: "g",
    //         value: 1
    //       }
    //     },
    //     _id: id
    //   };

    //   mealplan.days
    //     .find(x => x._id === dayId)
    //     .meals.find(x => x._id === mealId)
    //     .foods.push(newFood);

    //   return {
    //     ...state,
    //     mealplan
    //   };
    // }
    // case DELETE_FOOD:
    //   const { dayId, mealId, foodId } = action.payload;

    //   const { mealplan } = state;

    //   const { days } = mealplan;

    //   const dayIndex = days.map(x => x._id).indexOf(dayId);

    //   const day = days[dayIndex];

    //   const mealIndex = day.meals.map(x => x._id).indexOf(mealId);

    //   const meal = day.meals[mealIndex];

    //   const foods = meal.foods.filter(x => x._id !== foodId);

    //   mealplan.days[dayIndex].meals[mealIndex].foods = foods;

    //   return { ...state, mealplan };
    default:
      return state;
  }
}

const initialState = {
  plan: null,
  isPending: false,
  isRejected: false,
  error: null
};

const usePlan = planId => {
  const [state, dispatch] = useReducer(planReducer, initialState);

  useEffect(() => {
    function fetchData() {
      dispatch({ type: IS_PENDING });
      axios
        .get(`/plan/${planId}`)
        .then(res => {
          dispatch({ type: SET_PLAN, payload: { woPlan: res.data } });
        })
        .catch(err => {
          dispatch({
            type: IS_REJECTED,
            payload: { error: err.data || err.response }
          });
        });
    }

    fetchData();
  }, [planId]);

  return {
    state,
    dispatch
  };
};

export default usePlan;
