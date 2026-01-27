import { digoViteConfig } from '@monorepo/common/vite.config';

export default digoViteConfig({
  includeAssetsFrom: ['packages/common', 'packages/ui', 'apps/design-system'],
  port:              Number(process.env.PORT) || 1000,
});
