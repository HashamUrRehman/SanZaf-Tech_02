import React, { useState, useEffect } from 'react';

const PostForm = ({ onCreatePost, onEditPost, editingPost }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  // If we're editing, load the post's data into the form
  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setBody(editingPost.body);
    }
  }, [editingPost]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingPost) {
      // Edit existing post
      onEditPost({ ...editingPost, title, body });
    } else {
      // Create new post
      const newPost = {
        id: Date.now(), // Generate a unique ID (in a real app, the backend provides this)
        title,
        body,
      };
      onCreatePost(newPost);
    }
    setTitle('');
    setBody('');
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <h2>{editingPost ? 'Edit Post' : 'Create New Post'}</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
      />
      <button type="submit">{editingPost ? 'Update Post' : 'Create Post'}</button>
    </form>
  );
};

export default PostForm;
