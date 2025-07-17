import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { routeLoader$, type DocumentHead } from '@builder.io/qwik-city';

const mdxModules = import.meta.glob('/src/assets/blog/*.mdx');

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
  const post = usePost();
  const ComponentSig = useSignal<ReturnType<any> | null>(null);

  useVisibleTask$(async () => {
    const mod = await mdxModules[post.value.modulePath]();
    ComponentSig.value = (mod as any).default;
  });

  const {
    title,
    // description,
    createdDate,
    tags,
  }: {
    title: string;
    description: string;
    createdDate: string;
    tags: string[];
  } = post.value.frontmatter;

  return (
    <article class='border-l-4 border-l-foreground/25 pl-4 [&>img]:xl:!max-w-[512px] [&>img]:xl:!max-h-[512px]'>
      {ComponentSig.value ?
        <>
          <div class='flex flex-col'>
            <h1 class='col-span-2'>{title}</h1>
            <div class='flex gap-2 flex-wrap items-center'>
              <span class='mr-2'>{createdDate}</span>
              {tags.map((tag, i) => (
                <div
                  key={i}
                  class='project-tags text-sm xl:text-base px-2 py-1 md:px-3 md:py-2 border border-foreground/25'>
                  {tag}
                </div>
              ))}
            </div>

            <hr class='col-span-2 mt-4' />
          </div>
          <ComponentSig.value />
        </>
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
