import { Link as RouterLink } from 'react-router-dom';

interface LinkProps {
  href: string;
  children: React.ReactNode;
}

export function Link({ href, children }: LinkProps) {
  return (
    <RouterLink
      to={href}
      className="text-blue-600 hover:text-blue-800 underline cursor-pointer text-sm"
    >
      {children}
    </RouterLink>
  );
}
