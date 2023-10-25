import "../css/style.css";
import "../css/form.css";
import Head from "next/head";
import Link from "next/link";
import type { AppProps } from "next/app";
import DataSaverOnSharpIcon from "@mui/icons-material/DataSaverOnSharp";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Roulette App</title>
        <link rel="icon" type="image/png" sizes="16x16" href="/roulette.png" />
      </Head>

      <div className="top-bar">
        <div className="nav">
          <Link href="/new">
            <DataSaverOnSharpIcon style={{ fontSize: 50, color: "#1E90FF" }} />
          </Link>
        </div>

        <Link href="/">
          <img id="title" src="/roulette1.png" alt="pet care logo" />
        </Link>
      </div>
      <div className="wrapper grid">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
