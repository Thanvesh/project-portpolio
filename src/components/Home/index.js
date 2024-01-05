
import ProjectForm from '../ProjectForm'
import './index.css'

const Home = () => {


  return (
    <div className="Home-container">
      <div className="sec">
        <div className="descr-container">
          <p className="role">UI/UX DESIGNER</p>
          <h1 className="heading">Hello, my name is Radandi Thanvesh</h1>
          <p className="description">
            Short text with details about you, what you do or your professional
            career. You can add more information on the about page.
          </p>
          <div className="buttons-container">
            <button type="button" className="prj-btn">
              Projects
            </button>
            <button type="button" className="linkdin-btn">
              Linkedin
            </button>
          </div>
        </div>
        <div className='sec-right-container'>
          <img
            className="home-png"
            src="https://c.animaapp.com/QMNmOGlX/img/pexels-artem-beliaikin-1832323-removebg-preview.png"
            alt="logo-img"
          />
        </div>
      </div>
      <ProjectForm />
    </div>
  )
}

export default Home
