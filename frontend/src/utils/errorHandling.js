export function isSuccessful(res) {
  const { data } = res;
  if (data) {
    const { message } = data;
    if (message === "success") return true;
    return false;
  }
}

export function getErrorMessage(err) {
  if (err) {
    const { response } = err;
    if (response) {
      const { data } = response;
      if (data) {
        const { error } = data;
        if (error) {
          const { details } = error;
          if (details) {
            return details;
          }
        }
      }
    }
  }
  return [{ message: "Something gnarly happened, please refresh the page" }];
}
