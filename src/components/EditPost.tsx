import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Post } from '../types/Post';
import './PostForm.css';

interface EditPostProps {
  posts: Post[];
  onUpdate: (post: Post) => void;
}

const EditPost = ({ posts, onUpdate }: EditPostProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const postToEdit = posts.find(p => p.id === Number(id));
  
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    thumbnail: '',
    content: '',
    category: 'Công nghệ' as Post['category']
  });
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (postToEdit) {
      setFormData({
        title: postToEdit.title,
        author: postToEdit.author,
        thumbnail: postToEdit.thumbnail,
        content: postToEdit.content,
        category: postToEdit.category
      });
    }
  }, [postToEdit]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (formData.title.length < 10) {
      newErrors.title = 'Tiêu đề phải có ít nhất 10 ký tự';
    }
    
    if (formData.author.length < 3) {
      newErrors.author = 'Tên tác giả phải có ít nhất 3 ký tự';
    }
    
    if (formData.content.length < 50) {
      newErrors.content = 'Nội dung phải có ít nhất 50 ký tự';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    if (postToEdit) {
      const updatedPost: Post = {
        ...formData,
        id: postToEdit.id,
        date: postToEdit.date
      };

      onUpdate(updatedPost);
      alert('Cập nhật thành công!');
      navigate(`/posts/${postToEdit.id}`);
    }
  };

  const handleCancel = () => {
    if (postToEdit) {
      navigate(`/posts/${postToEdit.id}`);
    } else {
      navigate('/');
    }
  };

  if (!postToEdit) {
    return (
      <div className="post-form-container">
        <h2>Không tìm thấy bài viết cần chỉnh sửa</h2>
        <button onClick={() => navigate('/')} className="btn btn-cancel">
          Quay lại trang chủ
        </button>
      </div>
    );
  }

  return (
    <div className="post-form-container">
      <h1>Chỉnh sửa bài viết</h1>
      <form onSubmit={handleSubmit} className="post-form">
        <div className="form-group">
          <label>Tiêu đề *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className={errors.title ? 'error' : ''}
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label>Tác giả *</label>
          <input
            type="text"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            className={errors.author ? 'error' : ''}
          />
          {errors.author && <span className="error-message">{errors.author}</span>}
        </div>

        <div className="form-group">
          <label>URL ảnh thumbnail</label>
          <input
            type="text"
            value={formData.thumbnail}
            onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Thể loại</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value as Post['category'] })}
          >
            <option value="Công nghệ">Công nghệ</option>
            <option value="Du lịch">Du lịch</option>
            <option value="Ẩm thực">Ẩm thực</option>
            <option value="Đời sống">Đời sống</option>
            <option value="Khác">Khác</option>
          </select>
        </div>

        <div className="form-group">
          <label>Nội dung *</label>
          <textarea
            rows={10}
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className={errors.content ? 'error' : ''}
          />
          {errors.content && <span className="error-message">{errors.content}</span>}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-submit">
            ✅ Cập nhật
          </button>
          <button type="button" onClick={handleCancel} className="btn btn-cancel">
            ❌ Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
