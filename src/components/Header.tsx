import { Link } from 'react-router-dom';
import { AuthButton } from '../AuthButton';
import { useIsAuthenticated } from 'jazz-react';

export function Header() {
  const isAuthenticated = useIsAuthenticated();

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-indigo-600">Doggie Dating</Link>
        </div>
        <nav className="flex items-center gap-4">
          {isAuthenticated && (
            <Link to="/home" className="text-gray-600 hover:text-indigo-600">My Dogs</Link>
          )}
          <AuthButton />
        </nav>
      </div>
    </header>
  );
}
