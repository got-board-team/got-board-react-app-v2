const API_HOST = process.env.REACT_APP_API_HOST;

const httpClient = (dispatch, action) => {
  const endpoint = `${API_HOST}/message`;
  const options = {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({
      data: {
        ...action,
      }
    })
  };
  fetch(endpoint, options)
    .then((response) => console.log("Dispatch", action, response));
};

export default () => store => next => action => {
  if (action.pDispatch) {
    console.log("Run Pusher Client");
    httpClient(store.dispatch, action);
  }
  next(action);
};
