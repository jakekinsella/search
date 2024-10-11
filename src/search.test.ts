import { execute, Parser } from './search';

it('simple query with bang at end', () => {
  expect(Parser.parse("foobar !google"))
    .toEqual({
      type: "result",
      query: "foobar",
      bangs: ["google"]
    });
});

it('simple query with bang at beginning', () => {
  expect(Parser.parse("!google foobar"))
    .toEqual({
      type: "result",
      query: "foobar",
      bangs: ["google"]
    });
});

it('empty query', () => {
  expect(Parser.parse(""))
    .toEqual({
      type: "error",
      error: "Failed to parse: empty query"
    });
});

it('empty bang', () => {
  expect(Parser.parse("foobar ! garbage"))
    .toEqual({
      type: "error",
      error: "Failed to parse: unknown"
    });
});

it('empty query and bang', () => {
  expect(Parser.parse("!"))
    .toEqual({
      type: "error",
      error: "Failed to parse: unknown"
    });
});


it('query/bang mix', () => {
  expect(Parser.parse("foobar !google again"))
    .toEqual({
      type: "result",
      query: "foobar again",
      bangs: ["google"]
    });
});

it('query/bang mix 2', () => {
  expect(Parser.parse("!yahoo foobar !google again !amazon"))
    .toEqual({
      type: "result",
      query: "foobar again",
      bangs: ["yahoo", "google", "amazon"]
    });
});

it('quoted query', () => {
  expect(Parser.parse("\"foobar\" !ignore"))
    .toEqual({
      type: "result",
      query: "\"foobar\"",
      bangs: ["ignore"]
    });
});

it('quoted query 2', () => {
  expect(Parser.parse("foo \"\" bar !ignore"))
    .toEqual({
      type: "result",
      query: "foo \"\" bar",
      bangs: ["ignore"]
    });
});

it('quoted query with bang', () => {
  expect(Parser.parse("\"foobar !garbage\" !google"))
    .toEqual({
      type: "result",
      query: "\"foobar !garbage\"",
      bangs: ["google"]
    });
});

it('quoted query with bang 2', () => {
  expect(Parser.parse("\"foobar !garbage\"!google"))
    .toEqual({
      type: "result",
      query: "\"foobar !garbage\"",
      bangs: ["google"]
    });
});

it('quoted query with escape', () => {
  expect(Parser.parse("\"foobar\\\"\" !ignore"))
    .toEqual({
      type: "result",
      query: "\"foobar\\\"\"",
      bangs: ["ignore"]
    });
});

it('simple search', () => {
  expect(execute([ { name: "google", template: "https://www.google.com/search?q=<query>" } ])("foobar !google"))
    .toEqual({
      type: "result",
      locations: ["https://www.google.com/search?q=foobar"]
    })
})

it('search to bad bang', () => {
  expect(execute([])("foobar !amazon"))
    .toEqual({
      type: "error",
      error: "Invalid bang in [amazon]"
    })
})

it('multi search', () => {
  expect(execute([
    { name: "google", template: "https://www.google.com/search?q=<query>" },
    { name: "amazon", template: "https://www.amazon.com/s?k=<query>" }
  ])("foobar !google !amazon"))
    .toEqual({
      type: "result",
      locations: ["https://www.google.com/search?q=foobar", "https://www.amazon.com/s?k=foobar"]
    })
})
