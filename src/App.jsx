import { Routes, Route, Navigate, NavLink } from 'react-router-dom';
import ArticlesPage from './pages/ArticlesPage';
import ArticlePage from './pages/ArticlePage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import { useAuth } from './context/AuthContext';

function App() {
  const { user } = useAuth();
  const isAuth = !!user;

  return (
    <>
      <nav className="navbar navbar-light">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            Realworld Blog
          </NavLink>

          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  'nav-link' + (isActive ? ' active' : '')
                }
                to="/"
              >
                Home
              </NavLink>
            </li>

            {!isAuth && (
              <>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      'nav-link' + (isActive ? ' active' : '')
                    }
                    to="/sign-in"
                  >
                    Sign in
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      'nav-link' + (isActive ? ' active' : '')
                    }
                    to="/sign-up"
                  >
                    Sign up
                  </NavLink>
                </li>
              </>
            )}

            {isAuth && (
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    'nav-link' + (isActive ? ' active' : '')
                  }
                  to="/profile"
                >
                  Profile
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<ArticlesPage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/articles/:slug" element={<ArticlePage />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        {isAuth && <Route path="/profile" element={<Profile />} />}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
