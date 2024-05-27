export const pageView = (url: URL) => {
  window.gtag('config', process.env.NEXT_PUBLIC_GA_TRACKING_ID!, {
    page_path: url,
  });
};
