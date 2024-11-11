import { type ReactNode } from 'react'

import { cn, type ClassValue } from '@/utils/cn'
import { ColorModeSwitch } from '@/components/features/ColorModeSwitch'

type ContentLayoutProps = {
  children: ReactNode
  className?: ClassValue
  wrapperClassName?: ClassValue
}

export const AppLayout = ({
  children,
  className,
  wrapperClassName,
}: ContentLayoutProps) => {
  return (
    <div
      className={cn(
        `dark:bg-background-gradient flex min-h-svh flex-col bg-gray-50 dark:text-white`,
        wrapperClassName
      )}
    >
      <header className="m-4 flex justify-end">
        <ColorModeSwitch />
      </header>
      <div
        className={cn(
          'flex min-h-full grow justify-center sm:items-center',
          className
        )}
      >
        {children}
      </div>
    </div>
  )
}
