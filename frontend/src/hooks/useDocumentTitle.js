import { useEffect } from 'react';

export const useDocumentTitle = (title, description) => {
  useEffect(() => {
    // Set title
    if (title) {
      document.title = title;
    }

    // Set meta description
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
      }
      
      metaDescription.content = description;
    }

    // Cleanup
    return () => {
      document.title = 'Green Plant Store';
    };
  }, [title, description]);
};