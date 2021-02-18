import React from 'react'
import { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addSubMission,deleteSubMission } from './postsSlice'

import { TimeAgo } from './TimeAgo'

export const SinglePostPage = ({ match }) => {
  const { missionId } = match.params
  const [submission,SetSubMission] = useState('');
  const dispatch = useDispatch();


  const mission = useSelector((state) =>
    state.missions.find((mission) => mission.id === missionId)
  );
  const submissions1 = useSelector((state) => state.missions[0]);
  console.log(submissions1);
  if (!mission) {
    return (
      <section>
        <h2>mission not found!</h2>
      </section>
    )
  }
  const onSubMissionChanged = (e) => SetSubMission(e.target.value);
  const addsubmission =(event) =>{
    console.log(submission);
    if(event.which === 13){
      dispatch(addSubMission({subs:submission,missionId}));
    }
  }
  const deletesub =(event) =>{
    dispatch(deleteSubMission({subs:submission,missionId,id:event.target.id}))
  }
  const renderSubMissions = mission.submissions.map((submis,i=0) =>{
    return(
      <div className="sublist">
      <h4 id={i}>{submis}</h4>
      <button className="delbutton" id={i} onClick={deletesub}>Delete</button>
      {i++}
      </div>
    ); 
    
  })
  return (
    <section className="singlemission">
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
      <article className="submissions">
      <label htmlFor="submission">addsubmission</label>
        <input
          type="text"
          id="submission"
          name="submission"
          placeholder=""
          value={submission}
          onChange={onSubMissionChanged}
          onKeyPress={addsubmission}
        />
        {renderSubMissions}
      </article>
    </section>
  )
}
