import { cn, type ClassValue } from '@/utils/cn'
import { type ReactNode } from 'react'

type ContentLayoutProps = {
  children: ReactNode
  className?: ClassValue
}

export const AppLayout = ({ children, className }: ContentLayoutProps) => {
  return (
    <div
      className={cn(
        `flex min-h-svh justify-center bg-gray-50 sm:items-center`,
        className
      )}
    >
      {children}
    </div>
  )
}
