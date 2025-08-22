import { component$ } from '@builder.io/qwik';

export const PageTitle = component$(({ title }: { title: string }) => (
  <>
    <div class='text-center text-foreground text-lg md:text-2xl lg:text-3xl xl:text-4xl w-full'>
      {title}
    </div>
    <hr class='w-[224px] md:w-[288px] lg:w-[512px] mx-auto' />
  </>
));
