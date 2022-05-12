const Error = ({ statusCode }: StatusCode) => {
  return <p>{statusCode}</p>;
};

Error.getInitialProps = ({
  res,
  err,
}: {
  res: StatusCode;
  err: StatusCode;
}) => {
  const statusCode = res.statusCode ?? err.statusCode ?? 404;
  return { statusCode };
};

type StatusCode = { statusCode: number };

export default Error;
