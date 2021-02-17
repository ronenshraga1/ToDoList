import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { TimeAgo } from './TimeAgo'

export const SinglePostPage = ({ match }) => {
  const { missionId } = match.params

  const mission = useSelector((state) =>
    state.missions.find((mission) => mission.id === missionId)
  )

  if (!mission) {
    return (
      <section>
        <h2>mission not found!</h2>
      </section>
    )
  }

  return (
    <section>
      <article className="post">
        <h2>{mission.title}</h2>
        <div>
          <TimeAgo timestamp={mission.date} />
        </div>
        <p className="post-content">{mission.content}</p>
        <Link to={`/editMission/${mission.id}`} className="button">
          Edit mission
        </Link>
      </article>
    </section>
  )
}
