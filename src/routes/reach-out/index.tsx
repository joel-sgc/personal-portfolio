import {
  DocumentHead,
  RequestHandler,
  useLocation,
} from '@builder.io/qwik-city';
import { $, component$, useSignal } from '@builder.io/qwik';
import { PageTitle } from '~/components/page-title';
import { toast, Toaster } from 'qwik-sonner';

type ContactForm = {
  name: string;
  email: string;
  homepage?: string;
  subject: string;
  message: string;
};

export const onRequest: RequestHandler = async ({ request, query, json }) => {
  if (query.get('format') === 'json') {
    try {
      const body: ContactForm = await request.json();

      if (body.homepage!.trim() !== '') {
        // Bot caught!
        await new Promise((resolve) => setTimeout(() => resolve(true), 2000));
        json(200, { message: 'Message sent successfully!', error: true });
      }

      // If no bot, proceed
      delete body.homepage;

      // Send request to Notion webhook
      const req = await fetch('https://api.notion.com/v1/pages', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${import.meta.env.NOTION_API_KEY}`,
          'Content-Type': 'application/json',
          'Notion-Version': '2022-06-28',
        },
        body: JSON.stringify({
          parent: { database_id: import.meta.env.NOTION_DB_ID },
          properties: {
            name: {
              title: [
                {
                  text: {
                    content: body.name + '1',
                  },
                },
              ],
            },
            email: {
              email: body.email + '1',
            },
            subject: {
              rich_text: [
                {
                  text: {
                    content: body.subject + '1',
                  },
                },
              ],
            },
            message: {
              rich_text: [
                {
                  text: {
                    content: body.message + '1',
                  },
                },
              ],
            },
          },
        }),
      });

      // An existing ID means all went well, but an error could have a variable response
      if (req.status === 200) {
        // Send push notification
        const request = await fetch(
          `https://ntfy.sh/${import.meta.env.NTFY_TOPIC}`,
          {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
              Authorization: `Bearer ${import.meta.env.NTFY_API_KEY}`,
            },
          }
        );

        const response = await request.json();

        json(200, {
          message: 'Message sent successfully!',
          request: request ?? 'alwkjdwja',
          response: response ?? 'dwlakdjawda',
        });
      } else {
        json(500, { message: 'Something went wrong.\nPlease try again...' });
      }
    } catch (error) {
      console.error(error);
      json(500, { message: 'Something went wrong.\nPlease try again...' });
    }
  }
};

export default component$(() => {
  const location = useLocation();
  const isLoading = useSignal<boolean>(false);

  const onSubmit = $(async (e: SubmitEvent) => {
    e.preventDefault();
    isLoading.value = true;

    const form = e.target as HTMLFormElement;
    const data = Object.fromEntries(new FormData(form).entries());

    const req = await fetch(
      `${location.url.origin}${location.url.pathname}?format=json`,
      {
        method: 'POST',
        body: JSON.stringify(data),
      }
    );

    isLoading.value = false;
    form.reset();

    console.log(req);
    if (req.status === 200) {
      toast.success((await req.json()).message, {
        class: '[&_svg]:!text-[#2c7e70]',
      });
    } else {
      toast.error((await req.json()).message, {
        class: '[&_svg]:!text-maroon',
      });
    }
  });

  return (
    <>
      <PageTitle title="Let's talk!" />

      <p>
        Have a project in mind? Want to collaborate? Or just want to say hello?
        Feel free to reach out using the form below or through any of my contact
        details.
      </p>

      {/* ===== Contact Form ===== */}
      <form
        preventdefault:submit
        onSubmit$={onSubmit}
        class='border-2 border-foreground/25 p-8 pt-4 flex flex-col gap-4'>
        <Toaster
          toastOptions={{
            class:
              '!bg-background !border-2 !border-foreground/25 !rounded-none !font-mono !whitespace-pre-wrap !gap-4',
          }}
        />

        <span class='text-base md:text-lg xl:text-xl'>Send Message</span>

        {/* ===== Name / Email ===== */}
        <div class='flex flex-col lg:flex-row gap-4'>
          <div class='flex flex-col gap-1 flex-1'>
            <label>
              Name <span class='text-red-500'>*</span>
            </label>
            <input
              name='name'
              disabled={isLoading.value}
              // required
              // aria-required
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
              disabled={isLoading.value}
              // required
              // aria-required
              type='email'
              placeholder='johndoe@email.com'
            />
          </div>
        </div>

        {/* ===== Honeypot ===== */}
        <div class='flex flex-col gap-1 absolute -left-[999vw] invisible !h-[0px] overflow-hidden'>
          <label>If you're a human, leave this field blank</label>
          <input
            disabled={isLoading.value}
            tabIndex={-1}
            type='text'
            name='homepage'
            autocomplete='off'
          />
        </div>

        {/* ===== Subject ===== */}
        <div class='flex flex-col gap-1'>
          <label>
            Subject <span class='text-red-500'>*</span>
          </label>
          <input
            name='subject'
            disabled={isLoading.value}
            // required
            // aria-required
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
            disabled={isLoading.value}
            // required
            // aria-required
            placeholder='Say hello. Ask a question. Make it count.'
          />
        </div>

        <button
          type='submit'
          disabled={isLoading.value}
          class='justify-between lg:px-8 lg:not-disabled:hover:px-4 transition-all hover:bg-foreground'>
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
  );
});

export const head: DocumentHead = {
  title: 'Reach Out',
};
