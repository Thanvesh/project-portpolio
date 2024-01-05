import React, { useEffect, useState } from 'react';
import "./index.css"
import Footer from "../Footer"

const Projects=()=>{
    const [projects, setProjects] = useState([]);

    useEffect(() => {
      // Fetch projects from the server when the component mounts
      const fetchProjects = async () => {
        try {
          const response = await fetch('http://localhost:3005/api/projects');
          if (response.ok) {
            const data = await response.json();
            setProjects(data);
          } else {
            console.error('Failed to fetch projects');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
      fetchProjects();
    }, []);
    return (
      <div className="project-main-container">
        <h1 className="main-title">Projects</h1>
        <ul className="project-container">
          {projects.map((each, index) => (
            <li className={`projects-card ${index % 2 === 0 ? 'even' : 'odd'}`}>
              <div className="project-details">
                <h1 className="project-title">{each.title}</h1>
                <p className="project-descr">{each.description}</p>
                <button type="button">
                  <a href={each.link}>View Projects</a>
                </button>
              </div>
              <img className="image" alt="new" src={each.imageUrl} />
            </li>
          ))}
        </ul>
        <Footer/>
      </div>
    )
}
export default Projects