import { cn, type ClassValue } from '@/utils/cn'
import { type ReactNode } from 'react'

type MessageProps = {
  title: string
  children: ReactNode
  className?: ClassValue
}

export const Message = ({ title, children, className }: MessageProps) => (
  <div
    className={cn(
      'flex flex-col items-center justify-center gap-2 text-center',
      className
    )}
  >
    <h2 className="text-xl font-bold">{title}</h2>
    <p className="text-balance text-sm text-black/65 dark:text-white/80">
      {children}
    </p>
  </div>
)
