import { useState, useEffect, useCallback } from "react";

const useFetch = ({ url, json = {}, immediate = true }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNow = useCallback(() => {
    setIsLoading(true);
    setError(null);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to fetch: ${response.status} ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [url, json]);

  useEffect(() => {
    if (immediate) {
      fetchNow();
    }
  }, []);

  return { data, isLoading, error, fetch: fetchNow };
};

export default useFetch;
