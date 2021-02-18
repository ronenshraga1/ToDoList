import { configureStore } from '@reduxjs/toolkit'

import missionsReducer from '../features/posts/postsSlice'
import usersReducer from '../features/users/usersSlice'

export default configureStore({
  reducer: {
    missions: missionsReducer,
    users: usersReducer,
  },
})
