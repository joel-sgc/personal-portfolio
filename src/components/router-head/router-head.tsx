import { component$ } from '@builder.io/qwik';
import { useDocumentHead, useLocation } from '@builder.io/qwik-city';

/**
 * The RouterHead component is placed inside of the document `<head>` element.
 */
export const RouterHead = component$(() => {
  const head = useDocumentHead();
  const loc = useLocation();

  return (
    <>
      <title>{head.title}</title>

      <link rel='canonical' href={loc.url.href} />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <link rel='icon' type='image/svg+xml' href='/favicon.ico' />

      {/* Meta tags */}
      {head.meta.map((m) => (
        <meta key={m.key} {...m} />
      ))}

      {/* Link tags for prefetching */}
      {head.links.map((l) => (
        <link key={l.key} {...l} />
      ))}

      {/* Style tags */}
      {head.styles.map((s) => (
        <style
          key={s.key}
          {...s.props}
          {...(s.props?.dangerouslySetInnerHTML ?
            {}
          : { dangerouslySetInnerHTML: s.style })}
        />
      ))}

      {/* General Scripts and Google Structured Data (JSON-LD) */}
      {head.scripts.map((s) => (
        <script
          key={s.key}
          {...s.props}
          {...(s.props?.dangerouslySetInnerHTML ?
            {}
          : { dangerouslySetInnerHTML: s.script })}
        />
      ))}
    </>
  );
});
