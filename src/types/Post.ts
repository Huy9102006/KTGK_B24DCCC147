export interface Post {
  id: number;
  title: string;
  author: string;
  thumbnail: string;
  content: string;
  category: 'Công nghệ' | 'Du lịch' | 'Ẩm thực' | 'Đời sống' | 'Khác';
  date: string;
}
