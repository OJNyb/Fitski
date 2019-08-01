const createErrorObject = messages => {
  let details = [];
  messages.forEach(message => details.push({ message }));

  return {
    isCustom: true,
    error: {
      details
    }
  };
};

module.exports = createErrorObject;
