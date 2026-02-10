import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import DefaultAvatar from './DefaultAvatar';
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
              <Link to="/profile" className="profile-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {user.image ? (
                  <img src={user.image} alt="" width="32" style={{borderRadius: '50%'}} />
                ) : (
                  <DefaultAvatar width={32} height={32} />
                )}
                {user.username}
              </Link>
              <button className="logout" onClick={logout}>Log out</button>
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
