import {Component} from 'react'
import './index.css'
import MySVGComponent from '../MySvg'

class ProjectForm extends Component {
  state = {
    title: '',
    link: '',
    description: '',
    imageFile: null,
    imageUrl: '', // Added imageUrl to state
  }

  handleInputChange = (name, value) => {
    this.setState({
      [name]: value,
    })
  }

  handleImageUpload = e => {
    const file = e.target.files[0]
    this.setState({
      imageFile: file,
    })

    // Read the selected image file and convert it to a data URL
    const reader = new FileReader()
    reader.onloadend = () => {
      this.setState({
        imageUrl: reader.result,
      })
    }
    reader.readAsDataURL(file)
  }

  handleAddProject = async () => {
    const { title, link, description, imageUrl } = this.state;
  
    try {
      const response = await fetch('http://localhost:3005/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, link, description, imageUrl }),
      });
  
      if (response.ok) {
        // Assuming the server responds with a success message
        console.log('Project added successfully');
      } else {
        console.error('Failed to add project');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  
    // Clear form after adding a project
    this.setState({
      title: '',
      link: '',
      description: '',
      imageFile: null,
      imageUrl: '',
    });
  };

  render() {
    const {title, link, description} = this.state

    return (
      <div>
        <div className="form-container">
          <h1 className="heading">Add Project</h1>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={title}
              onChange={e => this.handleInputChange('title', e.target.value)}
            />
          </label>
          <label>
            Link:
            <input
              type="text"
              name="link"
              value={link}
              onChange={e => this.handleInputChange('link', e.target.value)}
            />
          </label>

          <div className='description-box'>
            <label htmlFor='area'>
                Description:
            </label>
            <textarea 
                id="area"
                name="description"
                value={description}
                onChange={e =>
                    this.handleInputChange('description', e.target.value)
                }
                />
          </div>
  
          <label className='file-upload'>
            Upload Image:
            <input
              type="file"
              accept="image/*"
              onChange={this.handleImageUpload}
            />
          </label>
          
          <button
            className="Add-btn"
            type="button"
            onClick={this.handleAddProject}
          >
            Add
          </button>
        </div>
        <div>
          <MySVGComponent />
        </div>
      </div>
    )
  }
}

export default ProjectForm
