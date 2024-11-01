import React from 'react';
import { useEffect, useRef, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

import { SettingsContext } from '../components/SettingsProvider';
import * as Search from '../search';

function SearchRedirect() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const query = params.get("q");

  const settings = useContext(SettingsContext);

  const executed = useRef(false);
  useEffect(() => {
    if (query !== null) {
      const result = Search.execute(settings.bangs)(query);
      if (result.type === "error") {
        navigate(`/?q=${encodeURIComponent(query)}&e=${encodeURIComponent(result.error)}`)
      } else if (result.locations.length === 0) {
        navigate(`/?q=${encodeURIComponent(query)}&e=${encodeURIComponent("Failed to search: unknown error")}`);
      } else if (!executed.current) {
        executed.current = true;
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
  }, [query, navigate, setParams, settings])

  return (
    <div />
  );
}

export default SearchRedirect;
