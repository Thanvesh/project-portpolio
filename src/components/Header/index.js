import {Link} from 'react-router-dom'
import './index.css'

const Header = () => (
  <nav className="nav-main-container">
    <h1 className='name-portpolio'>Radandi Thanvesh</h1>
    <ul className="nav-section-container">
      <li>
        <Link  to="/">Home</Link>
      </li>
      <li>
        <Link  to="/about">About</Link>
      </li>
      <li>
        <Link to="/projects">Projects</Link>
      </li>
      <li>
        <Link to="/contact">Contact</Link>
      </li>
    </ul>
  </nav>
)

export default Header
