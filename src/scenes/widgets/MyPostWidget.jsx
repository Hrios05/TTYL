import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPost } from 'state';
import { Box, Button, TextField, useTheme } from '@mui/material';
import FlexBetween from 'components/FlexBetween'; // Adjust the path as needed
import WidgetWrapper from 'components/WidgetWrapper'; // Adjust the path as needed
import temporaryImage from '../../assets2/assets/SJSU1.jpg';

const MyPostWidget = () => {
    const [post, setPostContent] = useState('');
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const { palette } = useTheme();

    const handlePost = async () => {
        const formData = new FormData();
        formData.append('content', post);
        formData.append('image', temporaryImage);

        const response = await fetch('http://localhost:3001/posts', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        const data = await response.json();
        dispatch(setPost(data));
    };

    return (
        <WidgetWrapper>
            <FlexBetween>
                <TextField
                    placeholder="What's on your mind?"
                    value={post}
                    onChange={(e) => setPostContent(e.target.value)}
                    fullWidth
                />
                <Button
                    disabled={!post}
                    onClick={handlePost}
                    sx={{
                        color: palette.background.alt,
                        backgroundColor: palette.primary.main,
                        borderRadius: '3rem',
                    }}
                >
                    POST
                </Button>
            </FlexBetween>
            <Box mt={2}>
                <img
                    src={temporaryImage}
                    alt="Temporary"
                    style={{ width: '100%', height: 'auto', borderRadius: '1rem' }}
                />
            </Box>
        </WidgetWrapper>
    );
};

export default MyPostWidget;