import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useRequest, UseRequestState } from "./useRequest";
import * as types from "./actionTypes";
import { Match } from "../models";

type MatchHook = [() => void, {loading: boolean, error: string | null}];

// TODO: Move to endpoints file + API URL to env var
const BASE_API_URL = "http://localhost:8000";
const allMatchesEndpoint = `${BASE_API_URL}/matches`;
const matchEndpoint = (matchId: number) => `${BASE_API_URL}/matches/${matchId}`;

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
    "GET"
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

const getMatch = () => ({
  type: types.GET_MATCH,
});

const getMatchSuccess = (attributes: Match) => ({
  type: types.GET_MATCH_SUCCESS,
  attributes,
});

const getMatchError = (error: string) => ({
  type: types.GET_MATCH_ERROR,
  error,
});

function useGetMatch(matchId: number): MatchHook {
  const dispatch = useDispatch();

  //@ts-ignore
  const [request, { data, loading, error }]: [() => void, UseRequestState] = useRequest(
    matchEndpoint(matchId),
    "GET"
  );

  useEffect(
    function persistMatches() {
      if (error) {
        dispatch(getMatchError(error));
        return;
      }

      if (data) {
        dispatch(getMatchSuccess(data));
        return;
      }

      dispatch(getMatch());
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
  const [request, { data, loading, error }]: [(data: any) => void, UseRequestState] = useRequest(
    allMatchesEndpoint,
    "POST"
  );

  function createMatchRequest() {
    request({ "name": matchName, "players_count": playersCount });
  }

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

  return [createMatchRequest, { loading, error }];
}

export { useGetMatches, useGetMatch, useCreateMatch };
