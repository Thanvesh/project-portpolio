import './index.css'
import MySVGComponent from '../MySvg'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const Footer = () => (
  <div className="bottom-container">
    <div className="icon-container">
      <FontAwesomeIcon icon="fa-brands fa-square-instagram" />
      <FontAwesomeIcon icon="fa-brands fa-linkedin" />
      <FontAwesomeIcon icon="fa-solid fa-envelope" />
    </div>
    <p>Copyright © 2024. All rights reserved</p>
    <MySVGComponent />
  </div>
)

export default Footer