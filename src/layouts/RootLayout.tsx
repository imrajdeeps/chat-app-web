import { Suspense } from 'react';
import { Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export const RootLayout = () => {
  return (
    <>
      <Suspense fallback={<div className='text-center p-8'>Loading...</div>}>
        <Outlet />
      </Suspense>
      <TanStackRouterDevtools />
    </>
  );
};
