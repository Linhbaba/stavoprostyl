'use client'; // Required for usePathname

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation'; // Import usePathname
import clsx from 'clsx'; // Optional: for cleaner conditional classes

// Define navigation items
const navItems = [
  { name: 'Domů', href: '/' },
  { name: 'O nás', href: '/o-nas' },
  { name: 'Služby', href: '/sluzby' },
  { name: 'Projekty', href: '/projekty' },
  { name: 'Blog', href: '/blog' },
  { name: 'Kontakt', href: '/kontakt' },
];

export function Header() {
  const pathname = usePathname(); // Get current path

  return (
    // Test: Use standard bg-white instead of custom bg-soft-white
    <header className="sticky top-0 z-[60] w-full border-b border-gray-200 bg-white bg-opacity-100">
      {/* Add padding to container, ensure max-width is applied */}
      <div className="container mx-auto flex h-24 max-w-screen-desktop items-center px-4 sm:px-6">
        {/* Logo */}
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image 
              src="/logo.png" 
              alt="Stavopro Styl Logo" 
              width={75} 
              height={75} 
              className="h-auto w-auto"
            />
          </Link>
        </div>

        {/* Spacer to push navigation to the right */}
        <div className="flex-1" />

        {/* Desktop Navigation - Removed flex-1 */}
        <nav className="hidden md:flex gap-10">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              // Use clsx for conditional styling based on pathname
              className={clsx(
                'text-lg font-medium font-subheading tracking-wide transition-colors hover:text-primary-red',
                pathname === item.href ? 'text-primary-red' : 'text-dark-blue'
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button (Placeholder - improved styling slightly) - Removed flex-1 */}
        <div className="flex items-center justify-end space-x-2 md:hidden">
          <button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md p-2 text-dark-blue transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            aria-label="Toggle menu"
          >
            {/* <Icons.menu className="h-6 w-6" /> // TODO: Add Menu Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
          </button>
        </div>
      </div>
    </header>
  );
} 