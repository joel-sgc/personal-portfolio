import { component$, Fragment } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { cn, parseBoldText } from '~/utils';

export type BlogType = {
  title: string;
  description: string;
  createdDate: string; // ISO Date string
  tags: string[];
};

export const BlogComponent = component$(
  ({
    blogEntry,
    class: className,
    link,
  }: {
    blogEntry: BlogType;
    class?: string;
    link: string;
  }) => {
    return (
      <Link
        class={cn(
          'group/item flex flex-col gap-2 border-l-4 border-l-foreground/25 pl-4',
          className
        )}
        href={link}>
        {/* ===== Metadata ===== */}
        <div class='blog-metadata flex flex-col md:flex-row flex-wrap gap-2 lg:gap-x-4'>
          <span class='blog-title group-hover/item:underline order-3 col-span-2 lg:col-span-1 lg:order-2 text-base md:text-lg lg:text-xl'>
            {blogEntry.title}
          </span>
          <span class='blog-date order-2 lg:order-3 text-xs'>
            {blogEntry.createdDate.slice(0, 10)}
          </span>
        </div>

        {/* ===== Project Tags ===== */}
        <div class='flex flex-wrap gap-2'>
          {blogEntry.tags.map((tag, i) => (
            <div
              key={i}
              class='blog-tags text-sm xl:text-base px-2 py-1 md:px-3 md:py-2 border border-foreground/25'>
              {tag}
            </div>
          ))}
        </div>

        {/* ===== Description (Shortened to 4 lines max) ===== */}
        <p class='blog-description text-foreground/75 whitespace-pre-wrap line-clamp-3'>
          {parseBoldText(blogEntry.description).map((val, i) => {
            if (!val.bold) return <Fragment key={i}>{val.string}</Fragment>;
            else return <strong key={i}>{val.string}</strong>;
          })}
        </p>

        <div class='underline text-sm w-fit mt-2'>Read More →</div>
      </Link>
    );
  }
);
