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
      title: 'Khám phá React và TypeScript',
      author: 'Nguyễn Văn A',
      thumbnail: 'data:image/png;base64,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',
      content: 'React và TypeScript là sự kết hợp hoàn hảo cho phát triển ứng dụng web hiện đại. ',
      category: 'Công nghệ',
      date: '28/10/2025'
    },
 
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
