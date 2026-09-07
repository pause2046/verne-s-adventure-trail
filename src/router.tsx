import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    // Keep the router in sync with Vite's `base` so links/navigation work under the
    // GitHub Pages sub-path (import.meta.env.BASE_URL is "/" locally).
    basepath: import.meta.env.BASE_URL,
  });

  return router;
};
