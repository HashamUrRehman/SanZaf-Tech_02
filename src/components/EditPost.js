import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchPost, editPost } from '../api/api';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    const loadPost = async () => {
      try {
        const post = await fetchPost(id);
        setTitle(post.title);
        setBody(post.body);
      } catch (error) {
        console.error('Error loading post:', error);
      }
    };
    loadPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editPost(id, { title, body });
      alert('Post updated!');
      navigate(`/post/${id}`); // Redirect to the updated post's page
    } catch (error) {
      alert('Failed to update the post.');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <button type="submit">Update Post</button>
    </form>
  );
};

export default EditPost;
