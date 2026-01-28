import { defineConfig }           from 'vite';
import react                      from '@vitejs/plugin-react';
import tailwindcss                from '@tailwindcss/vite';
import tsconfigPaths              from 'vite-tsconfig-paths';
import { DynamicPublicDirectory } from 'vite-multiple-assets';
import svgr                       from 'vite-plugin-svgr';
import mdx                        from '@mdx-js/rollup';

export type DigoViteConfigProperties = {
  includeAssetsFrom: string[];
  port:              number;
  allowedHosts?:     string[];
};

export function digoViteConfig(properties: DigoViteConfigProperties) {
  const { includeAssetsFrom, port, allowedHosts } = properties;
  return  defineConfig({
    plugins: [
      react({
        babel: {
          plugins: ['module:@preact/signals-react-transform'],
        },
      }),
      tailwindcss(),
      tsconfigPaths(),
      DynamicPublicDirectory(
        includeAssetsFrom.map(mod => `../${mod}/public/**`),
      ),
      svgr(),
      mdx({
        providerImportSource: '@mdx-js/react',
      }),
    ],
    server: {
      port:         port,
      allowedHosts: allowedHosts,
    },
    build: {
      chunkSizeWarningLimit: 10000,
    },
    assetsInclude: ['**/*.tsx?raw', '**/*.html?raw', '**/*.ts?raw', '**/*.css?raw', '**/*.json?raw'],
  });
}
