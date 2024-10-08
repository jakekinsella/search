import P from 'parsimmon';

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

export namespace Parser {
  export const Language = P.createLanguage({
    Query: (r) => P.alt(
      r.QuotedQuery,
      P.regexp(/[^!"]+/).map(x => ({ type: "Query", value: x }))
    ),
    QuotedQuery: () =>
      P.regexp(/"[^"]*"/).map(x => ({ type: "Query", value: x })),
    Bang: () => P.string("!").then(P.regexp(/[^ ]+/).map(x => ({ type: "Bang", value: x }))),

    Input: (r) => P.alt(r.Query, r.Bang).many(),
  });

  export const parse = (query) => {
    // TODO: JK
    return Language.Input.tryParse(query)
  }
}
