import { AppProps } from 'next/app';
import { Header } from '../components/Header';
import '../styles/global.scss';
import { Provider as NextAuthProvaider } from 'next-auth/client';

function MyApp({ Component, pageProps }: AppProps) {
  // poxa o contexte de dentro do next-auth/client para todos terem acesso ao atenticação do usuario
  return(
    <NextAuthProvaider session={pageProps.session} >
    <Header />
    <Component {...pageProps} />
    </NextAuthProvaider >
  )
}

export default MyApp
