import P from 'parsimmon';

export type T = Result | Error;

export interface Error {
  type: "error";
  error: string;
}

export namespace Parser {
  interface Token {
    type: string;
  }

  interface Query extends Token {
    type: "Query";
    value: string;
  }

  interface Bang extends Token {
    type: "Bang";
    value: string;
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

  interface Result {
    type: "result";
    query: string;
    bangs: string[];
  }

  export const parse = (query: string) => {
    try {
      const tokens = Language.Input.tryParse(query);
      const resolvedQuery = tokens
        .filter(token => token.type == "Query")
        .filter(token => token.value != "")
        .map(token => token.value)
        .join(" ");
      const resolvedBangs = tokens.filter(token => token.type == "Bang").map(token => token.value);

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
  interface T {
    name: string;
    template: string;
  }

  export const resolve = (bang: Bang) => (query: string) : string => {
    return bang.template.replace("<query>", query);
  }
}

export const execute = (_bangs: Bang[]) => (query: string) : Result | Error => {
  const bangs = _bangs.reduce((map, bang) => { map[bang.name] = bang; return map }, {});

  const out = Parser.parse(query);
  if (out.type == "error") {
    return out;
  } else {
    const resolved = out.bangs.map(bang => bangs[bang]);
    if (resolved.filter(bang => bang == undefined).length == 0) {
      return { type: "result", locations: resolved.map(bang => Bang.resolve(bang)(out.query)) }
    } else {
      return { type: "error", error: `Invalid bang in [${out.bangs}]` };
    }
  }
}
