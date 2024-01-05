import { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import NotFound from './components/NotFound';
import Header from './components/Header';

import"./App.css"

class App extends Component {

  render(){

    return(
      <div className='maincontainer'>
        <Router>
          <Header />
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects/>} />
              <Route exact path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
      </div>
      
    )
  }
}
export default App