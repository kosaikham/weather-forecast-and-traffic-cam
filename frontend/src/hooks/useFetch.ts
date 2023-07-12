import { useState, useEffect } from "react";
import { message } from "antd";
import { APIResponse } from "../types";

export const useFetch = (
  dateTimeString: string | null
): [APIResponse[], boolean, Error | null] => {
  const [response, setResponse] = useState<APIResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!dateTimeString) return;

    fetch(`http://localhost:8080/?date_time=${dateTimeString}`)
      .then((response) => {
        if (!response.ok) {
          message.error({
            type: 'error',
            content: `HTTP error! status: ${response.status}`,
          });
          return;
        }
        return response.json();
      })
      .then((data) => {
        if (data.length === 0) {
          message.error({
            type: 'error',
            content: 'Please enter valid date and time!',
          });
        } else {
          setResponse(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [dateTimeString]);

  return [response, loading, error];
};
