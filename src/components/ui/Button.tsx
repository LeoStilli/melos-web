import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({ variant = 'primary', size = 'md', className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-sans font-medium tracking-widest uppercase transition-colors duration-150 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed',
        variant === 'primary' && 'bg-rust text-cream hover:bg-rust-dim',
        variant === 'ghost' && 'bg-transparent text-cream-dim hover:text-cream',
        variant === 'outline' && 'bg-transparent border border-border text-cream hover:border-cream-dim',
        size === 'sm' && 'text-xs px-4 py-2',
        size === 'md' && 'text-xs px-6 py-3',
        size === 'lg' && 'text-sm px-8 py-4',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
