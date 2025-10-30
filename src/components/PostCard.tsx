import { Link } from 'react-router-dom';
import { Post } from '../types/Post';
import './PostCard.css';

interface PostCardProps {
  post: Post;
  onDelete: (id: number) => void;
}

const PostCard = ({ post, onDelete }: PostCardProps) => {
  const handleDelete = () => {
    if (window.confirm('Bạn có chắc muốn xóa bài viết này?')) {
      onDelete(post.id);
    }
  };

  const getShortDescription = (content: string) => {
    return content.substring(0, 100) + '...';
  };

  return (
    <div className="post-card">
      <img src={post.thumbnail} alt={post.title} className="post-thumbnail" />
      <div className="post-card-content">
        <h3>{post.title}</h3>
        <div className="post-meta">
          <span>👤 {post.author}</span>
          <span>📅 {post.date}</span>
        </div>
        <p className="post-description">{getShortDescription(post.content)}</p>
        <div className="post-actions">
          <Link to={`/posts/${post.id}`} className="btn btn-primary">
            Đọc thêm
          </Link>
          <button onClick={handleDelete} className="btn btn-danger">
            🗑️ Xóa
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
