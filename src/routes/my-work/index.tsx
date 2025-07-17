import { ProjectComponent } from '~/components/project-component';
import { ProjectModal } from '~/components/project-modal';
import { component$, useSignal } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';
import { PageTitle } from '~/components/page-title';
import projects from '~/projects.json';
import { cn } from '~/utils';

const filterOptions = {
  all: 'ALL ITEMS',
  comp: 'COMP',
  eeng: 'EENG',
  web: 'WEB',
  other: 'Others',
};

export default component$(() => {
  const filter = useSignal<keyof typeof filterOptions>('all');

  // Variables for modal
  const selectedProject = useSignal<number>(0);
  const isModalOpen = useSignal<boolean>(false);

  return (
    <>
      <PageTitle title="What I've been up to" />

      {/* ===== Filter Buttons ===== */}
      <div class='flex flex-wrap gap-2'>
        {(Object.keys(filterOptions) as (keyof typeof filterOptions)[]).map(
          (option) => (
            <button
              key={option}
              class={cn(
                'secondary cursor-pointer',
                filter.value.includes(option) && 'maroon'
              )}
              onClick$={() => (filter.value = option)}>
              {filterOptions[option]}
            </button>
          )
        )}
      </div>

      {projects
        .filter(
          (project) =>
            filter.value === 'all' || project.category === filter.value
        )
        .map((project, i) => (
          <ProjectComponent
            key={i}
            project={project}
            class='cursor-pointer'
            onClick$={() => {
              if (project.modal) {
                selectedProject.value = i;
                isModalOpen.value = true;
              }
            }}
          />
        ))}

      {/* ===== Project Modal ===== */}
      <ProjectModal
        project={projects[selectedProject.value]}
        isOpen={isModalOpen}
      />
    </>
  );
});

export const head: DocumentHead = {
  title: 'My Work',
};
