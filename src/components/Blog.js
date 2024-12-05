import React from 'react';
import BlogPost from './BlogPost';

const Blog = ({ posts, onEditPost, onDeletePost }) => {
  return (
    <div className="blog-posts">
      {posts.map(post => (
        <div key={post.id} className="blog-post-container">
          <BlogPost post={post} />
          <div className="post-actions">
            <button onClick={() => onEditPost(post)}>Edit</button>
            <button onClick={() => onDeletePost(post.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blog;
