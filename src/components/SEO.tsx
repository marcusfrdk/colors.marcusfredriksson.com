import Head from "next/head";
import { useEffect, useState } from "react";
import { BASE_URL } from "utils/constants";

const SEO = ({ title, description }: Props) => {
  const [stateThemeColor, setStateThemeColor] = useState("#ffffff");

  useEffect(() => {
    const handleChange = (e: any) =>
      setStateThemeColor(e.matches ? "#1c1c1c" : "#ffffff");
    const listener = window.matchMedia("(prefers-color-scheme: dark)");
    listener.addEventListener("change", handleChange);
    handleChange(listener.matches);
    return () => listener.removeEventListener("change", handleChange);
  }, []);

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Talmio Colors" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta name="theme-color" content={stateThemeColor} />
      <meta name="msapplication-TileColor" content={stateThemeColor} />
      <link rel="canonical" href={BASE_URL} />
    </Head>
  );
};

type Props = {
  title: string;
  description: string;
};

export default SEO;
