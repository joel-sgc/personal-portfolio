import { component$ } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';
import { PageTitle } from '~/components/page-title';

const mdxModules = import.meta.glob('/src/assets/blog/*.mdx');

export default component$(() => (
  <>
    <PageTitle title="What's on my mind" />
  </>
));

export const head: DocumentHead = {
  title: 'Thoughts',
};
