import NextAuth, { NextAuthOptions, Session } from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env

export interface CustomSession extends Session {
  user: {
    name?: string | null
    id?: string | null
    email?: string | null
    image?: string | null
  }
  albumData: null
}

const authOpts: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: `${SPOTIFY_CLIENT_ID}`,
      clientSecret: `${SPOTIFY_CLIENT_SECRET}`,
      authorization: {
        params: {
          scope: [
            'user-modify-playback-state',
            'user-read-playback-state',
            'user-read-currently-playing',
            'user-library-modify',
            'user-library-read',
            'user-top-read',
            'playlist-read-private',
            'playlist-modify-public'
          ].join(',')
        }
      }
    })
  ],
  callbacks: {
    async jwt ({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
        token.expiresAt = account.expires_at
        token.accountID = account.providerAccountId
      }
      return token
    },
    async session ({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.accountID
        },
        token: {
          refreshToken: token.refreshToken,
          accessToken: token.accessToken,
          expiresAt: token.expiresAt
        }
      }
    }
  },
  secret: `${SPOTIFY_CLIENT_SECRET}`
}

const handler = NextAuth(authOpts)

export { handler as GET, handler as POST }
