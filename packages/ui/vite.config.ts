import { digoViteConfig } from '@monorepo/common/vite.config';

export default digoViteConfig({
  includeAssetsFrom: ['packages/common', 'packages/ui'],
  port:              Number(process.env.PORT) || 2000,
});
