import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Navbar } from './app/Navbar'

import { MissionsList } from './features/posts/PostsList'
import { AddMissionForm } from './features/posts/AddPostForm'
import { EditPostForm } from './features/posts/EditPostForm'
import { SinglePostPage } from './features/posts/SinglePostPage'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <React.Fragment>
                <AddMissionForm />
                <MissionsList />
              </React.Fragment>
            )}
          />
          <Route exact path="/missions/:missionId" component={SinglePostPage} />
          <Route exact path="/editMission/:missionId" component={EditPostForm} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App

