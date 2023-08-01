import { SliceCreator } from "src/store";

interface Tokens {
  access: string;
  refresh: string;
  expiresIn: string;
  expiresAt?: Date;
}

interface Action {
  type: "set";
  payload: Tokens;
}

export interface TokensSlice {
  tokens: Tokens;
  dispatchTokensAction: (token: Action) => void;
}

/**
 * Creates a slice for managing the tokens. The slice contains the
 * following state:
 * - tokens: the tokens
 * - dispatchTokensAction: a function that dispatches an action to
 *  update the state
 * 
 * @param set 
 * @returns 
 */
export const createTokensSlice: SliceCreator<TokensSlice> = (set) => ({
  tokens: {
    access: "",
    refresh: "",
    expiresIn: "",
  },
  dispatchTokensAction: ({ type, payload }) => set({ tokens: payload }),
});
