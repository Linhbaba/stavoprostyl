import clsx from 'clsx'

interface CmsProseProps {
  children: React.ReactNode
  className?: string
}

export function CmsProse({ children, className }: CmsProseProps) {
  return (
    <div
      className={clsx(
        'cms-prose prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-dark-blue prose-a:text-blue prose-img:shadow-lg',
        className,
      )}
    >
      {children}
    </div>
  )
}
