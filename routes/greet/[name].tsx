// routes/greet/[name].tsx

/** @jsx h */
import { h } from "preact";
import { PageProps } from "$fresh/server.ts";
import { tw } from "@twind";

export default function GreetPage({ params }: PageProps) {
  const { name } = params;
  return (
    <main>
      <p class={tw`m-6`}>Greeting to you, {name}!</p>
    </main>
  );
}
