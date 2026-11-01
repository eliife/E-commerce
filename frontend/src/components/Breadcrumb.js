
import Link from 'next/link';

export default function Breadcrumb({ items = [] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="w-full px-6 md:px-10 lg:px-16"
    >
      <ol className="flex items-center gap-2 overflow-hidden whitespace-nowrap py-5 text-[11px] tracking-wide">

        <li className="shrink-0">
          <Link
            href="/"
            className="text-[#99918A] transition-colors duration-200 hover:text-[#211D1A]"
          >
            Ana Sayfa
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li
              key={item.href || item.label}
              className="flex min-w-0 shrink-0 items-center gap-2"
            >
              <span
                className="text-[#C8C1BA]"
                aria-hidden="true"
              >
                /
              </span>

              {isLast ? (
                <span
                  aria-current="page"
                  className="max-w-[220px] truncate font-medium text-[#211D1A] md:max-w-none"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-[#99918A] transition-colors duration-200 hover:text-[#211D1A]"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}

      </ol>
    </nav>
  );
}
