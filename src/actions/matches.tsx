import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useRequest, UseRequestState } from "./useRequest";
import * as types from "./actionTypes";
import { Match } from "../reducers/game";

type MatchHook = [() => void, {loading: boolean, error: string | null}];

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

function useGetMatches(): MatchHook {
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

const createMatch = () => ({
  type: types.CREATE_MATCH,
});

const createMatchSuccess = (match: Match) => ({
  type: types.CREATE_MATCH_SUCCESS,
  match,
});

const createMatchError = (error: string) => ({
  type: types.CREATE_MATCH_ERROR,
  error,
});

function useCreateMatch(matchName: string, playersCount: number): MatchHook {
  const dispatch = useDispatch();

  //@ts-ignore
  const [request, { data, loading, error }]: [() => void, UseRequestState] = useRequest(
    allMatchesEndpoint,
    "POST",
    { "name": matchName, "players_count": playersCount}
  );

  useEffect(
    function persistNewMatchesToState() {
      if (error) {
        dispatch(createMatchError(error));
        return;
      }

      if (data) {
        dispatch(createMatchSuccess(data));
        return;
      }

      dispatch(createMatch());
    },
    [data, error, dispatch]
  );

  return [request, { loading, error }];
}

export { useGetMatches, useCreateMatch };
