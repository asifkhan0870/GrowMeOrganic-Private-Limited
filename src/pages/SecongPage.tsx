
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { Post } from '../types';
import ExpandableList from '../components/ExpandableList';
import { departments } from '../data/departments';

const SecondPage: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 5,
  });

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      alert('You must enter your details before accessing this page');
      navigate('/');
    } else {
      fetchPosts();
    }
  }, [navigate]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns: GridColDef[] = [
    { field: 'userId', headerName: 'User ID', width: 90 },
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'body', headerName: 'Body', width: 500 },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>Posts Data</h2>
      <div style={{ height: 400, width: '100%', marginBottom: '20px' }}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <DataGrid
            rows={posts.map((post) => ({ ...post, id: post.id }))}
            columns={columns}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[5]}
          />
        )}
      </div>
      <h2>Department List</h2>
      <ExpandableList departments={departments} />
    </div>
  );
};

export default SecondPage;
