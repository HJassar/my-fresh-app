// routes/search.tsx

/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";

// @deno-types="https://deno.land/x//dist/fuse.d.ts"
import Fuse from "https://deno.land/x/fuse/dist/fuse.esm.min.js";

const NAMES = [
  { name: "Alice" },
  { name: "Bob" },
  { name: "Charlie" },
  { name: "Dave" },
  { name: "Eve" },
  { name: "Frank" },
];

const options = {
  keys: ["name"],
};

const fuse = new Fuse(NAMES, options);

interface Data {
  results: string[];
  query: string;
}

export const handler: Handlers<Data> = {
  GET(req, ctx) {
    const url = new URL(req.url);
    const query = url.searchParams.get("q") || "";
    console.log(fuse.search(query));
    const results = fuse
      .search(query)
      .map((item: { item: { name: string } }) => item.item.name);
    return ctx.render({ results, query });
  },
};

export default function Page({ data }: PageProps<Data>) {
  const { results, query } = data;
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input type="text" name="q" value={query} />
        <button type="submit">Search</button>
      </form>
      <ul>
        {results.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </div>
  );
}
