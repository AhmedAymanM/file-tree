import { type ReactNode } from 'react'

import { cn, type ClassValue } from '@/utils/cn'

type SidebarLayoutProps = {
  children?: ReactNode
  className?: ClassValue
}

export const SidebarLayout = ({ children, className }: SidebarLayoutProps) => {
  return (
    <section
      className={cn(
        'h-auto border-r-[1px] border-r-gray-300/30 bg-gray-300/40 dark:border-r-gray-300/5 dark:bg-gray-300/10',
        className
      )}
    >
      {children}
    </section>
  )
}
