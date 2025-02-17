import "../public/styles.css";
import { SessionProvider } from "next-auth/react";

// This default export is required in a new `pages/_app.js` file.
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
