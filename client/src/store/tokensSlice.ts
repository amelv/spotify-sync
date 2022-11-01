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

export const createTokensSlice: SliceCreator<TokensSlice> = (set) => ({
  tokens: {
    access: "",
    refresh: "",
    expiresIn: "",
  },
  dispatchTokensAction: ({ type, payload }) => set({ tokens: payload }),
});
