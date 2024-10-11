import P from 'parsimmon';

export type T = Result | Error;

export interface Result {
  type: "result";
  locations: string[];
}

export interface Error {
  type: "error";
  error: string;
}

export namespace Parser {
  export type T = Result | Error;

  interface Result {
    type: "result";
    query: string;
    bangs: string[];
  }

  namespace Token {
    export interface T {
      type: string;
    }

    export interface Query extends T {
      type: "Query";
      value: string;
    }

    export interface Bang extends T {
      type: "Bang";
      value: string;
    }
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

  export const parse = (query: string): T => {
    try {
      const tokens = Language.Input.tryParse(query);
      const resolvedQuery = tokens
        .filter((token: Token.T) => token.type == "Query")
        .filter((token: Token.Query) => token.value != "")
        .map((token: Token.Query) => token.value)
        .join(" ");
      const resolvedBangs = tokens.filter((token: Token.T) => token.type == "Bang").map((token: Token.Bang) => token.value);

      if (resolvedQuery == "") {
        return { type: "error", error: "Failed to parse: empty query" };
      } else if (resolvedBangs.length == 0) {
        return { type: "error", error: "Failed to parse: empty bangs" };
      } else {
        return { type: "result", query: resolvedQuery, bangs: resolvedBangs };
      }
    } catch (e) {
      console.log(e)
      return { type: "error", error: "Failed to parse: unknown" };
    }
  }
}

namespace Bang {
  export interface T {
    name: string;
    template: string;
  }

  export const resolve = (bang: T) => (query: string): string => {
    return bang.template.replace("<query>", query);
  }
}

export const execute = (_bangs: Bang.T[]) => (query: string): T => {
  const bangs = _bangs.reduce((map, bang) => { map.set(bang.name, bang); return map }, new Map<string, Bang.T>);

  const out = Parser.parse(query);
  if (out.type == "error") {
    return out;
  } else {
    const resolved = out.bangs
      .map(bang => bangs.get(bang))
      .reduce((acc, bang) => { if (bang != undefined) { acc.push(bang) }; return acc }, [] as Bang.T[]);
    if (out.bangs.length == resolved.length) {
      return { type: "result", locations: resolved.map(bang => Bang.resolve(bang)(out.query)) }
    } else {
      return { type: "error", error: `Invalid bang in [${out.bangs}]` };
    }
  }
}
