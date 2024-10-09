import P from 'parsimmon';

export namespace Parser {
  interface Token {
    type: string;
  }

  interface Query extends Token {
    type: "Query"
    value: string
  }

  interface Bang extends Token {
    type: "Bang"
    value: string
  }

  export const Language = P.createLanguage({
    Query: (r) => P.alt(
      r.QuotedQuery,
      P.regexp(/[^!]+/).map(x => ({ type: "Query", value: x.trim() }))
    ),
    QuotedQuery: () =>
      P.regexp(/"[^"]*[^\\]"/).map(x => ({ type: "Query", value: x.trim() })),
    Bang: () => P.string("!").then(P.regexp(/[^ ]+/).map(x => ({ type: "Bang", value: x }))),

    Input: (r) => P.alt(r.Query, r.Bang).many(),
  });

  export const parse = (query: string) => {
    try {
      const tokens = Language.Input.tryParse(query);
      const resolvedQuery = tokens
        .filter(token => token.type === "Query")
        .filter(token => token.value !== "")
        .map(token => token.value)
        .join(" ");
      const resolvedBangs = tokens.filter(token => token.type == "Bang").map(token => token.value);

      if (resolvedQuery === "") {
        return { error: "Failed to parse: empty query" };
      } else if (resolvedBangs.length == 0) {
        return { error: "Failed to parse: empty bangs" };
      } else {
        return { query: resolvedQuery, bangs: resolvedBangs };
      }
    } catch (e) {
      console.log(e)
      return { error: "Failed to parse: unknown" };
    }
  }
}
