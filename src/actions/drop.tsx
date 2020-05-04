import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useRequest2, UseRequestState } from "./useRequest";
import * as types from "./actionTypes";
import { Drop, DropResponse } from "../models";

type UpdateDropHook = [(url: string, updatedDrop: Drop) => void, {loading: boolean, error: string | null}];

const updateDropableSuccessAction = (drop: Drop) => ({
  type: types.UPDATE_DROP_LOCATION_SUCCESS,
  drop,
  isPusherDispatch: true,
});

export const updateDrop = (drop: Drop) => (dispatch: any) => {
  // from the match id in the URL, set it in state as currentMatch
  // PUT api/matches/:current_match/drops
  // {drop: Drop}
  /* export interface Drop {
   *   id: number;
   *   type: string;
   *   x: number;
   *   y: number;
   *   location: string;
   *   houseName?: string; // Optional for Combat but not for Pieces
   *   spec?: DropSpec;
   * } */
  dispatch(updateDropableSuccessAction(drop));
};

const updateDropSuccess = (drop: DropResponse) => ({
  type: types.UPDATE_DROP_LOCATION_SUCCESS,
  drop,
  isPusherDispatch: true,
});

export function useUpdateDrop(): UpdateDropHook {
  const dispatch = useDispatch();

  //@ts-ignore
  const [request, { data, loading, error }]: [(url: string, updatedPiece: Drop) => void, UseRequestState] = useRequest2("PUT");

  useEffect(
    function persistMatches() {
      if (error) {
        console.error(error);
        return;
      }

      if (data) {
        dispatch(updateDropSuccess(data));
        return;
      }
    },
    [data, error, dispatch]
  );

  return [request, { loading, error }];
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
