import { digoViteConfig } from '@monorepo/common/vite.config';

export default digoViteConfig({
  includeAssetsFrom: ['common'],
  port:              Number(process.env.PORT) || 2000,
});
