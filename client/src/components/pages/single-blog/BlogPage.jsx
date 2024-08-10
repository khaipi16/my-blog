import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Paper, Typography } from '@mui/material';
import styles from './blogpage.module.css';
import DOMPurify from 'dompurify';
import API_URL from '../../../config';


const BlogPage = () => {

    const[blog, setBlog] = useState('');
    // Extract 'id' parameter from url
    const { id } = useParams();

    useEffect(() => {
        const blog_url = `${API_URL}/blogs/${id}`;
        const blog_url2 = `https://52.91.80.202:5000/blogs/${id}`;

        fetch(blog_url)
            .then(response => response.json())
                .then(BlogData => {

                    // Sanitize blog content before setting it to setBlog
                    const safeHTMLContent = DOMPurify.sanitize(BlogData.Data.content);
                    setBlog({...BlogData.Data, content: safeHTMLContent})
                })
    }, [])

    return (
        <Paper className={styles.blogContainer}>
            <Typography className={styles.title} variant="h4" component="h1" gutterBottom>
                {blog.title}
            </Typography>
            <Typography className={styles.author}  variant="subtitle1" color="textSecondary">
                {blog.author} - {blog.date}
            </Typography>
            {/* <Typography component="div" variant="body2" className={styles.content}>
                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            </Typography> */}
            <div className={styles.content}> {/* mb-2 for margin-bottom */}
                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            </div>

        </Paper>
    );
}

export default BlogPage;
