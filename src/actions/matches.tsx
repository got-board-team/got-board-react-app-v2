import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useRequest, UseRequestState } from "./useRequest";
import * as types from "./actionTypes";
import { Match } from "../reducers/game";

// TODO: Move to endpoints file + API URL to env var
const allMatchesEndpoint = "http://localhost:8000/matches";

const getMatches = () => ({
  type: types.GET_MATCHES,
});

const getMatchesSuccess = (matches: Match[]) => ({
  type: types.GET_MATCHES_SUCCESS,
  matches,
});

const getMatchesError = (error: string) => ({
  type: types.GET_MATCHES_ERROR,
  error,
});

function useGetMatches(): [() => void, {loading: boolean, error: string | null}] {
  const dispatch = useDispatch();

  //@ts-ignore
  const [request, { data, loading, error }]: [() => void, UseRequestState] = useRequest(
    allMatchesEndpoint,
    "GET",
    null
  );

  useEffect(
    function persistMatches() {
      if (error) {
        dispatch(getMatchesError(error));
        return;
      }

      if (data) {
        dispatch(getMatchesSuccess(data));
        return;
      }

      dispatch(getMatches());
    },
    [data, error, dispatch]
  );

  return [request, { loading, error }];
}

export { useGetMatches };
