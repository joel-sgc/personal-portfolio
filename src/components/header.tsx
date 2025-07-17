import { Link, useLocation } from '@builder.io/qwik-city';
import ImgGraphic from '~/assets/graphic.webp?jsx';
import { component$ } from '@builder.io/qwik';
import { cn } from '~/utils';

const contactLinks = [
  {
    link: 'mailto:joelsgc-work@outlook.com',
    icon: (
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
        <path d='m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7' />
        <rect x='2' y='4' width='20' height='16' rx='2' />
      </svg>
    ),
  },
  {
    link: 'tel:+1(305)878-9618',
    icon: (
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
        <path d='M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384' />
      </svg>
    ),
  },
  {
    link: 'https://www.linkedin.com/in/joelsgc',
    icon: (
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
        <path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z' />
        <rect width='4' height='12' x='2' y='9' />
        <circle cx='4' cy='4' r='2' />
      </svg>
    ),
  },
  {
    link: 'https://www.github.com/joel-sgc',
    icon: (
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
        <path d='M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4' />
        <path d='M9 18c-4.51 2-5-2-7-2' />
      </svg>
    ),
  },
];

const navigationLinks = [
  {
    link: '/',
    label: 'About Me',
  },
  {
    link: '/my-work',
    label: 'My Work',
  },
  {
    link: '/thoughts',
    label: 'Thoughts',
  },
  {
    link: '/reach-out',
    label: 'Reach Out',
  },
];

export const Header = component$(() => {
  const {
    url: { pathname },
  } = useLocation();

  return (
    <header class='xl:h-[calc(100vh-64px)] xl:sticky xl:top-8 grid grid-cols-[40px_1fr] md:grid-cols-[192px_1fr] lg:grid-cols-[40px_256px_1fr] xl:grid-cols-[256px] xl:grid-rows-[256px_auto_auto_1fr] gap-y-2 lg:gap-y-4 gap-4 md:p-8 xl:p-0 xl:max-w-[256px]'>
      {/* ===== Name ===== */}
      <div class='order-1 xl:order-2 flex max-[344px]:flex-col xl:flex-col w-full col-span-2 lg:col-span-3 xl:col-span-1 text-lg md:text-[18px] md:leading-[22px] lg:text-2xl font-bold justify-center'>
        <span class='max-[344px]:mr-auto xl:mr-auto'>Joel Sebastian</span>
        <span class='whitespace-pre max-[344px]:hidden xl:hidden'> </span>
        <span class='max-[344px]:ml-auto xl:ml-auto'>Gutierrez Cesar</span>
      </div>

      {/* ===== Contact Links ===== */}
      <div class='order-2 md:order-4 lg:order-2 xl:order-4 md:col-span-2 lg:col-span-1 flex items-center justify-between gap-2 flex-col md:flex-row lg:flex-col xl:flex-row xl:items-end'>
        {contactLinks.map((link, i) => (
          <a
            key={i}
            href={link.link}
            class='flex items-center justify-center bg-foreground/5 w-full
            !size-10 rounded-lg'>
            {link.icon}
          </a>
        ))}
      </div>

      {/* ===== Profile Picture ===== */}
      <ImgGraphic class='order-3 md:order-2 lg:order-3 xl:order-1 rounded-2xl' />

      {/* ===== Navigation Links ===== */}
      <nav class='order-4 md:order-3 lg:order-4 xl:order-3 grid max-md:grid-cols-2 max-md:col-span-2 max-md:[&>*:nth-child(even)]:ml-auto xl:flex flex-col xl:gap-8 xl:py-8 xl:border-y xl:border-y-foreground'>
        {navigationLinks.map((link, i) => (
          <Link
            key={i}
            href={link.link}
            class={cn(
              'flex items-center justify-between w-full transition-all',
              (
                link.link === '/' ?
                  link.link === pathname
                : pathname.startsWith(link.link)
              ) ?
                'text-maroon px-0'
              : 'md:px-2 lg:px-4'
            )}>
            <span>&#91;</span>
            <span>{link.label}</span>
            <span>&#93;</span>
          </Link>
        ))}
      </nav>
    </header>
  );
});
