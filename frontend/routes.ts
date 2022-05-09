import { Route } from '@vaadin/router';
import './views/list/list-view';

export type ViewRoute = Route & {
  title?: string;
  icon?: string;
  children?: ViewRoute[];
};

export const views: ViewRoute[] = [
  // place routes below (more info https://hilla.dev/docs/routing)
  {
    path: '',
    component: 'list-view',
    icon: 'la la-file',
    title: 'list',
  },
];
export const routes: ViewRoute[] = [...views];
