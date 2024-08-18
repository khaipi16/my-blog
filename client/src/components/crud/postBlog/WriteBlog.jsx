import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Select from 'react-select';
import styles from './write.module.css';
import { Navigate } from 'react-router-dom';
// import DEV_URL from '../../config';
import API_URL from '../../../config';



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
    { value: 'Data Structure' , label: 'Data Structure' },
    { value: 'Arrays/Hashing', label: 'Arrays/Hashing' },
    { value: 'Strings', label: 'Strings' },
    { value: 'Two-Pointers', label: 'Two-Pointers' },
    { value: 'Sliding Window', label: 'Sliding Window' },
    { value: 'Stacks', label: 'Stacks'},
    { value: 'Binary Search', label: 'Binary Search' },
    { value: 'Linked List', label: 'Linked List' },
    { value: 'Trees', label: 'Trees' },
    { value: 'Heap/Priority Queue', label: 'Heap/Priority Queue' },
    { value: 'Backtracking', label: 'Backtracking' },
    { value: 'Tries', label: 'Tries' },
    { value: 'Graphs', label: 'Graphs' },
    { value: 'Advanced Graphs', label: 'Advanced Graphs' },
    { value: 'Greedy', label: 'Greedy' },
    { value: '1-D Dynamic Programming', label: '1-D Dynamic Programming' },
    { value: '2-D Dyanmic Programming', label: '2-D Dyanmic Programming' },
    { value: 'Intervals', label: 'Intervals' },
    { value: 'Math & Geometry', label: 'Math & Geometry' },
    { value: 'Bit Manipulation', label: 'Bit Manipulation' }
];

export const WriteBlog = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState(null); // Single category
    const [content, setContent] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [errors, setErrors] = useState({}); // For validation errors

    const validate = () => {
        const newErrors = {};
        if (!title) newErrors.title = 'Title is required';
        if (!author) newErrors.author = 'Author is required';
        if (!category) newErrors.category = 'Category is required';
        if (!content) newErrors.content = 'Content is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return; // Stop submission if validation fails

        const token = localStorage.getItem('token');
        if (!token) {
            alert("You must be logged in to post a blog.");
            return;
        }
        const blog_url = `${API_URL}/write`;

        const data = JSON.stringify({
            title,
            author,
            category: category.value, // Single category value
            content
        });

        try {
            const response = await fetch(blog_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: data,
            });

            if (response.status === 401) {
                alert("You do not have permission to post a blog. Please contact the owner.");
            }

            if (response.status === 403) {
                alert("You have reached you're upload limit!")
            }

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(`HTTP error: ${errorResponse.error}`);
            }

            const result = await response.json();
            alert("Successfully posted blog!");
            setRedirect(true);
        } catch (error) {
            console.error("Error submitting blog: ", error.message);
        }
    };

    if (redirect) {
        return <Navigate to={"/"} />;
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Write a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="title" 
                        value={title} 
                        onChange={e => setTitle(e.target.value)} 
                        placeholder="Title" 
                        required 
                    />
                    {errors.title && <div className="text-danger">{errors.title}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="author">Author</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="author" 
                        value={author} 
                        onChange={e => setAuthor(e.target.value)} 
                        placeholder="Author" 
                        required 
                    />
                    {errors.author && <div className="text-danger">{errors.author}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <Select
                        options={categoryOptions}
                        value={category}
                        onChange={setCategory}
                        className="basic-single"
                        classNamePrefix="select"
                        isClearable
                        placeholder="Select a category"
                        required
                    />
                    {errors.category && <div className="text-danger">{errors.category}</div>}
                </div>
                <div className="form-group">
                    <ReactQuill 
                        value={content} 
                        onChange={setContent} 
                        placeholder='Today marks the beginning of...' 
                        required 
                    />
                    {errors.content && <div className="text-danger">{errors.content}</div>}
                </div>
                <button type="submit" className="btn btn-primary submitButton">Submit</button>
            </form>
        </div>
    );
};