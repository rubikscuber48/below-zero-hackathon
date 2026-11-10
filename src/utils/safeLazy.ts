import { lazy, type ComponentType } from 'react';

/** Loads a non-essential component on demand. If the download fails it renders nothing rather than taking the page down. */
export const safeLazy = <P extends object>(load: () => Promise<ComponentType<P>>) =>
  lazy(() =>
    load()
      .then((component) => ({ default: component }))
      .catch(() => ({ default: (() => null) as ComponentType<P> })),
  );
