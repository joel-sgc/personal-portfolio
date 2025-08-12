import { DocumentHead } from '@builder.io/qwik-city';
import { component$, Slot } from '@builder.io/qwik';
import { Header } from '~/components/header';

export default component$(() => {
  return (
    <>
      <Header />
      <main>
        <Slot />
      </main>
    </>
  );
});

export const head: DocumentHead = {
  // 1. Title now perfectly matches your H1 and personal brand.
  title: 'Joel Gutierrez | Software Developer & Digital Creator',
  meta: [
    {
      name: 'description',
      // 2. Description is now in the first person, making it a portfolio.
      content:
        'The portfolio of Joel Gutierrez, a Chicago-based software developer and digital creator specializing in responsive web design, API integrations, and modern animations.',
    },
    {
      name: 'author',
      content: 'Joel Gutierrez',
    },
    {
      name: 'robots',
      content: 'index, follow',
    },
    {
      name: 'keywords',
      // Keywords aligned with a personal portfolio and job search.
      content:
        'Joel Gutierrez, software developer portfolio, web developer Chicago, student developer, Loyola University Chicago, React developer, front-end developer, freelance developer, digital creator',
    },

    // --- OpenGraph (for social sharing) ---
    {
      property: 'og:type',
      content: 'profile', // 'profile' is more accurate for a personal portfolio
    },
    {
      property: 'og:url',
      content: 'https://www.joelsgc.dev/',
    },
    {
      // 3. Use the EXACT same title.
      property: 'og:title',
      content: 'Joel Gutierrez | Software Developer & Digital Creator',
    },
    {
      property: 'og:description',
      content:
        'The portfolio of Joel Gutierrez, a Chicago-based software developer and digital creator.',
    },
    {
      property: 'og:image',
      content: 'https://www.joelsgc.dev/og.webp',
    },
    {
      // Using 'JoelSGC' here is fine, as it's the name of the site/domain.
      property: 'og:site_name',
      content: 'JoelSGC',
    },

    // --- Twitter Card ---
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      // 4. Use the EXACT same title.
      name: 'twitter:title',
      content: 'Joel Gutierrez | Software Developer & Digital Creator',
    },
    {
      name: 'twitter:description',
      content:
        'The portfolio of Joel Gutierrez, a Chicago-based software developer and digital creator.',
    },
    {
      name: 'twitter:image',
      content: 'https://www.joelsgc.dev/og.webp',
    },
  ],
  scripts: [
    {
      props: {
        type: 'application/ld+json',
      },
      // 5. Use a more specific 'ProfilePage' schema for a portfolio.
      script: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        mainEntity: {
          '@type': 'Person',
          name: 'Joel Gutierrez',
          alternateName: 'JoelSGC',
          url: 'https://www.joelsgc.dev/',
          jobTitle: 'Software Developer & Digital Creator',
          worksFor: {
            '@type': 'Organization',
            name: 'JoelSGC Industries',
          },
          alumniOf: {
            '@type': 'CollegeOrUniversity',
            name: 'Arrupe College of Loyola University Chicago',
          },
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Chicago',
            addressRegion: 'IL',
          },
        },
        image: 'https://www.joelsgc.dev/og.webp',
      }),
    },
  ],
};
