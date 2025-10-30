import { useState } from 'react';
import { Link } from 'react-router-dom';
import PostCard from './PostCard';
import { Post } from '../types/Post';
import './PostList.css';

interface PostListProps {
  posts: Post[];
  onDelete: (id: number) => void;
}

const PostList = ({ posts, onDelete }: PostListProps) => {
  const [filter, setFilter] = useState('');

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="post-list-container">
      <div className="post-list-header">
        <h1>Danh sách bài viết</h1>
        <div className="header-actions">
          <p className="post-count">Tổng số bài viết: {filteredPosts.length}</p>
          <Link to="/create" className="btn-create">
            ➕ Viết bài mới
          </Link>
        </div>
        <input
          type="text"
          placeholder="🔍 Tìm kiếm theo tiêu đề..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="post-grid">
        {filteredPosts.map(post => (
          <PostCard key={post.id} post={post} onDelete={onDelete} />
        ))}
      </div>
      {filteredPosts.length === 0 && (
        <p className="no-posts">Không tìm thấy bài viết nào</p>
      )}
    </div>
  );
};

export default PostList;
