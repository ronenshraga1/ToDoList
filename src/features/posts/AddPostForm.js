import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { missionAdded } from './postsSlice';

export const AddMissionForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');

  const dispatch = useDispatch()
  const users = useSelector((state) => state.users);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  const onSaveMissionClicked = () => {
    if (title && content) {
      dispatch(missionAdded(title, content, userId))
      setTitle('');
      setContent('');
      setUserId('');
    }
  }

  const canSave = Boolean(title) && Boolean(content) && Boolean(userId)

  return (
    <section>
      <h2>Add a new Mission</h2>
      <form>
        <label htmlFor="postTitle">Mission Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <input
          type="text"
          id="postAuthor"
          name="postAuthor"
          placeholder=""
          value={userId}
          onChange={onAuthorChanged}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSaveMissionClicked} disabled={!canSave}>
          Save Mission
        </button>
      </form>
    </section>
  )
}
