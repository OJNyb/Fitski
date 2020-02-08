import { SET_PLAN_BACKLINK } from "../types/navTypes";

export function setBackLink(dispatch, id, args) {
  const { profile, search, planId, searchCategory } = args;

  let payload;
  if (profile) {
    const { username } = profile;
    if (profile._id === id) return;
    payload = { [id]: `/profile/${username}` };
  } else if (search || search === "") {
    payload = { [id]: "/discover", search, searchCategory };
  } else if (planId) {
    payload = { [id]: `/plans/${planId}` };
  } else {
    payload = { [id]: "/plans" };
  }
  dispatch({ type: SET_PLAN_BACKLINK, payload });
}
