import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useRequest, UseRequestState } from "./useRequest";
import * as types from "./actionTypes";
import { Drop } from "../models";
import { getPiecesEndpoint } from "../api";

const getPieces = () => ({
  type: types.GET_PIECES,
});

const getPiecesSuccess = (drops: Drop[]) => ({
  type: types.GET_PIECES_SUCCESS,
  drops,
});

const getPiecesError = (error: string) => ({
  type: types.GET_PIECES_ERROR,
  error,
});

type Hook = [() => void, {loading: boolean, error: string | null}];

function useGetPieces(matchId: number): Hook {
  const dispatch = useDispatch();

  //@ts-ignore
  const [request, { data, loading, error }]: [() => void, UseRequestState] = useRequest(
    getPiecesEndpoint(matchId),
    "GET"
  );

  useEffect(
    function persistMatches() {
      if (error) {
        dispatch(getPiecesError(error));
        return;
      }

      if (data) {
        dispatch(getPiecesSuccess(data));
        return;
      }

      dispatch(getPieces());
    },
    [data, error, dispatch]
  );

  return [request, { loading, error }];
}

export { useGetPieces };
