'use client'; // Keep client directive if using hooks like usePathname potentially later

import Link from 'next/link';
import clsx from 'clsx'; // Using clsx for better class management

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant: 'primary' | 'secondary';
  className?: string;
}

export function Button({ href, children, variant, className }: ButtonProps) {
  const baseStyle =
    'inline-flex items-center justify-center rounded-md px-6 py-3 text-base font-bold font-heading uppercase transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-red focus-visible:ring-offset-2 focus-visible:ring-offset-black active:scale-95 z-10';

  return (
    <Link
      href={href}
      className={clsx(
        baseStyle,
        {
          'bg-primary-red hover:bg-primary-red-dark text-white': variant === 'primary',
          'bg-blue hover:bg-blue/90 text-white': variant === 'secondary',
        },
        className
      )}
    >
      <span className="text-white">{children}</span>
    </Link>
  );
} 