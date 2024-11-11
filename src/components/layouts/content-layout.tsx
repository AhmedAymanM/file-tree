import { cn, type ClassValue } from '@/utils/cn'
import { type ReactNode } from 'react'

type ContentLayoutProps = {
  children: ReactNode
  className?: ClassValue
}

export const ContentLayout = ({ children, className }: ContentLayoutProps) => {
  return (
    <div
      className={cn(
        'max-w-screen-md flex-col overflow-hidden rounded-xl bg-white shadow-2xl shadow-black/15 ring-1 ring-gray-100/60 sm:m-8 sm:min-h-[600px] sm:flex-row dark:bg-gray-900 dark:shadow-black/80 dark:ring-gray-700',

        className
      )}
    >
      {children}
    </div>
  )
}
