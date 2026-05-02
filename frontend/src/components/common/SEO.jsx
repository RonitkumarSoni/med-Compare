import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'MedCompare';
const SITE_URL =
  import.meta.env.VITE_SITE_URL || 'https://med-compare.vercel.app';

const Seo = ({
  title,
  description,
  path = '/',
  noIndex = false,
}) => {
  const canonicalUrl = new URL(path, SITE_URL).toString();
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const robots = noIndex ? 'noindex, nofollow' : 'index, follow';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

export default Seo;
