import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Blog from './components/Blog';
import Pagination from './components/Pagination';
import Filter from './components/Filter';
import PostForm from './components/PostForm';
import './assets/css/styles.css';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [editingPost, setEditingPost] = useState(null);

  // Fetch posts from API
  const fetchPosts = async () => {
    try {
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(res.data);
      setFilteredPosts(res.data);
      setTotalPages(Math.ceil(res.data.length / 5)); // For pagination
    } catch (error) {
      console.error('Error fetching posts', error);
    }
  };

  // Handle post creation
  const handleCreatePost = (newPost) => {
    setPosts([newPost, ...posts]);
    setFilteredPosts([newPost, ...posts]);
    setTotalPages(Math.ceil([newPost, ...posts].length / 5)); // Update pagination
  };

  // Handle post editing
  const handleEditPost = (updatedPost) => {
    const updatedPosts = posts.map((post) =>
      post.id === updatedPost.id ? updatedPost : post
    );
    setPosts(updatedPosts);
    setFilteredPosts(updatedPosts);
    setTotalPages(Math.ceil(updatedPosts.length / 5)); // Update pagination
    setEditingPost(null); // Reset editing state
  };

  // Handle post deletion
  const handleDeletePost = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
    setFilteredPosts(updatedPosts);
    setTotalPages(Math.ceil(updatedPosts.length / 5)); // Update pagination
  };

  // Handle search/filter
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setFilteredPosts(posts.filter((post) =>
      post.title.toLowerCase().includes(e.target.value.toLowerCase())
    ));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="blog-app">
      <h1 className="blog-title">My Blog</h1>
      <Filter search={search} handleSearch={handleSearch} />
      
      {/* Show PostForm for creating or editing posts */}
      <PostForm
        onCreatePost={handleCreatePost}
        onEditPost={handleEditPost}
        editingPost={editingPost}
      />
      
      <Blog posts={filteredPosts.slice((page - 1) * 5, page * 5)} 
            onEditPost={setEditingPost}
            onDeletePost={handleDeletePost} />
      
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default App;
