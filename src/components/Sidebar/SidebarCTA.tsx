'use client';

import type { ComponentProps, FC, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
import type { DeepPartial } from '../../types';
import type { FlowbiteColors } from '../Flowbite';
import { useSidebarContext } from './SidebarContext';

export interface FlowbiteSidebarCTATheme {
  base: string;
  color: FlowbiteSidebarCTAColors;
}

export interface SidebarCTAProps extends PropsWithChildren, Omit<ComponentProps<'div'>, 'color'> {
  color?: keyof FlowbiteSidebarCTAColors;
  theme?: DeepPartial<FlowbiteSidebarCTATheme>;
}

export interface FlowbiteSidebarCTAColors
  extends Pick<
    FlowbiteColors,
    'blue' | 'dark' | 'failure' | 'gray' | 'green' | 'light' | 'purple' | 'red' | 'success' | 'warning' | 'yellow'
  > {
  [key: string]: string;
}

export const SidebarCTA: FC<SidebarCTAProps> = ({
  children,
  color = 'info',
  className,
  theme: customTheme = {},
  ...props
}) => {
  const { isCollapsed } = useSidebarContext();
  const theme = mergeDeep(getTheme().sidebar.cta, customTheme);

  return (
    <div
      data-testid="sidebar-cta"
      hidden={isCollapsed}
      className={twMerge(theme.base, theme.color[color], className)}
      {...props}
    >
      {children}
    </div>
  );
};

SidebarCTA.displayName = 'Sidebar.CTA';
