import { cn, type ClassValue } from '@/utils/cn'
import { ReactNode } from 'react'

type BaseTypographyProps<T extends React.ElementType = 'p'> = {
  children: ReactNode
  className?: ClassValue
  as?: T
}

export const Heading = <T extends React.ElementType>({
  children,
  className,
  as,
}: BaseTypographyProps<T>) => {
  const Component = as ?? 'h2'

  return (
    <Component className={cn('text-primary text-3xl font-black', className)}>
      {children}
    </Component>
  )
}

export const Subtitle = <T extends React.ElementType>({
  children,
  className,
  as,
}: BaseTypographyProps<T>) => {
  const Component = as ?? 'p'

  return (
    <Component
      className={cn(
        'text-md font-medium text-black/80 dark:text-white/85',
        className
      )}
    >
      {children}
    </Component>
  )
}
