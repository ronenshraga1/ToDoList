import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';


import { TimeAgo } from './TimeAgo'
import { deleteMission } from './postsSlice'
let  CHANGE =0;
let FILTER =0;
let FILTERON = false;
const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  }
})((props) => <Checkbox color="default" {...props} />);
function CheckboxLabels() {
  
}
let renderedMissions =[];
export const MissionsList = () => {
  const dispatch = useDispatch();
  const[update,SetUpdate] = useState(0);
  const[updatedelete,SetUpdateDelete] = useState(0);
  const [state, setState] = React.useState({
    checkedG: false,
  });
  const[search,SetSearch] = useState('');


  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const missions = useSelector((state) => state.missions)
  const del = (event) =>{
    dispatch(deleteMission(event.target.id));
    FILTER++;
    SetUpdateDelete(FILTER);
  }
  useEffect(()=>{
     renderedMissions = missions.map((mission) => {
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
          <FormControlLabel
        control={<GreenCheckbox checked={state.checkedG} onChange={handleChange} name="checkedG" />}
        label="Custom color"
      />
        </article>
      )
    })
  },[updatedelete]);
  // Sort posts in reverse chronological order by datetime string
  const orderedMissions = missions
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))
  if(FILTERON === false){
   renderedMissions = orderedMissions.map((mission) => {
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
        <FormControlLabel
        control={<GreenCheckbox checked={state.checkedG} onChange={handleChange} name="checkedG" />}
        label="finish"
      />
      </article>
    );
  })
} else{
  const filterMissions = orderedMissions.filter(mission => mission.title.indexOf(search) !==-1);
  renderedMissions = filterMissions.map((mission) =>{
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
        <FormControlLabel
        control={<GreenCheckbox checked={state.checkedG} onChange={handleChange} name="checkedG" />}
        label="finish"
      />
      </article>
    );
  })
}
useEffect(()=>{
  const filterMissions = orderedMissions.filter(mission => mission.title.indexOf(search) !==-1);
      console.log('check');
  renderedMissions = filterMissions.map((mission) =>{
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
        <FormControlLabel
        control={<GreenCheckbox checked={state.checkedG} onChange={handleChange} name="checkedG" />}
        label="finish"
      />
      </article>
    );
    
  })
},[update]);
  const onUpdateSearch = (e) => SetSearch(e.target.value);
  const searchMissions =(e) =>{
    if(e.which === 13){
      console.log('press');
      const filterMissions = orderedMissions.filter(mission => mission.title.indexOf(search) !==-1);
      console.log(filterMissions);
      FILTER++;
      FILTERON = true;
      SetUpdate(FILTER);
  }
}
const Reset =() =>{
  FILTERON = false;
  FILTER++;
  SetUpdateDelete(FILTER);
}
  return (
    <section className="posts-list">
      <h2>Missions</h2>
      <input
          type="text"
          id="search"
          name="search"
          placeholder=""
          value={search}
          onChange={onUpdateSearch}
          onKeyPress={searchMissions}
        />
        <button type="button" onClick={Reset}>Reset</button>
      {renderedMissions}
    </section>
  )
}
