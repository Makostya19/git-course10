import { Routes, Route, Navigate, NavLink } from 'react-router-dom';
import ArticlesPage from './pages/ArticlesPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import { useAuth } from "./context/useAuth";
import CreateArticle from './pages/CreateArticle';
import EditArticle from './pages/EditArticle';
import ArticleView from './pages/ArticleView';

function App() {
  const { user, logout } = useAuth(); 
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
              <>
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

                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      'nav-link' + (isActive ? ' active' : '')
                    }
                    to="/new-article"
                  >
                    New Article
                  </NavLink>
                </li>

                <li className="nav-item">
                  <button
                    className="nav-link"
                    onClick={logout}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Log out
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<ArticlesPage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/articles/:slug" element={<ArticleView />} />
        <Route
          path="/articles/:slug/edit"
          element={isAuth ? <EditArticle /> : <Navigate to="/sign-in" />}
        />
        <Route
          path="/new-article"
          element={isAuth ? <CreateArticle /> : <Navigate to="/sign-in" />}
        />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        {isAuth && <Route path="/profile" element={<Profile />} />}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;