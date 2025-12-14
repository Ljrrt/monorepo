import { CommonHelpers } from '@monorepo/common';
import { useTheme }      from '@monorepo/components';

import { ReactNode } from 'react';

import { ConfigProvider as AntdConfigProvider, theme as AntdTheme } from 'antd';

const accentColor  = CommonHelpers.getCssVariable('--color-accent-9');
const successColor = CommonHelpers.getCssVariable('--color-success-9');
const errorColor   = CommonHelpers.getCssVariable('--color-error-9');
const warningColor = CommonHelpers.getCssVariable('--color-warning-9');
const infoColor    = CommonHelpers.getCssVariable('--color-info-9');

export interface AntdProviderProperties {
  children: ReactNode;
}

export function AntdProvider(properties: AntdProviderProperties) {
  const { children } = properties;
  const { theme }    = useTheme();

  return (
    <>
      <AntdConfigProvider
        theme={
          {
            algorithm: theme === 'dark' ? AntdTheme.darkAlgorithm : AntdTheme.defaultAlgorithm,
            token:     {
              borderRadius: 10,
              colorPrimary: accentColor,
              colorSuccess: successColor,
              colorError:   errorColor,
              colorWarning: warningColor,
              colorInfo:    infoColor,
            },
            components: {
              ColorPicker: {
                boxShadowSecondary: '0px 0px 5px rgba(0, 0, 0, 1)',
              },
              Splitter: {
                splitBarSize:          0,
                splitTriggerSize:      10,
                splitBarDraggableSize: 20,
              },
            },
          }
        }
      >
        {children}
      </AntdConfigProvider>
    </>
  );
}
