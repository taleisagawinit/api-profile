import React, { useState, useEffect } from 'react'
import axios from 'axios'
import MaterialIcon from 'material-icons-react'
import moment from 'moment'

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
      // let repos = resp2.data
      setrepoNames(resp2.data)
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
        <input type="text" placeholder="Find a repository..." className="find"></input>
        <div className="repoList">
          <ul>
            {Object.values(repoNames).map(function(item) {
              return (
              <li key={item.id}>
                <span className="item">{item.name}</span>
                <span className="language">{item.language}
                  <span className="update">Updated {moment(`${item.updated_at.slice(0, 10)}`, "YYYY-MM-DD").fromNow()}</span>
                </span>
              </li>
              )
            })}
          </ul>
        </div>
        
      </div>
    </div>

   
  )
}
