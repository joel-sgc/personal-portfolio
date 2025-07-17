import { ProjectComponent } from '~/components/project-component';
import { ProjectModal } from '~/components/project-modal';
import { type DocumentHead } from '@builder.io/qwik-city';
import { component$, useSignal } from '@builder.io/qwik';
import { PageTitle } from '~/components/page-title';
import projects from '~/projects.json';

export default component$(() => {
  const selectedProject = useSignal<number>(0);
  const isModalOpen = useSignal<boolean>(false);

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
        <p>Some projects I&apos; m actively working on are:</p>
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

        <div></div>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'About Me',
};
