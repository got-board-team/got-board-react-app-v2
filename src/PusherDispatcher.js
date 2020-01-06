const API_HOST = process.env.REACT_APP_API_HOST;

const ApiClient = (payload) => {
  const endpoint = `${API_HOST}/message`;
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
    const { type, isPusherDispatch, ...payload  } = action;
    ApiClient(payload)
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
