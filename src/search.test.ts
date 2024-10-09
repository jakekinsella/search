import { Parser } from './search';

it('simple query with bang at end', () => {
  expect(Parser.parse("foobar !google"))
    .toEqual({
      query: "foobar",
      bangs: ["google"]
    });
});

it('simple query with bang at beginning', () => {
  expect(Parser.parse("!google foobar"))
    .toEqual({
      query: "foobar",
      bangs: ["google"]
    });
});

it('empty query', () => {
  expect(Parser.parse(""))
    .toEqual({
      error: "Failed to parse: empty query"
    });
});

it('empty bang', () => {
  expect(Parser.parse("foobar ! garbage"))
    .toEqual({
      error: "Failed to parse: unknown"
    });
});

it('empty query and bang', () => {
  expect(Parser.parse("!"))
    .toEqual({
      error: "Failed to parse: unknown"
    });
});


it('query/bang mix', () => {
  expect(Parser.parse("foobar !google again"))
    .toEqual({
      query: "foobar again",
      bangs: ["google"]
    });
});

it('query/bang mix 2', () => {
  expect(Parser.parse("!yahoo foobar !google again !amazon"))
    .toEqual({
      query: "foobar again",
      bangs: ["yahoo", "google", "amazon"]
    });
});

it('quoted query', () => {
  expect(Parser.parse("\"foobar\" !ignore"))
    .toEqual({
      query: "\"foobar\"",
      bangs: ["ignore"]
    });
});

it('quoted query 2', () => {
  expect(Parser.parse("foo \"\" bar !ignore"))
    .toEqual({
      query: "foo \"\" bar",
      bangs: ["ignore"]
    });
});

it('quoted query with bang', () => {
  expect(Parser.parse("\"foobar !garbage\" !google"))
    .toEqual({
      query: "\"foobar !garbage\"",
      bangs: ["google"]
    });
});

it('quoted query with bang 2', () => {
  expect(Parser.parse("\"foobar !garbage\"!google"))
    .toEqual({
      query: "\"foobar !garbage\"",
      bangs: ["google"]
    });
});

it('quoted query with escape', () => {
  expect(Parser.parse("\"foobar\\\"\" !ignore"))
    .toEqual({
      query: "\"foobar\\\"\"",
      bangs: ["ignore"]
    });
});
