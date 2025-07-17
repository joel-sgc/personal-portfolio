import {
  useLocation,
  routeLoader$,
  type DocumentHead,
} from '@builder.io/qwik-city';
import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';

// 1. Load all MDX modules with glob
const mdxModules = import.meta.glob('/src/assets/blog/*.mdx');

// 2. Loader to prefetch metadata (frontmatter)
export const usePost = routeLoader$(async ({ params, error }) => {
  const slug = params.id;

  const matchKey = Object.keys(mdxModules).find((path) => {
    const file = path
      .split('/')
      .pop()
      ?.replace(/\.mdx$/, '');
    return file === slug;
  });

  if (!matchKey) {
    throw error(404, 'Post not found');
  }

  const mod: any = await mdxModules[matchKey]();
  return {
    frontmatter: mod.frontmatter ?? {},
    modulePath: matchKey,
  };
});

export default component$(() => {
  const location = useLocation();
  const id = location.params.id;
  const post = usePost();
  const ComponentSig = useSignal<ReturnType<any> | null>(null);

  useVisibleTask$(async () => {
    const mod = await mdxModules[post.value.modulePath]();
    ComponentSig.value = (mod as any).default;
  });

  return (
    <article class='border-l-4 border-l-foreground/25 pl-4 [&>img]:xl:!max-w-[512px] [&>img]:xl:!max-h-[512px]'>
      {ComponentSig.value ?
        <ComponentSig.value />
      : <p>Loading…</p>}
    </article>
  );
});

export const head = ({ resolveValue }: { resolveValue: any }): DocumentHead => {
  const post = resolveValue(usePost);

  return {
    title: post.frontmatter.title || 'Untitled Post',
    meta: [
      {
        name: 'description',
        content: post.frontmatter.description || 'A blog post',
      },
    ],
  };
};
