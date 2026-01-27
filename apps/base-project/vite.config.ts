import { digoViteConfig } from '@monorepo/common/vite.config';

export default digoViteConfig({
  includeAssetsFrom: ['packages/common', 'packages/ui', 'apps/base-project'],
  port:              Number(process.env.PORT) || 10000,
});
