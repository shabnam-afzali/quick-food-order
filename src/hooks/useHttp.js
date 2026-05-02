import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);
  const resData = await response.json();
  if (!response.ok) {
    throw new Error(
      resData.message || "something went wrong,failes to send request..."
    );
  }
}
function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData);
  const [error, setError] = useState();
  const [isLoading, setIsloading] = useState(false);
  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsloading(true);
      try {
        const resData = sendHttpRequest(url, { ...config, body: data });
        setData(resData);
      } catch (err) {
        setError(err.message || "something went wrong");
      }
      setIsloading(false);
    },
    [url, config]
  );
  useEffect(() => {
    if ((config && config.method === "GET") || !config.method || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);
  return { data, isLoading, error, sendRequest };
}

export default useHttp;
