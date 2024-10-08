import { Parser } from './search';

it('simple query', () => {
  expect(Parser.Language.Input.tryParse("foobar"))
    .toEqual([
      { type: "Query", value: "foobar" }
    ]);
});

it('simple query with bang at end', () => {
  expect(Parser.Language.Input.tryParse("foobar !google"))
    .toEqual([
      { type: "Query", value: "foobar " },
      { type: "Bang", value: "google" }
    ]);
});

it('simple query with bang at beginning', () => {
  expect(Parser.Language.Input.tryParse("!google foobar"))
    .toEqual([
      { type: "Bang", value: "google" },
      { type: "Query", value: " foobar" }
    ]);
});

it('empty query', () => {
  expect(Parser.Language.Input.tryParse(""))
    .toEqual([]);
});

it('empty bang', () => {
  expect(() => Parser.Language.Input.tryParse("foobar ! garbage")).toThrow();
});

it('empty query and bang', () => {
  expect(() => Parser.Language.Input.tryParse("!")).toThrow();
});


it('query/bang mix', () => {
  expect(Parser.Language.Input.tryParse("foobar !google again"))
    .toEqual([
      { type: "Query", value: "foobar " },
      { type: "Bang", value: "google" },
      { type: "Query", value: " again" },
    ]);
});

it('query/bang mix 2', () => {
  expect(Parser.Language.Input.tryParse("!yahoo foobar !google again !amazon"))
    .toEqual([
      { type: "Bang", value: "yahoo" },
      { type: "Query", value: " foobar " },
      { type: "Bang", value: "google" },
      { type: "Query", value: " again " },
      { type: "Bang", value: "amazon" },
    ]);
});

it('quoted query', () => {
  expect(Parser.Language.Input.tryParse("\"foobar\""))
    .toEqual([
      { type: "Query", value: "\"foobar\"" }
    ]);
});

it('quoted query 2', () => {
  expect(Parser.Language.Input.tryParse("foo \"\" bar"))
    .toEqual([
      { type: "Query", value: "foo " },
      { type: "Query", value: "\"\"" },
      { type: "Query", value: " bar" },
    ]);
});

it('quoted query with bang', () => {
  expect(Parser.Language.Input.tryParse("\"foobar !garbage\""))
    .toEqual([
      { type: "Query", value: "\"foobar !garbage\"" },
    ]);
});

it('quoted query with bang 2', () => {
  expect(Parser.Language.Input.tryParse("\"foobar !garbage\"!google"))
    .toEqual([
      { type: "Query", value: "\"foobar !garbage\"" },
      { type: "Bang", value: "google" }
    ]);
});
