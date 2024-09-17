import {
  Outlet,
  useNavigate,
  useParams,
  NavLink,
  useLocation,
} from 'react-router-dom';
import { useAuth } from '../auth';

const links = [
  {
    to: 'dashboard',
  },
  {
    to: 'settings',
  },
  {
    to: 'translations',
  },
];

export default function Root() {
  const navigate = useNavigate();
  const auth = useAuth();
  console.log('Root::auth', auth);

  const { pKey } = useParams();
  const pageName = useLocation().pathname.split('/')[1];

  const { isAuthenticated, isLoading } = auth;

  const login = () => {
    auth.signinRedirect().catch((e) => {
      console.error('error signing in::', e);
    });
  };

  const logout = () => {
    auth.signoutRedirect().catch((e) => {
      console.error('error signing out::', e);
    });
  };

  const showAuthInfo = () => {
    const { user } = auth;
    console.log({
      email: user?.profile?.email,
      expired: user.expired,
      expireAt: new Date((user.expires_at || 0) * 1000).toString(),
    });
  };

  if (!isAuthenticated && !isLoading) {
    return (
      <div>
        <p>Not authenticated</p>
        <button onClick={login}>Login</button>
      </div>
    );
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="content">
      <div id="sidebar">
        <nav>
          <h2>Pages</h2>
          <ul>
            {links.map((p) => (
              <li key={p.to}>
                <NavLink
                  to={`${p.to}/${pKey || 'A'}`}
                  className={({ isActive, isPending }) =>
                    isActive ? 'active' : isPending ? 'pending' : ''
                  }
                >
                  {p.to}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <h4>Pages without navigation</h4>
        <ul style={{ paddingLeft: 20 }}>
          <li>
            <NavLink
              to={`/rootA`}
              className={({ isActive, isPending }) =>
                isActive ? 'active' : isPending ? 'pending' : ''
              }
            >
              rootA
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/rootB`}
              className={({ isActive, isPending }) =>
                isActive ? 'active' : isPending ? 'pending' : ''
              }
            >
              rootB
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="body">
        <div className="header">
          <div className="pageName">{pageName}</div>
          <select
            defaultValue={pKey}
            className="selector"
            onChange={(ev) => {
              navigate(`dashboard/${ev.target.value}`);
            }}
          >
            <option value="A" label="Project A" />
            <option value="B" label="Project B" />
            <option value="C" label="Project C" />
          </select>
          <button onClick={logout}>Logout</button>
          <button onClick={showAuthInfo}>Auth</button>
        </div>
        <div id="detail">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
