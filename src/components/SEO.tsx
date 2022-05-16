import useTheme from "contexts/theme/useTheme";
import Head from "next/head";
import { BASE_URL } from "utils/constants";

const SEO = ({ title, description }: Props) => {
  const { themeColor } = useTheme();

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Talmio Colors" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="/og-image.png" />
      <meta property="og:image:height" content="630px" />
      <meta property="og:image:width" content="1200px" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={BASE_URL} />
      <meta property="twitter:site" content="talmioofficial" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta name="theme-color" content={themeColor} />
      <meta name="msapplication-TileColor" content={themeColor} />
      <link rel="canonical" href={BASE_URL} />
    </Head>
  );
};

type Props = {
  title: string;
  description: string;
};

export default SEO;
