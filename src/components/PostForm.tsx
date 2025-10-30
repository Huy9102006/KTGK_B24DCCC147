import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Post } from '../types/Post';
import './PostForm.css';

interface PostFormProps {
  onSave: (post: Omit<Post, 'id'>) => void;
}

const PostForm = ({ onSave }: PostFormProps) => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    thumbnail: '',
    content: '',
    category: 'Công nghệ' as Post['category']
  });
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Validation theo yêu cầu
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    
    // Tiêu đề: Bắt buộc, ít nhất 10 ký tự
    if (!formData.title.trim()) {
      newErrors.title = 'Tiêu đề là bắt buộc';
    } else if (formData.title.length < 10) {
      newErrors.title = 'Tiêu đề phải có ít nhất 10 ký tự';
    }
    
    // Tác giả: Bắt buộc, ít nhất 3 ký tự
    if (!formData.author.trim()) {
      newErrors.author = 'Tác giả là bắt buộc';
    } else if (formData.author.length < 3) {
      newErrors.author = 'Tên tác giả phải có ít nhất 3 ký tự';
    }
    
    // Nội dung: Bắt buộc, ít nhất 50 ký tự
    if (!formData.content.trim()) {
      newErrors.content = 'Nội dung là bắt buộc';
    } else if (formData.content.length < 50) {
      newErrors.content = 'Nội dung phải có ít nhất 50 ký tự';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Xử lý đăng bài
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    // Tự động thêm ngày đăng = ngày hiện tại
    const currentDate = new Date().toLocaleDateString('vi-VN');
    
    const newPost = {
      ...formData,
      date: currentDate
    };

    onSave(newPost);
    
    // Hiển thị alert và chuyển về trang chủ
    alert('Đăng bài thành công!');
    navigate('/');
  };

  // Button Hủy - quay lại trang chủ
  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="post-form-container">
      <h1>Tạo bài viết mới</h1>
      <form onSubmit={handleSubmit} className="post-form">
        
        {/* Tiêu đề */}
        <div className="form-group">
          <label>Tiêu đề *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className={errors.title ? 'error' : ''}
            placeholder="Nhập tiêu đề bài viết (tối thiểu 10 ký tự)"
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>

        {/* Tác giả */}
        <div className="form-group">
          <label>Tác giả *</label>
          <input
            type="text"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            className={errors.author ? 'error' : ''}
            placeholder="Nhập tên tác giả (tối thiểu 3 ký tự)"
          />
          {errors.author && <span className="error-message">{errors.author}</span>}
        </div>

        {/* URL ảnh thumbnail */}
        <div className="form-group">
          <label>URL ảnh thumbnail</label>
          <input
            type="text"
            value={formData.thumbnail}
            onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
            placeholder="Nhập URL ảnh thumbnail (không bắt buộc)"
          />
        </div>

        {/* Thể loại/Category */}
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

        {/* Nội dung bài viết */}
        <div className="form-group">
          <label>Nội dung *</label>
          <textarea
            rows={10}
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className={errors.content ? 'error' : ''}
            placeholder="Nhập nội dung bài viết (tối thiểu 50 ký tự)"
          />
          {errors.content && <span className="error-message">{errors.content}</span>}
          <div className="char-count">
            {formData.content.length} ký tự
          </div>
        </div>

        {/* Buttons */}
        <div className="form-actions">
          <button type="submit" className="btn btn-submit">
            📝 Đăng bài
          </button>
          <button type="button" onClick={handleCancel} className="btn btn-cancel">
            ❌ Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
