import { component$, Fragment, QRL } from '@builder.io/qwik';
import { cn, getImage, parseBoldText } from '~/utils';

export type ProjectType = {
  hidden: boolean;
  image: string | null;
  title: string;
  category: string;
  type: string;
  createdDate: string; // ISO Date string
  modifiedDate: string; // ISO Date string
  description: string;
  link?: string;
  tags: string[];
  modal: boolean;
};

export const ProjectComponent = component$(
  ({
    project,
    class: className,
    onClick$,
  }: {
    project: ProjectType;
    class?: string;
    onClick$?: QRL<() => any>;
  }) => {
    const imageSrc = project.image ? getImage(project.image) : null;

    return (
      <div
        class={cn(
          'group/item flex flex-col gap-2 border-l-4 border-l-foreground/25 pl-4',
          className
        )}
        onClick$={onClick$}>
        {/* ===== Metadata ===== */}
        <div class='project-metadata grid grid-cols-[auto_1fr] lg:grid-cols-[auto_auto_1fr] items-center gap-2 lg:gap-x-4'>
          <div class='project-type order-1 text-sm md:text-base px-3 py-2 border border-foreground/25 text-foreground'>
            {project.type}
          </div>
          <span class='project-title group-hover/item:underline order-3 col-span-2 lg:col-span-1 lg:order-2 text-base md:text-lg xl:text-xl'>
            {project.title}
          </span>
          <span class='project-date order-2 lg:order-3 text-xs'>
            {project.modifiedDate.slice(0, 7)}
          </span>
        </div>

        {/* ===== Image (If Applicable) ===== */}
        {!!imageSrc && (
          <img
            src={imageSrc}
            alt='Project Image'
            width={256}
            height={256}
            class='project-image w-full md:max-w-[384px]'
          />
        )}

        {/* ===== Description (Shortened to 4 lines max) ===== */}
        <p class='project-description text-foreground/75 whitespace-pre-wrap line-clamp-4 group-[&.modal-panel]/modal:line-clamp-none'>
          {parseBoldText(project.description).map((val, i) => {
            if (!val.bold) return <Fragment key={i}>{val.string}</Fragment>;
            else return <strong key={i}>{val.string}</strong>;
          })}
        </p>

        {/* ===== Project Tags ===== */}
        <div class='flex flex-wrap gap-2'>
          {project.tags.map((tag, i) => (
            <div
              key={i}
              class='project-tags text-sm xl:text-base px-2 py-1 md:px-3 md:py-2 border border-foreground/25'>
              {tag}
            </div>
          ))}
        </div>

        {/* ===== View Project Link ===== */}
        {!!project.link && (
          <a
            href={project.link}
            target='_blank'
            class='hidden group-[&.modal-panel]/modal:block underline text-sm w-fit mt-4'>
            View Project →
          </a>
        )}
      </div>
    );
  }
);
