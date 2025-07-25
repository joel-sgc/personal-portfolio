import { DocumentHead } from '@builder.io/qwik-city';
import { component$, Slot } from '@builder.io/qwik';
import { Header } from '~/components/header';

export default component$(() => {
  return (
    <>
      <Header />
      <main>
        <Slot />
      </main>
    </>
  );
});

export const head: DocumentHead = ({ head }) => {
  return {
    title: `JoelSGC | ${head.title}`,
  };
};
