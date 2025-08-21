interface ErrorProps {
  error: string | object;
}

const Error = ({ error }:ErrorProps) => {
  return (
    <div className="error-container">
      <p>
        Something went wrong! Please try later <br />
         {`${error}`}
      </p>
    </div>
  );
};

export default Error;