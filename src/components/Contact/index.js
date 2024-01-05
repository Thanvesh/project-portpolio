import {Component} from 'react'
import './index.css'
import Footer from '../Footer'

class Contact extends Component {
  state = {
    linkedInUrl: '',
    mobileNumber: '',
    editMode: false,
  }

  handleLinkedInUrlChange = event => {
    this.setState({linkedInUrl: event.target.value})
  }

  handleMobileNumberChange = event => {
    this.setState({mobileNumber: event.target.value})
  }

  toggleEditMode = () => {
    this.setState(prevState => ({editMode: !prevState.editMode}))
  }

  render() {
    const {linkedInUrl, mobileNumber, editMode} = this.state

    return (
    <>
    <div className="contact-container">
        <h1 className="contact-heading">Contact</h1>
        {editMode ? (
          <div className="contact-form">
            <label>
              LinkedIn URL:
              <input
                type="text"
                value={linkedInUrl}
                onChange={this.handleLinkedInUrlChange}
              />
            </label>
            <label>
              Mobile Number:
              <input
                type="text"
                value={mobileNumber}
                onChange={this.handleMobileNumberChange}
              />
            </label>
          </div>
        ) : (
          <div className="contact-info">
            <p>
              LinkedIn URL: {linkedInUrl || 'N/A'}
              <br />
              Mobile Number: {mobileNumber || 'N/A'}
            </p>
          </div>
        )}
        <button type="button" onClick={this.toggleEditMode}>
          {editMode ? 'Save' : 'Edit'}
        </button>

      </div>
      <Footer/>
    </>
      

    )
  }
}

export default Contact
