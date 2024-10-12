import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

import { bangs } from '../constants';
import * as Search from '../search';

function SearchRedirect() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const query = params.get("q");

  let executed = false;
  useEffect(() => {
    if (query !== null) {
      const result = Search.execute(bangs)(query);
      if (result.type === "error") {
        navigate(`/?q=&e=${encodeURIComponent(result.error)}`)
      } else if (result.locations.length === 0) {
        navigate(`/?q=&e=${encodeURIComponent("Failed to search: unknown error")}`);
      } else if (!executed) {
        executed = true;
        const head = result.locations[0];
        const rest = result.locations.slice(1);

        setParams({});
        rest.map((location: string) => window.open(location))
        window.focus();
        window.location.href = head;
      }
    } else {
      navigate(`/`)
    }
  }, [query])

  return (
    <div />
  );
}

export default SearchRedirect;
