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
import styles from './timeline.module.css';
import EditModal from '../../crud/edit/EditModal';
import deleteBlog from '../../crud/delete/DeleteBlog';
import editBlog from '../../crud/edit/EditBlog';


const Timeline = () => {
    const [expandYear, setExpandYear] = useState(null);
    const [expandMonth, setExpandMonth] = useState(null);
    const [blogs, setBlogs] = useState({});
    const [filteredBlogs, setFilteredBlogs] = useState({});
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
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


    const handleOpenModal = (blog) => {
        setSelectedBlog(blog);
        setIsModalOpen(true);
    };

    const handleUpdateBlog = (currentBlog) => {
        // Call the editBlog function with the updated data
        editBlog(currentBlog, setBlogs, setFilteredBlogs, true);
        handleCloseModal(); // Close the modal after the update
    };


    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedBlog(null);
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
    };

    const limitContent = (content, maxLength) => {
        if(content.length > maxLength) {
            return content.slice(0, maxLength) + "...";
        }
        return content
    }
    

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

            {Object.keys(filteredBlogs).length > 0 ? (
                Object.keys(filteredBlogs).sort((a, b) => b - a).map(year => (
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
                                        {filteredBlogs[year][month].map(postData => (
                                            <div className={styles.contentContainer} key={postData._id}>
                                                <NavLink to={`/blogs/${postData._id}`} className="nav-link">
                                                    <strong>{postData.title}</strong>
                                                </NavLink>
                                                <div><strong>Author:</strong> {postData.author}</div>
                                                <div><strong>Date:</strong> {new Date(postData.date).toLocaleDateString()}</div>
                                                <div><strong>Category:</strong> {postData.category}</div> {/* Display categories */}
                                                <div className={styles.content} dangerouslySetInnerHTML={{ __html: limitContent(postData.content, 500) }} />
                                                {token && (
                                                    <div className={styles.buttons}>
                                                        <button
                                                            className={styles.updateButton}
                                                            onClick={() => handleOpenModal(postData)}
                                                        >Update</button>
                                                        <button
                                                            className={styles.deleteButton}
                                                            onClick={() => deleteBlog({ id:postData._id, month, year, setBlogs, setFilteredBlogs })}
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
                ))
            ) : (
                <h3 className={styles.noBlog}>No Blogs Found</h3>
            )}

            {selectedBlog && (
                <EditModal
                    open={isModalOpen}
                    handleClose={handleCloseModal}
                    blogData={selectedBlog}
                    handleUpdate={handleUpdateBlog}
                    
                />
            )}
        </div>
    );
}

export default Timeline;



