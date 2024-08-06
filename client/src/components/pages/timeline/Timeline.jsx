import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DOMPurify from 'dompurify';
import { useUser } from '../../../UserContext';
import API_URL from '../../../config';
// import DEV_URL from '../../../config';
import styles from './timeline.module.css';

const Timeline = () => {
    const [expandYear, setExpandYear] = useState(null);
    const [expandMonth, setExpandMonth] = useState(null);
    const [blogs, setBlogs] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredBlogs, setFilteredBlogs] = useState({});
    const { token } = useUser();

    const handleExpandYear = (panel) => (event, isExpanded) => {
        setExpandYear(isExpanded ? panel : null);
    };

    const handleExpandMonth = (year, month) => (event, isExpanded) => {
        setExpandMonth(isExpanded ? { year, month } : null);
    };

    const formatBlogDisplay = (blogData) => {
        const blogDates = {};
        blogData.forEach((blog) => {
            const dateString = blog.date;
            if (!dateString || !/\d{4}-\d{2}-\d{2}/.test(dateString)) {
                console.error('Invalid date format or undefined date:', dateString);
                return;
            }
            const date = new Date(dateString);
            const year = date.getFullYear().toString();
            const month = date.toLocaleString('default', { month: 'long' });

            if (!blogDates[year]) {
                blogDates[year] = {};
            }

            if (!blogDates[year][month]) {
                blogDates[year][month] = [];
            }

            blogDates[year][month].push(blog);
        });
        return blogDates;
    };

    useEffect(() => {
        const blog_url = `${API_URL}/blogs`;
        fetch(blog_url)
            .then(response => response.json())
            .then(blogData => {
                const sanitizedBlogs = blogData.Data.map(blog => ({
                    ...blog,
                    content: DOMPurify.sanitize(blog.content)
                }));
                const formattedBlogData = formatBlogDisplay(sanitizedBlogs);
                setBlogs(formattedBlogData);
                setFilteredBlogs(formattedBlogData);
            })
            .catch(error => console.error('Failed to fetch blogs:', error));
    }, []);

    const handleDelete = (id, year, month) => {
        if (!token) {
            alert("You must be logged in to delete a blog.");
            return;
        }
        const delete_url = `${API_URL}/delete/${id}`;
        fetch(delete_url, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    setBlogs(newBlogs => {
                        const updatedYear = { ...newBlogs[year] };
                        const updatedMonthBlogs = updatedYear[month].filter(
                            blog => blog._id !== id
                        );
                        updatedYear[month] = updatedMonthBlogs;
                        return {
                            ...newBlogs,
                            [year]: updatedYear
                        };
                    });
                } else {
                    throw new Error("Failed to delete the blog");
                }
            })
            .catch(error => {
                console.error("Delete failed: ", error);
                alert('Failed to delete blog');
            });
    };

    const handleSearch = (event) => {
        const searchValue = event.target.value.toLowerCase();
        setSearchTerm(searchValue);

        const filtered = {};
        Object.keys(blogs).forEach(year => {
            Object.keys(blogs[year]).forEach(month => {
                const matchingBlogs = blogs[year][month].filter(blog =>
                    blog.title.toLowerCase().includes(searchValue) ||
                    blog.author.toLowerCase().includes(searchValue) ||
                    blog.content.toLowerCase().includes(searchValue)
                );
                if (matchingBlogs.length > 0) {
                    if (!filtered[year]) {
                        filtered[year] = {};
                    }
                    filtered[year][month] = matchingBlogs;
                }
            });
        });
        setFilteredBlogs(filtered);
        console.log("filtered: ", filteredBlogs)
    };

    return (
        <div className="wrapper">
            <div className={styles.title}>
                <h1>Recent Blogs</h1>
                <input
                    type="text"
                    placeholder="Search blogs..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className={styles.searchInput}
                />
            </div>
            {Object.keys(filteredBlogs).sort((a, b) => b - a).map(year => (
                <Accordion key={year}
                    expanded={expandYear === year}
                    onChange={handleExpandYear(year)}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>{year}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {Object.keys(filteredBlogs[year]).map(month => (
                            <Accordion key={month}
                                expanded={expandMonth?.year === year && expandMonth?.month === month}
                                onChange={handleExpandMonth(year, month)}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography>{month}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {filteredBlogs[year][month].map((postData, index) => (
                                        <div className={styles.contentContainer} key={index}>
                                            <NavLink to={`/blogs/${postData._id}`} className="nav-link">
                                                <strong>{postData.title}</strong>
                                            </NavLink>
                                            <div><strong>Author:</strong> {postData.author}</div>
                                            <div><strong>Date:</strong> {new Date(postData.date).toLocaleDateString()}</div>
                                            <div className={styles.content} dangerouslySetInnerHTML={{ __html: postData.content }} />
                                            {token && (
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

export default Timeline;