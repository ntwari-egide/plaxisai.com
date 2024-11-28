/**
 * @author: Egide Ntwali
 * @description: The SEO component, It is used to manage the SEO of the website and the pages
 * @par am {SeoProps} props The props of the SEO component
 * @param {string} date The date of the SEO component
 * @param {string} templateTitle The template title of the SEO component
 * @returns {JSX.Element} The SEO component
 */

import Head from 'next/head';
import { useRouter } from 'next/router';

const defaultMeta = {
  title: 'Plaxis AI | AI powered job search engine',
  siteName: 'Plaxis AI',
  description:
    'Plaxis AI is an AI powered job search engine that helps you find the best jobs in any industry. We use machine learning to match you with the best jobs based on your skills and experience.',
  /** Without additional '/' on the end, e.g. https://theodorusclarence.com */
  url: 'https://plaxisai.com',
  type: 'website',
  robots: 'follow, index',
  /**
   * No need to be filled, will be populated with openGraph function
   * If you wish to use a normal image, just specify the path below
   */
  image:
    'https://res.cloudinary.com/dpqasrwfu/image/upload/v1732817531/bdbc9gzv4homuk8xkk1v.png',
};

type SeoProps = {
  date?: string;
  templateTitle?: string;
} & Partial<typeof defaultMeta>;

export default function Seo(props: SeoProps) {
  const router = useRouter();
  const meta = {
    ...defaultMeta,
    ...props,
  };
  meta['title'] = props.templateTitle
    ? `${props.templateTitle} | ${meta.siteName} - AI powered resume job matching engine`
    : meta.title;

  return (
    <Head>
      <title>{meta.title}</title>
      <meta
        name='title'
        content='Plaxis AI | AI powered resume job matching engine'
      />
      {/* Description */}
      <meta
        name='description'
        content='Plaxis AI is an AI powered job search engine that helps you find the best jobs in any industry. We use machine learning to match you with the best jobs based on your skills and experience.'
      />
      {/* Keywords */}
      <meta
        name='keywords'
        content='Plaxis AI, job search engine, AI powered job search engine, tech jobs, machine learning, job matching, job search, job search platform, job search website, job search app, job search tool, job search service, job search software, job search technology, job search company, job search site, job search engine website, job search engine app, job search engine tool, job search engine service, job search engine software, job search engine technology, job search engine company, job search engine site, job search engine platform, job search engine website, job search engine app, job search engine tool, job search engine service, job search engine software, job search engine technology, job search engine company, job search engine site, job search engine platform, job search engine website, job search engine app, job search engine tool, job search engine service, job search engine software, job search engine technology, job search engine company, job search engine site, job search engine platform'
      />
      {/* Author */}
      <meta name='author' content='Egide Ntwari' />
      <meta name='robots' content={meta.robots} />
      <meta content={meta.description} name='description' />
      <meta property='og:url' content={`${meta.url}${router.asPath}`} />
      <link rel='canonical' href={`${meta.url}${router.asPath}`} />
      {/* Open Graph */}
      <meta property='og:type' content={meta.type} />
      <meta property='og:site_name' content={meta.siteName} />
      <meta property='og:description' content={meta.description} />
      <meta property='og:title' content={meta.title} />
      <meta name='image' property='og:image' content={meta.image} />
      {/* Twitter */}
      <meta name='twitter:card' content='summary_large_image' />
      {/* // !STARTERCONF Remove or change to your handle */}
      {/* <meta name='twitter:site' content='@th_clarence' /> */}
      <meta name='twitter:title' content={meta.title} />
      <meta name='twitter:description' content={meta.description} />
      <meta name='twitter:image' content={meta.image} />
      {meta.date && (
        <>
          <meta property='article:published_time' content={meta.date} />
          <meta
            name='publish_date'
            property='og:publish_date'
            content={meta.date}
          />
          {/* // !STARTERCONF Remove or change to your name */}
          <meta
            name='author'
            property='article:author'
            content='Egide Ntwari'
          />
        </>
      )}

      {/* Favicons */}
      {favicons.map((linkProps) => (
        <link key={linkProps.href} {...linkProps} />
      ))}
      <meta name='msapplication-TileColor' content='#ffffff' />
      <meta name='msapplication-config' content='/favicon/browserconfig.xml' />
      <meta name='theme-color' content='#ffffff' />
    </Head>
  );
}

// !STARTERCONF this is the default favicon, you can generate your own from https://realfavicongenerator.net/
// ! then replace the whole /public/favicon folder and favicon.ico
const favicons: Array<React.ComponentPropsWithoutRef<'link'>> = [
  {
    rel: 'apple-touch-icon',
    sizes: '180x180',
    href: '/favicon/apple-touch-icon.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '32x32',
    href: '/favicon/favicon-32x32.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '16x16',
    href: '/favicon/favicon-16x16.png',
  },
  { rel: 'manifest', href: '/favicon/site.webmanifest' },
  {
    rel: 'mask-icon',
    href: '/favicon/safari-pinned-tab.svg',
    color: '#00e887',
  },
  { rel: 'shortcut icon', href: '/favicon/favicon.ico' },
];
