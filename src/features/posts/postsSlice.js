import { createSlice, nanoid } from '@reduxjs/toolkit'
import { sub } from 'date-fns'

const initialState = [
  
]

const missionsSlice = createSlice({
  name: 'missions',
  initialState,
  reducers: {
    missionAdded: {
      reducer(state, action) {
        state.push(action.payload)
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title:title,
            content:content,
            user: userId,
          },
        }
      },
    },
    
    missionUpdated(state, action) {
      const { id, title, content } = action.payload
      const existingPost = state.find((post) => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
    deleteMission(state,action){
      const id = action.payload;
      console.log(state);
      console.log(id);
      const existingPost = state.find((post) => post.id === id)
      if(existingPost){
        state.splice(parseInt(id),1);
      }
    }
  },
})

export const { missionAdded, missionUpdated ,deleteMission} = missionsSlice.actions

export default missionsSlice.reducer
