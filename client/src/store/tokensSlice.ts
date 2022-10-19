import { SliceCreator } from "src/store";

interface Tokens {
  access: string;
  refresh: string;
  expiresIn: string;
  expiresAt?: Date;
}

export interface TokensSlice {
  tokens: Tokens;
  setTokens: (token: Tokens) => void;
}

export const createTokensSlice: SliceCreator<TokensSlice> = (set) => ({
  tokens: {
    access: "",
    refresh: "",
    expiresIn: "",
  },
  setTokens: (tokens: Tokens) => set({ tokens }),
});
