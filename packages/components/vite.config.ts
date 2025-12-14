import { digoViteConfig } from '@monorepo/common/vite.config';

export default digoViteConfig({
  includeAssetsFrom: ['packages/common', 'packages/components'],
  port:              Number(process.env.PORT) || 2000,
});
