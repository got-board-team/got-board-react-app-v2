const API_HOST = process.env.REACT_APP_API_HOST;

const ApiClient = (payload) => {
  const endpoint = `${API_HOST}/messages`;
  const options = {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(payload)
  };
  return fetch(endpoint, options);
};

export default () => store => next => action => {
  if (action.isPusherDispatch) {
    // Extracting isPusherDispatch key from the payload
    const { isPusherDispatch, type, drop, ...payload  } = action;
    const currentUserId = store.getState()["currentUser"]["id"];
    const finalPayload = {
      drop,
      type,
      author: currentUserId,
    };

    ApiClient(finalPayload)
      .then(response => response.json())
      .then(json => {
        console.log("Response", json);
      })
      .catch(exception => {
        console.error(exception);
      });
  }

  next(action);
};
