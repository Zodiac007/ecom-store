'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Products' },
  { href: '/cart', label: 'Cart' },
  { href: '/checkout', label: 'Checkout' },
  { href: '/admin', label: 'Admin' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo or Title */}
        <div className="text-white font-bold text-xl">
          <Link href="/">Store</Link>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-white text-lg font-medium hover:text-blue-300 ${
                pathname === item.href ? 'border-b-2 border-white' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
