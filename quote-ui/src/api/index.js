// eslint-disable-next-line import/no-anonymous-default-export
export default async (url, method, body) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdCIsIm5iZiI6MTYxODEwOTY0OSwiZXhwIjoxNjE4MTEzMjQ5LCJpYXQiOjE2MTgxMDk2NDl9.cT9V7tJFLIIOjkrthWT6svRsrxV1hqNAqGqHRFebF8s",
  };

  const response = await fetch("https://localhost:44343/v1/quotation", {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  const responseBody = await response.json();

  if (response.status !== 200) {
    throw Error(response);
  }

  alert(JSON.stringify(responseBody));
  return responseBody;
};
