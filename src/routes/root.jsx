import {
  Outlet,
  useNavigate,
  useParams,
  NavLink,
  useLocation,
  useMatches,
} from 'react-router-dom';

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
  // console.log('Root::params', useParams());
  // console.log('Root::matches', useMatches());
  // console.log('Root::location', useLocation().pathname.split('/'));
  const { pKey } = useParams();
  const pageName = useLocation().pathname.split('/')[1];
  // const [project, setProject] = useState(pKey || 'A');
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
        </div>
        <div id="detail">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
