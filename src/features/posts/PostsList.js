import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { TimeAgo } from './TimeAgo'
import { deleteMission } from './postsSlice'
let  CHANGE =0;
export const MissionsList = () => {
  const dispatch = useDispatch()

  const missions = useSelector((state) => state.missions)
  const del = (event) =>{
    dispatch(deleteMission(event.target.id));
    CHANGE++;
  }
  useEffect(()=>{
    const renderedMissions = missions.map((mission) => {
      return (
        <article className="post-excerpt" key={mission.id}>
          <h3>{mission.title}</h3>
          <div>
            <TimeAgo timestamp={mission.date} />
          </div>
          <p className="post-content">{mission.content.substring(0, 100)}</p>
  
          <Link to={`/missions/${mission.id}`} className="button muted-button">
            View Post
          </Link>
          <button id={mission.id} onClick={del}>Delete</button>
        </article>
      )
    })
  },[CHANGE]);
  // Sort posts in reverse chronological order by datetime string
  const orderedMissions = missions
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))

  const renderedMissions = orderedMissions.map((mission) => {
    return (
      <article className="post-excerpt" key={mission.id}>
        <h3>{mission.title}</h3>
        <div>
          <p>User:{mission.user}</p>
          <TimeAgo timestamp={mission.date} />
        </div>
        <p className="post-content">{mission.content.substring(0, 100)}</p>

        <Link to={`/missions/${mission.id}`} className="button muted-button">
          View Mission
        </Link>
        <button className="delbutton" id={mission.id} onClick={del}>Delete</button>
      </article>
    )
  })

  return (
    <section className="posts-list">
      <h2>Missions</h2>
      {renderedMissions}
    </section>
  )
}
