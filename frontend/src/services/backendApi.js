import axios from 'axios';

export const fetchBlogs = async () => {
  const response = await axios.get('/api/blog');
  return response.data;
};
