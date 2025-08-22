import { DocumentHead, routeLoader$ } from '@builder.io/qwik-city';
import { PageTitle } from '~/components/page-title';
import { component$ } from '@builder.io/qwik';
import { BlogComponent } from '~/components/blog-component';

export const useBlogList = routeLoader$(async () => {
  const mdxModules = import.meta.glob('/src/assets/blog/*.mdx');
  const posts: {
    title: string;
    description: string;
    createdDate: string;
    tags: string[];
    slug: string;
  }[] = [];

  for (const path in mdxModules) {
    const mod: any = await mdxModules[path]();
    const fileName = path.split('/').pop()!;
    const slug = fileName.replace(/\.mdx$/, '');

    posts.push({
      ...mod.frontmatter,
      title: mod.frontmatter?.title || slug,
      description: mod.frontmatter?.description || '',
      slug,
    });
  }

  // Sort newest first (if you add dates later)
  return posts;
});

export default component$(() => {
  const { value: blogEntries } = useBlogList();

  return (
    <>
      <PageTitle title="What's on my mind" />

      {/* ===== Blog Entries ===== */}
      <div class='flex flex-col gap-4'>
        {blogEntries.map((entry, i) => (
          <BlogComponent
            key={i}
            blogEntry={entry}
            link={`/thoughts/${entry.slug}`}
          />
        ))}
      </div>
    </>
  );
});
