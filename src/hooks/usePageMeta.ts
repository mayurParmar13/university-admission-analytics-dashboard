import { useEffect } from "react";

interface PageMetaOptions {
  title: string;
  description?: string;
}

const usePageMeta = ({ title, description }: PageMetaOptions) => {
  useEffect(() => {
    document.title = `${title} | University Admin Portal`;

    if (description) {
      const metaDescription = document.querySelector(
        'meta[name="description"]',
      );

      if (metaDescription) {
        metaDescription.setAttribute("content", description);
      }
    }
  }, [title, description]);
};

export default usePageMeta;
