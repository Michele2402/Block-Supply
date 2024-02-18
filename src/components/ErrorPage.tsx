import React from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <>
      {<p>{isRouteErrorResponse(error) ? "invalid route" : "Error thrown"}</p>}
    </>
  );
};

export default ErrorPage;
