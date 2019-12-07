import { SET_PLAN_BACKLINK } from "../types/navTypes";

export function setBackLink(dispatch, id, profile, search, planId) {
  let payload;
  if (profile) {
    const { username } = profile;
    if (profile._id === id) return;
    payload = { [id]: `/profile/${username}` };
  } else if (search) {
    payload = { [id]: "/explore", search };
  } else if (planId) {
    payload = { [id]: `/plans/${planId}` };
  } else {
    payload = { [id]: "/plans" };
  }
  dispatch({ type: SET_PLAN_BACKLINK, payload });
}
