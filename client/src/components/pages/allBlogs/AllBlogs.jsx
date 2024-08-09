import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterListIcon from '@mui/icons-material/FilterList';
import DOMPurify from 'dompurify';
import { useUser } from '../../../UserContext';
// import DEV_URL from '../../../config';
import API_URL from '../../../config';

import styles from './allBlogs.module.css';

const AllBlogs = () => {
    const [expandCategory, setExpandCategory] = useState(null);
    const [expandBlog, setExpandBlog] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [filterOpen, setFilterOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const { token } = useUser();

    const categories = ["Technology", "Health", "Lifestyle", "Education"];

    const handleExpandCategory = (category) => (event, isExpanded) => {
        setExpandCategory(isExpanded ? category : null);
        setExpandBlog(null); // Reset blog expansion when category is changed
    };

    const handleExpandBlog = (id) => (event, isExpanded) => {
        setExpandBlog(isExpanded ? id : null);
    };

    useEffect(() => {
        const blog_url = `${API_URL}/blogs`;
        fetch(blog_url)
            .then(response => response.json())
            .then(blogData => {
                const sanitizedBlogs = blogData.Data.map(blog => ({
                    ...blog,
                    content: DOMPurify.sanitize(blog.content),
                    category: Array.isArray(blog.category) ? blog.category : [blog.category] // Ensure category is an array
                }));
                setBlogs(sanitizedBlogs);
                setFilteredBlogs(sanitizedBlogs);
                setLoading(false);
            })
            .catch(error => {
                console.error('Failed to fetch blogs:', error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const filterBlogs = () => {
            if (!selectedCategories.length && !searchTerm) {
                setFilteredBlogs(blogs);
                return;
            }

            const filtered = blogs.filter(blog => {
                const matchesCategory = selectedCategories.length === 0 || blog.category.some(cat => selectedCategories.includes(cat));
                const matchesSearchTerm = blog.title.toLowerCase().includes(searchTerm) ||
                                          blog.author.toLowerCase().includes(searchTerm) ||
                                          blog.content.toLowerCase().includes(searchTerm);
                return matchesCategory && matchesSearchTerm;
            });

            setFilteredBlogs(filtered);
        };

        filterBlogs();
    }, [searchTerm, selectedCategories, blogs]);

    const handleDelete = (id) => {
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
                    setBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== id));
                    setFilteredBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== id));
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
        setSearchTerm(event.target.value.toLowerCase());
    };

    const handleCategoryChange = (event) => {
        const category = event.target.value;
        setSelectedCategories(prevCategories =>
            prevCategories.includes(category)
                ? prevCategories.filter(c => c !== category)
                : [...prevCategories, category]
        );
    };

    const toggleFilterOpen = () => {
        setFilterOpen(!filterOpen);
    };

    // Organize blogs by category
    const organizeBlogsByCategory = (blogs) => {
        const categoryMap = {};
        blogs.forEach(blog => {
            blog.category.forEach(cat => {
                if (!categoryMap[cat]) {
                    categoryMap[cat] = [];
                }
                categoryMap[cat].push(blog);
            });
        });
        return categoryMap;
    };

    const categoryBlogs = organizeBlogsByCategory(filteredBlogs);

    return (
        <div className="wrapper">
            <div className={styles.title}>
                <h1>All Blogs</h1>
                <input
                    type="text"
                    placeholder="Search blogs..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className={styles.searchInput}
                />
                <button onClick={toggleFilterOpen} className={styles.filterButton}>
                    <FilterListIcon /> Filter
                </button>
                {filterOpen && (
                    <div className={styles.checklistContainer}>
                        {categories.map(category => (
                            <label key={category} className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    value={category}
                                    checked={selectedCategories.includes(category)}
                                    onChange={handleCategoryChange}
                                />
                                {category}
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {filteredBlogs.length === 0 ? (
                <h3 className={styles.noBlogs}>No blogs found</h3>
            ) : (
                Object.keys(categoryBlogs).sort().map(category => (
                    <Accordion
                        key={category}
                        expanded={expandCategory === category}
                        onChange={handleExpandCategory(category)}
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>{category}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {categoryBlogs[category].map(blog => (
                                <Accordion
                                    key={blog._id}
                                    expanded={expandBlog === blog._id}
                                    onChange={handleExpandBlog(blog._id)}
                                >
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography>{blog.title}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div className={styles.contentContainer}>
                                            <NavLink to={`/blogs/${blog._id}`} className="nav-link">
                                                <strong>{blog.title}</strong>
                                            </NavLink>
                                            <div><strong>Author:</strong> {blog.author}</div>
                                            <div><strong>Date:</strong> {new Date(blog.date).toLocaleDateString()}</div>
                                            <div className={styles.content} dangerouslySetInnerHTML={{ __html: blog.content }} />
                                            {token && (
                                                <div className={styles.buttons}>
                                                    <button className={styles.updateButton}>Update</button>
                                                    <button
                                                        className={styles.deleteButton}
                                                        onClick={() => handleDelete(blog._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </AccordionDetails>
                    </Accordion>
                ))
            )}
        </div>
    );
}

export default AllBlogs;