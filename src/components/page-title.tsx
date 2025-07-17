import { component$ } from '@builder.io/qwik';

export const PageTitle = component$(({ title }: { title: string }) => (
  <>
    <h1 class='text-center text-foreground'>{title}</h1>
    <hr class='w-[224px] md:w-[288px] lg:w-[512px] mx-auto' />
  </>
));
