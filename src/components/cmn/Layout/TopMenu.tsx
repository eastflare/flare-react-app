import { Link } from 'react-router-dom';

const TopMenu = () => {
  return (
    <div className='topmenu'>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/about'>About</Link>
          </li>
          <li>
            <Link to='/contact'>Contact</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default TopMenu;
