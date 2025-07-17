import { ProjectComponent, ProjectType } from './project-component';
import { component$, Signal } from '@builder.io/qwik';
import { Modal } from '@qwik-ui/headless';
import { cn } from '~/utils';

export const ProjectModal = component$(
  ({ isOpen, project }: { isOpen: Signal<boolean>; project: ProjectType }) => (
    <Modal.Root bind:show={isOpen} class='modal-root'>
      <Modal.Panel
        class={cn(
          'modal-panel modal-backdrop group/modal focus-visible:!outline-none w-full !max-w-[calc(100%-16px)] md:!max-w-[calc(100%-32px)] xl:!max-w-[768px] bg-background text-foreground/75 flex flex-col gap-4 p-4'
        )}>
        <Modal.Close class='absolute top-4 right-4 bg-transparent p-0 focus-visible:!outline-none aspect-square size-10 text-foreground border-none cursor-pointer'>
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
            <path d='M18 6 6 18' />
            <path d='m6 6 12 12' />
          </svg>
        </Modal.Close>

        <ProjectComponent
          class='pl-0 border-l-0 [&_*.project-image]:w-full [&_*.project-image]:md:max-w-full [&_*.project-image]:lg:max-w-[384px] [&_*.project-description]:xl:!text-lg'
          project={project}
        />
      </Modal.Panel>
    </Modal.Root>
  )
);
