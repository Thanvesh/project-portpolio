import React, {Component} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  faHtml5,
  faCss3,
  faJs,
  faReact,
  faPython,
  faNode,
} from '@fortawesome/free-brands-svg-icons'

import './index.css'
import Footer from '../Footer'

const skillsList = [
  {name: 'HTML', icon: <FontAwesomeIcon icon={faHtml5} />},
  {name: 'CSS', icon: <FontAwesomeIcon icon={faCss3} />},
  {name: 'JavaScript', icon: <FontAwesomeIcon icon={faJs} />},
  {name: 'React.js', icon: <FontAwesomeIcon icon={faReact} />},
  {name: 'Python', icon: <FontAwesomeIcon icon={faPython} />},
  {name: 'Node.js', icon: <FontAwesomeIcon icon={faNode} />},
]

const skillLevels = ['Beginner', 'Intermediate', 'Expert']

class About extends Component {
  state = {
    name: 'Your Name',
    description: 'A brief description about yourself.',
    skills: {
      HTML: 'Beginner',
      CSS: 'Beginner',
      JavaScript: 'Beginner',
      'React.js': 'Beginner',
      Python: 'Beginner',
      'Node.js': 'Beginner',
    },
    profilePic: null,
  }

  handleNameChange = event => {
    this.setState({name: event.target.value})
  }

  handleDescriptionChange = event => {
    this.setState({description: event.target.value})
  }

  handleSkillLevelChange = (skill, level) => {
    const {skills} = this.state
    this.setState({
      skills: {
        ...skills,
        [skill]: level,
      },
    })
  }

  handleImageChange = event => {
    const file = event.target.files[0]

    if (file) {
      const reader = new FileReader()

      reader.onloadend = () => {
        this.setState({
          profilePic: reader.result,
        })
      }

      reader.readAsDataURL(file)
    }
  }

  render() {
    const {name, description, skills, profilePic} = this.state

    return (
      <div className="profile-container">
        <img className="profile-pic" src={profilePic} alt="Profile" />
        <input type="file" accept="image/*" onChange={this.handleImageChange} />
        <div className="edit-profile">Edit Profile</div>
        <input
          type="text"
          value={name}
          onChange={this.handleNameChange}
          className="profile-name"
        />
        <textarea
          value={description}
          onChange={this.handleDescriptionChange}
          className="profile-description"
        />
        <div className="skills">
          {skillsList.map(skill => (
            <div key={skill.name} className="skill">
              {skill.icon}
              <div className="skill-dropdown">
                <span>{skill.name}</span>
                <select
                  value={skills[skill.name]}
                  onChange={e =>
                    this.handleSkillLevelChange(skill.name, e.target.value)
                  }
                >
                  {skillLevels.map(level => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
        <Footer/>
      </div>
    )
  }
}

export default About
