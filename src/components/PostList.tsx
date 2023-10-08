import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { AppDispatch, RootState } from '../store/store';
import { Post, fetchPosts } from '../slices/postsSlice';

import { Card, CardContent, Typography } from '@mui/material';


function PostList() {
  const dispatch: AppDispatch = useDispatch();
  const { data, status, error }: { data: Post[], status: string, error: string | null } = useSelector((state: RootState) => state.posts);


  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {data.map((post) => (
        <Card key={post.id} variant="outlined" style={{ marginBottom: '16px' }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {post.title}
            </Typography>
            <Typography variant="body2">{post.body}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default PostList;
