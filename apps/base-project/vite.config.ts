import { digoViteConfig } from '@monorepo/common/vite.config';

export default digoViteConfig({
  includeAssetsFrom: ['packages/common', 'packages/components', 'apps/base-project'],
  port:              Number(process.env.PORT) || 10000,
});
