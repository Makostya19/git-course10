import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../index.css';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo">RealWorld</Link>

        <nav className="nav-buttons">
          {user ? (
            <>
              <Link to="/profile" className="profile-link">
                <img src={user.image} alt="" width="32" />
                {user.username}
              </Link>
              <button onClick={logout}>Log out</button>
            </>
          ) : (
            <>
              <Link to="/sign-in">Sign in</Link>
              <Link to="/sign-up">Sign up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
