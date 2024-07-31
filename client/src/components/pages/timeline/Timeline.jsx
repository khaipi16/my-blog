// import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DOMPurify from 'dompurify';
import { Months } from './Months';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './timeline.module.css';
import { useUser } from '../../../UserContext';
import API_URL from '../../../config';



const Timeline = () => {
    const [expandYear, setExpandYear] = useState(null);
    const [expandMonth, setExpandMonth] = useState(null);
    const[blogs, setBlogs] = useState({});
    const{token} = useUser()

    const handleExpandYear = (panel) => (event, isExpanded) => {
        setExpandYear(isExpanded ? panel : null);
    }

    const handleExpandMonth = (year, month) => (event, isExpanded) => {
        setExpandMonth(isExpanded ? { year, month } : null);
    }

    const formatBlogDisplay = (blogData) => {
        const blogDates = {};

        blogData.forEach((blog) => {
            const dateString= (blog.date); // Get the date string

            // Guard clause to handle undefined or unexpected date format
            if (!dateString || !/\d{4}-\d{2}-\d{2}/.test(dateString)) {
              console.error('Invalid date format or undefined date:', dateString);
              return; // Skip processing this blog entry
            }
            const date = new Date(dateString)
            const year = date.getFullYear().toString();
            const month = date.toLocaleString('default', { month: 'long' });

            // Ensures year and month are initialized
            if (!blogDates[year]) {
                blogDates[year] = {};
            }

            if (!blogDates[year][month]) {
            blogDates[year][month] = [];
            }

            blogDates[year][month].push(blog);

        });
        return blogDates;
    }


    useEffect(() => {
        const blog_url = `${API_URL}/blogs`;
        const blog_url2 = 'https://52.91.80.202:5000/blogs';

        fetch(blog_url)
            .then(response => response.json())
                .then(blogData => {
                    // Assuming blogData.Data is an array of blog posts
                    const sanitizedBlogs = blogData.Data.map(blog => ({
                        ...blog,
                        content: DOMPurify.sanitize(blog.content)  // Sanitize each blog's content
                    }));

                    // Assuming formatBlogDisplay formats the whole array
                    const formattedBlogData = formatBlogDisplay(sanitizedBlogs);
                    setBlogs(formattedBlogData);  // Update state with sanitized and formatted data
                })
                .catch(error => console.error('Failed to fetch blogs:', error));
    }, []);  // Dependency array is empty to run only once on component mount


    const handleDelete = (id, year, month) => {
        
        if(!token) {
            alert("You must be logged in to delete a blog.");
            return;
        }
        const delete_url = `${API_URL}/delete/${id}`;
        const delete_url2 = `https://52.91.80.202:5000/delete/${id}`

        fetch(delete_url, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                setBlogs(newBlogs => {
                    const updatedYear = {...newBlogs[year]}; // Year object contains all the months
                    const updatedMonthBlogs = updatedYear[month].filter( // Month object contains all the blogs
                        blog => blog._id !== id
                    )
                    updatedYear[month] = updatedMonthBlogs;

                    return {
                        ...newBlogs,
                        [year]: updatedYear
                    };

                });
            }
            else {
                    throw new Error("Failed to delete the blog");
                }
            })
        .catch(error => {
            console.error("Delete failed: ", error);
            alert('Failed to delete blog');
        });
    };



    return (
        <div className="wrapper">
            <h1>Recent Blogs</h1>
            {Object.keys(blogs).sort((a, b) => b - a).map(year => (
                <Accordion key={year}
                        expanded={expandYear === year}
                        onChange={handleExpandYear(year)}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>{year}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {Object.keys(blogs[year]).map(month => (
                            <Accordion key={month}
                                    expanded={expandMonth?.year === year && expandMonth?.month === month}
                                    onChange={handleExpandMonth(year, month)}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography>{month}</Typography>
                                </AccordionSummary>
                                <AccordionDetails >
                                    {blogs[year][month].map((postData, index) => (
                                        <div className={styles.contentContainer} key={index}>
                                            <NavLink to={`/blogs/${postData._id}`} className="nav-link">
                                                <strong>{postData.title}</strong>
                                            </NavLink>
                                            <div><strong>Author:</strong> {postData.author}</div>
                                            <div><strong>Date:</strong> {new Date(postData.date).toLocaleDateString()}</div>
                                            <div className={styles.content} dangerouslySetInnerHTML={{__html: postData.content}} />
                                            {token && ( // only shows if token is present
                                                <div className={styles.buttons}>
                                                <button className={styles.updateButton}>Update</button>
                                                <button 
                                                        className={styles.deleteButton}
                                                        onClick={() => handleDelete(postData._id, year, month)}
                                                        >Delete
                                                </button>
                                            </div>
                                            )}
                                        </div>
                                    ))}
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
}

export default Timeline