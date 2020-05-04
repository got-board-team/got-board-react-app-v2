import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useRequest2, UseRequestState } from "./useRequest";
import * as types from "./actionTypes";
import { Drop, DropResponse } from "../models";
import { updatePieceEndpoint } from "../api";

type UpdateDropHook = [(matchId: number, pieceId: number, updatedDrop: Drop) => void, {loading: boolean, error: string | null}];

const updateDropSuccess = (drop: DropResponse) => ({
  type: types.UPDATE_DROP_LOCATION_SUCCESS,
  drop,
  isPusherDispatch: true,
});

export function useUpdateDrop(): UpdateDropHook {
  const dispatch = useDispatch();

  //@ts-ignore
  const [request, { data, loading, error }]: [(url: string, updatedPiece: Drop) => void, UseRequestState] = useRequest2("PUT");

  function createRequest(matchId: number, pieceId: number, updatedPiece: Drop) {
    const url = updatePieceEndpoint(matchId, pieceId);
    return request(url, updatedPiece);
  }

  useEffect(
    function persistMatches() {
      if (data) {
        dispatch(updateDropSuccess(data));
        return;
      }
    },
    [data, dispatch]
  );

  return [createRequest, { loading, error }];
}

const updateFlippedSuccessAction = (drop: Drop) => ({
  type: types.UPDATE_DROP_REVEAL_COMBAT_SUCCESS,
  drop,
  isPusherDispatch: true,
});

export const revealCards = (drops: Drop[]) => (dispatch: any) => {
  drops.forEach(drop => dispatch(updateFlippedSuccessAction(drop)));
}

const resetCombatSuccessAction = () => ({
  type: types.RESET_COMBAT_SUCCESS,
  isPusherDispatch: true,
});

export const resetCombat = () => (dispatch: any) => {
  dispatch(resetCombatSuccessAction());
}
