import { DocumentHead } from '@builder.io/qwik-city';
import { component$, Slot } from '@builder.io/qwik';
import { Header } from '~/components/header';
import { Toaster } from 'qwik-sonner';

export default component$(() => {
  return (
    <>
      <Header />
      <main>
        <Slot />
        <Toaster
          toastOptions={{
            class:
              '!bg-background !border-2 !border-foreground/25 !rounded-none !font-mono !whitespace-pre-wrap !gap-4',
          }}
        />
      </main>
    </>
  );
});

export const head: DocumentHead = ({ head }) => {
  return {
    title: `JoelSGC | ${head.title}`,
  };
};
