import { cn } from '@monorepo/common';

import QR from 'qrcode';

import { ComponentPropsWithoutRef, useEffect, useState } from 'react';

export interface QRCodeProperties extends ComponentPropsWithoutRef<'div'> {
  data:        string;
  foreground?: string;
  background?: string;
  robustness?: 'L' | 'M' | 'Q' | 'H';
};

export function QRCode(properties: QRCodeProperties) {
  const {
    data,
    foreground,
    background,
    robustness = 'M',
    className,
    ...props
  } = properties;

  const [svg, setSVG] = useState<string | null>(null);

  useEffect(() => {
    generateQR();
  }, [data, foreground, background, robustness]);

  if (!svg) return undefined;

  async function generateQR() {
    try {
      const newSvg = await QR.toString(data, {
        type:  'svg',
        color: {
          dark:  foreground,
          light: background,
        },
        width:                200,
        errorCorrectionLevel: robustness,
        margin:               0,
      });

      setSVG(newSvg);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className={cn('size-full', '[&_svg]:size-full', className)}
      dangerouslySetInnerHTML={{ __html: svg }}
      {...props}
    />
  );
};
