import { ProjectComponent } from '~/components/project-component';
import { ProjectModal } from '~/components/project-modal';
import { Link, routeLoader$, type DocumentHead } from '@builder.io/qwik-city';
import { component$, useSignal } from '@builder.io/qwik';
import { PageTitle } from '~/components/page-title';
import projects from '~/projects.json';

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
  const selectedProject = useSignal<number>(0);
  const isModalOpen = useSignal<boolean>(false);
  const { value: blogEntries } = useBlogList();

  return (
    <>
      {/* ===== Introduction ===== */}
      <PageTitle title='Nice to meet you!' />
      <p>Hello, and welcome to my portfolio! For some background on me:</p>

      {/* ===== About Me Facts ===== */}
      <ul>
        <li>
          My name is <strong>Joel Gutierrez</strong>
        </li>
        <li>
          I&apos;m a proud supporter of one&apos;s{' '}
          <strong>Right To Repair</strong>
        </li>
        <li>I live for challenges and puzzles</li>
        <li>I once ate 13 tacos in one sitting... No regrets</li>
        <li>
          And my go-to party trick is solving a Rubik&apos;s cube in under 30
          seconds
        </li>
      </ul>

      {/* ===== Current Status ===== */}
      <div>
        <p>At this very moment, I am:</p>
        <ul>
          <li>
            A student at the{' '}
            <span class='text-maroon font-bold'>
              Arrupe College of Loyola University of Chicago
            </span>
          </li>
        </ul>
      </div>

      {/* ===== Projects Showoff ===== */}
      <div class='space-y-2'>
        <p>Some projects of my latest projects are:</p>
        {projects.slice(0, 2).map((project, i) => (
          <ProjectComponent
            key={i}
            project={project}
            class='[&>*.project-image]:hidden cursor-pointer'
            onClick$={() => {
              selectedProject.value = i;
              isModalOpen.value = true;
            }}
          />
        ))}

        <ProjectModal
          project={projects[selectedProject.value]}
          isOpen={isModalOpen}
        />
      </div>

      <div class='flex flex-col gap-2'>
        <p>
          Below are some blog posts where I document what I&apos;m building,
          breaking, and figuring out:
        </p>

        <div>
          {blogEntries.map((entry, i) => (
            <Link
              key={i}
              href={`/thoughts/${entry.slug}`}
              class='px-2 py-1 grid grid-cols-[24px_1fr] items-center gap-4 border-t last:border-y border-y-foreground'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                stroke-width='2'
                stroke-linecap='round'
                stroke-linejoin='round'>
                <path d='m9 18 6-6-6-6' class='!size-6' />
              </svg>

              <span class='line-clamp-2 lg:line-clamp-1'>
                <span class='font-bold capitalize text-base md:text-lg'>
                  {entry.title}
                </span>{' '}
                <span class='text-sm md:text-base'>{entry.description}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'About Me',
};
