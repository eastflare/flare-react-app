import { Link } from 'react-router-dom';

const LeftMenu = () => {
  return (
    <div className='leftmenu'>
      <ul>
        <li>
          <Link to='/'>Dashboard</Link>
        </li>
        <li>
          <Link to='/profile'>Profile</Link>
        </li>
        <li>
          <Link to='/settings'>Settings</Link>
        </li>
      </ul>
    </div>
  );
};

export default LeftMenu;
