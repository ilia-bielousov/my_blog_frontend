
import { Link } from 'react-router-dom';
import './AdminToolbar.css';

const AdminToolbar = () => {
  return (
    <nav className="control">
      <div className="control__inner">
        <div className="sidebar-links">
          <ul>
            <li>
              <Link
                to="../admin"
                title="Home"
                className="tooltip"
                relative="admin"
                key={'admin'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2"
                  stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5 12l-2 0l9 -9l9 9l-2 0"></path>
                  <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>
                  <path d="M10 12h4v4h-4z"></path>
                </svg>
                <span className="link">Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="articles"
                title="articles"
                className="tooltip"
                key={'articles'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-layout-dashboard" width="24"
                  height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"
                  strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M4 4h6v8h-6z"></path>
                  <path d="M4 16h6v4h-6z"></path>
                  <path d="M14 12h6v8h-6z"></path>
                  <path d="M14 4h6v4h-6z"></path>
                </svg>
                <span className="link hide">Articles</span>
              </Link>
            </li>
            <li>
              <Link
                to="create-article"
                title="create an article"
                className="tooltip"
                key={'create-article'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2"
                  stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M8 16l2 -6l6 -2l-2 6l-6 2"></path>
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                </svg>
                <span className="link hide">Create</span>
              </Link>
            </li>
            <li>
              <Link
                to="edit-article"
                title="edit an article"
                className="tooltip"
                key={'edit-article'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2"
                  stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M8 16l2 -6l6 -2l-2 6l-6 2"></path>
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                </svg>
                <span className="link">Edit</span>
              </Link>
            </li>
            <li>
              <Link
                to="reports"
                title="Reports"
                className="tooltip"
                key={'reports'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-file-description" width="24"
                  height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"
                  strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                  <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path>
                  <path d="M9 17h6"></path>
                  <path d="M9 13h6"></path>
                </svg>
                <span className="link hide">Reports</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AdminToolbar;