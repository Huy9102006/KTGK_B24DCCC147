import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostDetail from './components/PostDetail';
import EditPost from './components/EditPost';
import { Post } from './types/Post';
import './App.css';

const App = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      title: 'Khám phá React và TypeScript - Công nghệ hiện đại',
      author: 'Nguyễn Văn A',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500',
      content: 'React và TypeScript là sự kết hợp hoàn hảo cho phát triển ứng dụng web hiện đại. TypeScript mang đến type safety, giúp phát hiện lỗi sớm trong quá trình phát triển. React cung cấp component-based architecture giúp tái sử dụng code hiệu quả. Việc kết hợp hai công nghệ này giúp xây dựng ứng dụng scalable và maintainable.',
      category: 'Công nghệ',
      date: '28/10/2025'
    },
    {
      id: 2,
      title: 'Du lịch Đà Lạt - Thành phố ngàn hoa',
      author: 'Trần Thị B',
      thumbnail: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=500',
      content: 'Đà Lạt là một trong những địa điểm du lịch hấp dẫn nhất Việt Nam với khí hậu mát mẻ quanh năm. Thành phố này nổi tiếng với những vườn hoa đẹp, hồ Xuân Hương thơ mộng, và các quán cà phê độc đáo. Đừng quên thử các món đặc sản như bánh tráng nướng, sữa đậu nành và dâu tây tươi.',
      category: 'Du lịch',
      date: '27/10/2025'
    },
    {
      id: 3,
      title: 'Món phở Hà Nội - Tinh hoa ẩm thực Việt',
      author: 'Lê Văn C',
      thumbnail: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=500',
      content: 'Phở là món ăn truyền thống của người Việt, đặc biệt là phở Hà Nội với hương vị đậm đà khó quên. Nước dùng được ninh từ xương trong nhiều giờ, thịt bò tái mỏng, bánh phở mềm dai. Một tô phở nóng hổi là lựa chọn hoàn hảo cho bữa sáng hay bất cứ thời điểm nào trong ngày.',
      category: 'Ẩm thực',
      date: '26/10/2025'
    },
    {
      id: 4,
      title: 'Cân bằng công việc và cuộc sống trong thời đại số',
      author: 'Phạm Thị D',
      thumbnail: 'https://images.unsplash.com/photo-1499728603263-13726abce5fd?w=500',
      content: 'Trong thời đại công nghệ phát triển, việc cân bằng giữa công việc và cuộc sống cá nhân trở nên quan trọng hơn bao giờ hết. Hãy dành thời gian cho gia đình, bạn bè và sở thích cá nhân. Tập thể dục đều đặn, ăn uống lành mạnh và ngủ đủ giấc là những yếu tố quan trọng cho sức khỏe tinh thần và thể chất.',
      category: 'Đời sống',
      date: '25/10/2025'
    },
    {
      id: 5,
      title: 'Trí tuệ nhân tạo đang thay đổi thế giới như thế nào',
      author: 'Hoàng Văn E',
      thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500',
      content: 'AI đang cách mạng hóa mọi ngành công nghiệp từ y tế, giáo dục đến tài chính. Machine Learning và Deep Learning cho phép máy tính học hỏi từ dữ liệu và đưa ra quyết định thông minh. Các ứng dụng như ChatGPT, DALL-E đang mở ra những khả năng mới cho sáng tạo và năng suất làm việc.',
      category: 'Công nghệ',
      date: '24/10/2025'
    },
    {
      id: 6,
      title: 'Những bí quyết chụp ảnh du lịch đẹp lung linh',
      author: 'Võ Thị F',
      thumbnail: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=500',
      content: 'Để có những bức ảnh du lịch đẹp, bạn cần chú ý đến ánh sáng tự nhiên, góc chụp sáng tạo và composition. Golden hour (sáng sớm và chiều tà) là thời điểm lý tưởng nhất. Hãy thử nghiệm với các góc độ khác nhau, sử dụng rule of thirds, và đừng ngại post-processing để ảnh thêm sinh động.',
      category: 'Du lịch',
      date: '23/10/2025'
    }
  ]);

  const handleDeletePost = (id: number) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  const handleSavePost = (postData: Omit<Post, 'id'> | Post) => {
    if ('id' in postData) {
      setPosts(posts.map(post => post.id === postData.id ? postData as Post : post));
    } else {
      const newPost: Post = {
        ...postData,
        id: Math.max(...posts.map(p => p.id), 0) + 1
      };
      setPosts([newPost, ...posts]);
    }
  };

  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route 
            path="/" 
            element={<PostList posts={posts} onDelete={handleDeletePost} />} 
          />
          {/* Hỗ trợ cả 2 route: /create và /posts/create */}
          <Route 
            path="/create" 
            element={<PostForm onSave={handleSavePost} />} 
          />
          <Route 
            path="/posts/create" 
            element={<PostForm onSave={handleSavePost} />} 
          />
          <Route 
            path="/posts/:id" 
            element={<PostDetail posts={posts} onDelete={handleDeletePost} />} 
          />
          <Route 
            path="/posts/edit/:id" 
            element={<EditPost posts={posts} onUpdate={handleSavePost} />} 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
