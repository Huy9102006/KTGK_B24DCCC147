import { useParams, useNavigate, Link } from 'react-router-dom';
import { Post } from '../types/Post';
import './PostDetail.css';

interface PostDetailProps {
  posts: Post[];
  onDelete: (id: number) => void;
}

const PostDetail = ({ posts, onDelete }: PostDetailProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const post = posts.find(p => p.id === Number(id));

  if (!post) {
    return (
      <div className="post-detail-container">
        <h2>Không tìm thấy bài viết</h2>
        <Link to="/" className="btn btn-back">⬅️ Quay lại</Link>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm('Bạn có chắc muốn xóa bài viết này?')) {
      onDelete(post.id);
      navigate('/');
    }
  };

  return (
    <div className="post-detail-container">
      <article className="post-detail">
        <img src={post.thumbnail} alt={post.title} className="post-detail-image" />
        <div className="post-detail-content">
          <span className="post-category">{post.category}</span>
          <h1>{post.title}</h1>
          <div className="post-detail-meta">
            <span>✍️ Tác giả: {post.author}</span>
            <span>📅 Ngày đăng: {post.date}</span>
          </div>
          <div className="post-detail-text">
            {post.content}
          </div>
          <div className="post-detail-actions">
            <Link to="/" className="btn btn-back">
              ⬅️ Quay lại
            </Link>
            <Link to={`/posts/edit/${post.id}`} className="btn btn-edit">
              ✏️ Chỉnh sửa
            </Link>
            <button onClick={handleDelete} className="btn btn-delete">
              🗑️ Xóa bài viết
            </button>
          </div>
        </div>
      </article>
    </div>
  );
};

export default PostDetail;
