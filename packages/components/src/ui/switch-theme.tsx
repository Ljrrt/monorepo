import { Switch, useTheme } from '@monorepo/components';

import { cn, ICONS } from '@monorepo/common';

interface SwitchThemeProperties  {
  isVertical?: boolean;
  className?:  string;
}

export function SwitchTheme(properties: SwitchThemeProperties) {
  const { className, isVertical = false } = properties;

  const { theme, setTheme } = useTheme();
  return (
    <Switch
      id="switch-theme"
      isVertical={isVertical}
      checkedIcon={ICONS.lightMode}
      uncheckedIcon={ICONS.darkMode}
      className={cn(className)}
      defaultChecked={theme === 'light'}
      onCheckedChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    />
  );
}
