import { DocumentHead } from '@builder.io/qwik-city';
import { PageTitle } from '~/components/page-title';
import { component$ } from '@builder.io/qwik';

type ContactForm = {
  name: string;
  email: string;
  homepage?: string; // Honeypot
  subject: string;
  message: string;
};

export default component$(() => (
  <>
    <PageTitle title="Let's talk!" />

    <p>
      Have a project in mind? Want to collaborate? Or just want to say hello?
      Feel free to reach out using the form below or through any of my contact
      details.
    </p>

    {/* ===== Contact Form ===== */}
    <form class='border-2 border-foreground/25 p-8 flex flex-col gap-4'>
      <span class='text-base md:text-lg xl:text-xl'>Send Message</span>

      {/* ===== Name / Email ===== */}
      <div class='flex flex-col lg:flex-row gap-4'>
        <div class='flex flex-col gap-1 flex-1'>
          <label>
            Name <span class='text-red-500'>*</span>
          </label>
          <input
            name='name'
            required
            aria-required
            type='text'
            placeholder='e.g. John Doe'
          />
        </div>
        <div class='flex flex-col gap-1 flex-1'>
          <label>
            Email <span class='text-red-500'>*</span>
          </label>
          <input
            name='email'
            required
            aria-required
            type='text'
            placeholder='johndoe@email.com'
          />
        </div>
      </div>

      {/* ===== Honeypot ===== */}
      <div class='flex flex-col gap-1 absolute -left-[999vw] invisible !h-[0px] overflow-hidden'>
        <label>If you're a human, leave this field blank</label>
        <input tabIndex={-1} type='text' name='homepage' autocomplete='off' />
      </div>

      {/* ===== Subject ===== */}
      <div class='flex flex-col gap-1'>
        <label>
          Subject <span class='text-red-500'>*</span>
        </label>
        <input
          name='subject'
          required
          aria-required
          type='text'
          placeholder="Reason you're writing"
        />
      </div>

      {/* ===== Message ===== */}
      <div class='flex flex-col gap-1'>
        <label>
          Message <span class='text-red-500'>*</span>
        </label>
        <textarea
          name='message'
          rows={4}
          required
          aria-required
          placeholder='Say hello. Ask a question. Make it count.'
        />
      </div>

      <button
        type='submit'
        class='justify-between lg:px-8 lg:hover:px-4 transition-all hover:bg-foreground'>
        <span>&#91;</span>
        <span>Send Message</span>
        <span>&#93;</span>
      </button>
    </form>

    {/* ===== Contact Info Cards ===== */}
    <div class='flex flex-col gap-4 p-4 border-2 border-foreground/25 [&_a]:hover:underline'>
      <span class='text-md md:text-lg xl:text-xl'>Contact Info</span>
      <span class='text-sm md:text-base text-foreground'>
        <span class='text-foreground/75'>Email:</span>{' '}
        <a href='mailto:joelsgc-work@outlook.com' target='_blank'>
          joelsgc-work@outlook.com
        </a>
      </span>
      <span class='text-sm md:text-base text-foreground'>
        <span class='text-foreground/75'>Phone:</span>{' '}
        <a href='tel:+1(305)878-9618' target='_blank'>
          +1 (305) 878-9618
        </a>
      </span>
      <span class='text-sm md:text-base text-foreground'>
        <span class='text-foreground/75'>LinkedIn:</span>{' '}
        <a href='https://www.github.com/joel-sgc' target='_blank'>
          github.com/joel-sgc
        </a>
      </span>
      <span class='text-sm md:text-base text-foreground'>
        <span class='text-foreground/75'>Github:</span>{' '}
        <a href='https://www.linkedin.com/in/joelsgc' target='_blank'>
          linkedin.com/in/joelsgc
        </a>
      </span>
    </div>

    <div class='flex flex-col gap-4 p-4 border-2 border-foreground/25'>
      <span class='text-md md:text-lg xl:text-xl'>Response Time</span>
      <p class='text-sm md:text-base'>
        I typically respond within 24-48 hours. For urgent matters, please
        mention it in your subject line.
      </p>
    </div>
  </>
));

export const head: DocumentHead = {
  title: 'Reach Out',
};
