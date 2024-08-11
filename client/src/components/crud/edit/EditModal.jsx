import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Typography } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Select from 'react-select'; // Import Select from react-select

const EditModal = ({ open, handleClose, blogData, handleUpdate }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (blogData) {
            setTitle(blogData.title || '');
            setAuthor(blogData.author || '');
            setCategory({ value: blogData.category, label: blogData.category } || '');
            setContent(blogData.content || '');
        }
    }, [blogData]);

    const categoryOptions = [
        { value: 'Blogs', label: 'Blogs' },
        { value: 'Helpful Commands', label: 'Helpful Commands' },
        { value: 'Bugs', label: 'Bugs' },
        { value: 'Java', label: 'Java' },
        { value: 'Python', label: 'Python' },
        { value: 'Javascript', label: 'JavaScript' },
        { value: 'Spring', label: 'Spring' },
        { value: 'React', label: 'React' },
        { value: 'Angular', label: 'Angular' },
        { value: 'Code Challenge', label: 'Code Challenges' },
        { value: 'CSS', label: 'CSS' },
        { value: 'SQL', label: 'SQL' },
        { value: 'Database', label: 'Database' },
        { value: 'Cloud', label: 'Cloud' },
    ];

    const handleSave = () => {
        if (blogData) {
            handleUpdate({ 
                ...blogData, 
                title, 
                author, 
                category: category.value, // Extract value from the selected category
                content 
            });
        }
        handleClose();
    };

    return (
        <Dialog open={open} 
                onClose={handleClose}
                fullWidth
                maxWidth="lg"
        >
            <DialogTitle>Edit Blog</DialogTitle>
            <DialogContent>
                {blogData ? (
                    <>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Title"
                            fullWidth
                            variant="outlined"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        <TextField
                            margin="dense"
                            label="Author"
                            fullWidth
                            variant="outlined"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            required
                        />
                        <Select
                            options={categoryOptions}
                            value={category}
                            onChange={(selectedOption) => setCategory(selectedOption)}
                            className="basic-single"
                            classNamePrefix="select"
                            isClearable
                            placeholder="Select a category"
                            required
                        />
                        <ReactQuill
                            theme="snow"
                            value={content}
                            onChange={setContent}
                            style={{ marginTop: '20px' }}
                            required
                        />
                    </>
                ) : (
                    <Typography>Loading...</Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditModal;
