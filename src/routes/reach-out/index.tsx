import { component$ } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';
import { PageTitle } from '~/components/page-title';

export default component$(() => (
  <>
    <PageTitle title="Let's talk!" />
  </>
));

export const head: DocumentHead = {
  title: 'Reach Out',
};
