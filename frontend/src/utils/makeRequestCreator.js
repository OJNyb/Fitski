import axios from "axios";

const resources = {};

function makeRequestCreator() {
  let cancel;

  return async query => {
    // Check if we made a request
    if (cancel) {
      // Cancel the previous request before making a new request
      cancel.cancel();
    }
    // Create a new CancelToken
    cancel = axios.CancelToken.source();

    try {
      if (resources[query]) {
        // Return result if it exists
        return { results: resources[query] };
      }

      const res = await axios(query, { cancelToken: cancel.token });
      const { results } = res.data;
      resources[query] = results;

      return { results };
    } catch (error) {
      if (axios.isCancel(error)) {
        return { isCancelled: true };
      } else {
        return { error };
      }
    }
  };
}

export { makeRequestCreator };
