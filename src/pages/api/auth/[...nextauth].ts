import {query as q} from 'faunadb'
import NextAuth from "next-auth"
import Providers from "next-auth/providers"

import { fauna } from '../../../Services/fauna';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: 'read:user'
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn(user){
     const { email } = user;

      try{
        await fauna.query(
          q.If(
            q.Not( // nao 
              q.Exists( //existe
                q.Match( // o ususario com o email
                  q.Index('user_by_email'),
                  q.Casefold(user.email) // passa o email do usuario aqui
                )
              )
            ),
            q.Create( // criar usuario
              q.Collection('users'),
              { data: {email}} // com esse email
            ),
            q.Get( // se ele ja existe busque as informçoes
              q.Match(
                q.Index('user_by_email'),
                q.Casefold(user.email)
              )
            )
          )
        )

        return true;
      } catch{
        return false;
      }
    },
  }
})