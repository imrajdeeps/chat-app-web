import { createRootRoute, createRoute } from '@tanstack/react-router';
import { RootLayout } from '../layouts/RootLayout';
import Chat from '../pages/ChatWindow';
import Docs from '../pages/docs';
import Version from '../pages/version';

const rootRoute = createRootRoute({ component: RootLayout });

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: function Index() {
    return (
      <div className='p-2'>
        <h3>Welcome Home!</h3>
      </div>
    );
  },
});

export const chatRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/chat',
  component: Chat,
});

export const docsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/docs',
  component: Docs,
});
export const versionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/version',
  component: Version,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  chatRoute,
  docsRoute,
  versionRoute,
]);

export default routeTree;
