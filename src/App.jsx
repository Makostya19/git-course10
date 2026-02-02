import { Routes, Route, Navigate, Link } from 'react-router-dom';
import ArticlesPage from './pages/ArticlesPage';
import ArticlePage from './pages/ArticlePage';

function App() {
  return (
    <>
      <nav className="navbar navbar-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Realworld Blog
          </Link>

          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Sign in
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/register">
                Sign up
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<ArticlesPage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/articles/:slug" element={<ArticlePage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;