import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createEmotionCache } from '../utils/create-emotion-cache';
import { theme } from '../theme';
import store from '../components/store/store'
import {Provider} from 'react-redux';
import Router from "next/router";
import {LoadingIcon} from '../icons/loading'
import {useState,useEffect} from 'react'
import NProgress from "NProgress"

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  const [loading, setLoading] = useState(false);
   useEffect(() => {
    const start = () => {
      console.log("start");
      setLoading(true);
      NProgress.start();
    };
    const end = () => {
      console.log("findished");
      setLoading(false);
      NProgress.done();
    };
    Router.events.on("routeChangeStart", (start)=>{
      setLoading(true);
      NProgress.start();

    });
    Router.events.on("routeChangeComplete", (end)=>{
      setLoading(false);
      NProgress.done();
    });
    Router.events.on("routeChangeError", (end)=>{
      setLoading(false);
      NProgress.done();
    });
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <Provider store={store}>
    <CacheProvider value={emotionCache}>
      <Head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <title>
          IVT Solution
        </title>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {loading?<>Loading... </>  :getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </LocalizationProvider>
    </CacheProvider>
    </Provider>
  );
};

export default App;
