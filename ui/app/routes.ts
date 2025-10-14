import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('features/home/pages/home.tsx'),
  route('/survey/all', 'features/survey/pages/all-surveys.tsx'),
] satisfies RouteConfig;
