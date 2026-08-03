import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

export const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-8">
      <h1 className="font-display-lg text-6xl text-primary font-bold mb-4">404</h1>
      <h2 className="font-headline-sm text-headline-sm text-on-surface mb-6">Page Not Found</h2>
      <p className="text-on-surface-variant max-w-md mb-8 font-body-md">
        The legal publication or page you are searching for does not exist or has been relocated within the AILC portal.
      </p>
      <Link to="/">
        <Button variant="primary" size="lg">
          RETURN TO HOMEPAGE
        </Button>
      </Link>
    </div>
  );
};
