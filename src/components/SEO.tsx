import Head from "next/head";

const SEO = ({ title, description }: Props) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Head>
  );
};

type Props = {
  title: string;
  description: string;
};

export default SEO;
