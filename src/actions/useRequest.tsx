import { useState } from "react";

export interface UseRequestState {
  loading: boolean;
  error: string | null;
  data: any; // TODO: Should be type Response but it adds types side effects issue
}

export function useRequest(url: string, method: string, config: any) {
  const initialState: UseRequestState = {
    loading: false,
    error: null,
    data: null,
  };

  const [{ loading, error, data }, setResponse] = useState(initialState);

  async function request(data: any) {
    try {
      setResponse(prevState => ({
        ...prevState,
        loading: true,
      }));

      const response: Response = await fetch(
        url,
        {
          ...config,
          headers: {
            "Content-Type": "application/json"
          },
          method,
          body: data && JSON.stringify(data)
        }
      );
      const responseData = await response.json();

      setResponse(prevState => ({
        ...prevState,
        data: responseData,
        loading: false,
      }));
    } catch (err) {
      setResponse(prevState => ({
        ...prevState,
        error: err.message,
        loading: false,
      }));
    }
  }

  return [request, { loading, error, data }];
}
