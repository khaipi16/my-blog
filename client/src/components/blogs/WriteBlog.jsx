import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from '../blogs/write.module.css';
import { Navigate } from 'react-router-dom';

export const WriteBlog = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [content, setContent] = useState('');
    const [redirect, setRedirect] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const token = localStorage.getItem('token')
        if(!token) {
          alert("You must be logged in to post a blog.");
          return;
        }
        const blog_url = 'http://127.0.0.1:5000/write';
        const blog_url2 = 'https://52.91.80.202:5000/write';

        const data = JSON.stringify({
            title,
            author,
            category,
            content
        });

        console.log("Data to send: ", data);

        try {
            const response = await fetch(blog_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Correct header for JSON
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, //
                },
                body: data,
            });
            console.log("res: ", response)
            if(response.status===401) {
              alert("You do not have permission to post a blog. Please contact the owner.")
            }

            if (!response.ok) {
                const errorResponse = await response.json(); // Properly calling json() to parse the response
                throw new Error(`HTTP error: ${errorResponse.error}`); // Assuming error is returned as { error: 'message' }
            }

            const result = await response.json();
            alert("Successfully posted blog!")
            setRedirect(true)
            // Handle successful post, e.g., clear the form, show a success message, navigate, etc.
        }
        catch (error) {
            console.error("Error submitting blog: ", error.message);
        }
    };

    if(redirect) {
      return <Navigate to={"/"} />
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Write a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
                </div>
                <div className="form-group">
                    <label htmlFor="author">Author</label>
                    <input type="text" className="form-control" id="author" value={author} onChange={e => setAuthor(e.target.value)} placeholder="Author" required />
                </div>
                {/* <div className="form-group col-md-6">
                    <input type="date" className="form-control" id="date" 
                    value={date}
                    required
                    onChange={ev => setDate(ev.target.value)}/>
                </div> */}
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select className="form-control" id="category" value={category} onChange={e => setCategory(e.target.value)} required>
                        <option value="">Select category</option>
                        <option value="technology">Technology</option>
                        <option value="health">Health</option>
                        <option value="lifestyle">Lifestyle</option>
                        <option value="education">Education</option>
                    </select>
                </div>
                <div className="form-group">
                    <ReactQuill value={content} onChange={setContent} placeholder='Today marks the beginning of...' />
                </div>
                <button type="submit" className="btn btn-primary submitButton">Submit</button>
            </form>
        </div>
    );
};
