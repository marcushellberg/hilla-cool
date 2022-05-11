import { Route } from '@vaadin/router';
import './views/hilla-view';

export type ViewRoute = Route & {
  title?: string;
  icon?: string;
  children?: ViewRoute[];
};

export const views: ViewRoute[] = [
  // place routes below (more info https://hilla.dev/docs/routing)
  {
    path: '',
    component: 'hilla-view',
    title: 'list',
  },
];
export const routes: ViewRoute[] = [...views];
