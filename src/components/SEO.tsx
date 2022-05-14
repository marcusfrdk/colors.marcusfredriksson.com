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
