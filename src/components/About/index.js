import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHtml5,
  faCss3,
  faJs,
  faReact,
  faPython,
  faNode,
} from '@fortawesome/free-brands-svg-icons';

import './index.css';
import Footer from '../Footer';

const skillsList = [
  { name: 'HTML', icon: <FontAwesomeIcon className='icon' icon={faHtml5} /> },
  { name: 'CSS', icon: <FontAwesomeIcon className='icon' icon={faCss3} /> },
  { name: 'JavaScript', icon: <FontAwesomeIcon className='icon' icon={faJs} /> },
  { name: 'React.js', icon: <FontAwesomeIcon className='icon' icon={faReact} /> },
  { name: 'Python', icon: <FontAwesomeIcon className='icon' icon={faPython} /> },
  { name: 'Node.js', icon: <FontAwesomeIcon className='icon' icon={faNode} /> },
];

const skillLevels = ['Beginner', 'Intermediate', 'Expert'];

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
    isEditing: false,
  };

  componentDidMount() {
    // Load profile data from localStorage if available
    const storedProfile = localStorage.getItem('profile');
    if (storedProfile) {
      this.setState(JSON.parse(storedProfile));
    }
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  handleDescriptionChange = (event) => {
    this.setState({ description: event.target.value });
  };

  handleSkillLevelChange = (skill, level) => {
    const { skills } = this.state;
    this.setState({
      skills: {
        ...skills,
        [skill]: level,
      },
    });
  };

  handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        this.setState({
          profilePic: reader.result,
        });
      };

      reader.readAsDataURL(file);
    }
  };

  handleEditClick = () => {
    this.setState({ isEditing: true });
  };

  handleSaveClick = () => {
    // Save profile data to localStorage
    localStorage.setItem('profile', JSON.stringify(this.state));
    this.setState({ isEditing: false });
  };

  render() {
    const { name, description, skills, profilePic, isEditing } = this.state;

    return (
      <div className='profile-container'>
        <div className='profile-image-container'>
          <img className='profile-pic' src={profilePic} alt='Profile' />
          <h1 className='profile-name'>{name}</h1>
          <p className='profile-description'>{description}</p>
          {isEditing ? (
            <>
              <p className='edit-profile' onClick={this.handleSaveClick}>
                Save Profile
              </p>
              <input
                className='profile-edit'
                type='file'
                accept='image/*'
                onChange={this.handleImageChange}
              />
            </>
          ) : (
            <p className='edit-profile' onClick={this.handleEditClick}>
              Edit Profile
            </p>
          )}
        </div>
        <div className='profile-form-container'>
          {isEditing && (
            <>
              <label>
                <input
                  type='text'
                  value={name}
                  onChange={this.handleNameChange}
                  className=''
                />
              </label>
              <label>
                <textarea
                  value={description}
                  onChange={this.handleDescriptionChange}
                  className=''
                />
              </label>
            </>
          )}
        </div>

        <div className='skills'>
          {skillsList.map((skill) => (
            <div key={skill.name} className='skill'>
              {skill.icon}
              <div className='skill-dropdown'>
                <span>{skill.name}</span>
                {isEditing ? (
                  <select
                    value={skills[skill.name]}
                    onChange={(e) =>
                      this.handleSkillLevelChange(skill.name, e.target.value)
                    }
                  >
                    {skillLevels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span>{skills[skill.name]}</span>
                )}
              </div>
            </div>
          ))}
        </div>
        <Footer />
      </div>
    );
  }
}

export default About;
