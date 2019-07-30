import React, { useState, useEffect } from 'react'
import axios from 'axios'
import MaterialIcon from 'material-icons-react'

export default props => {
  const [name, setName] = useState('')
  const [pic, setPic] = useState('')
  const [bio, setBio] = useState('')
  const [location, setLocation] = useState('')
  const [url, setUrl] = useState('')
  const [repoNames, setrepoNames] = useState([])

  useEffect(() => {
    axios.get("https://api.github.com/users/taleisagawinit").then(resp => {
      let profile = resp.data
      setName(profile.login)
      setPic(profile.avatar_url)
      setBio(profile.bio)
      setLocation(profile.location)
      setUrl(profile.html_url)
    })
    
    axios.get("https://api.github.com/users/taleisagawinit/repos").then(resp2 => {
      let repos = resp2.data
      Object.values(repos).forEach(function(item) {
        setrepoNames(repoNames.push(item.name))
      });
      Object.values(repoNames).map(function(item){ 
          console.log(item)
        })
    })
  }, [])

  return (
    <div className="container">
      <div className="profile">
        <img src={pic} alt="profile"></img>
        <p>{name}</p>
        <button>edit profile</button>
        <p>{bio}</p>
        <p>
        <MaterialIcon icon="location_on" size="small"></MaterialIcon>
        {location}</p>
        <p>{url}</p>
      </div>
      <div className="repos">
        <div className="category">
          <ul>
            <li>overview</li>
            <li>repositories</li>
            <li>projects</li>
            <li>stars</li>
            <li>followers</li>
            <li>following</li>
          </ul>
        </div>
        <div className="repoList">
          <ul>
          {Object.values(repoNames).map(function(item){ 
            return <li>{item}</li>
            })}
            <li>repos go here</li>
          </ul>
        </div>
        
      </div>
    </div>

   
  )
}
