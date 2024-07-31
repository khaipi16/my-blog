// import styles from './home.module.css';
import React, { useEffect, useState } from 'react'
import styles from './home.module.css';
import DomPurify from 'dompurify'
import profilePic from '../../../images/profile.jpg';
import { Button, Paper, Typography } from "@mui/material";
import { Link } from 'react-router-dom'
import API_URL from '../../../config';

export const Home = () => {
    const[blog, setBlog] = useState(null);


    useEffect(() => {
        const blog_url = `${API_URL}/blogs/latest`
        const blog_url2 = 'https://52.91.80.202:5000/blogs/latest';

        fetch(blog_url)
        .then(response => response.json())
        .then(data => {
            // Santize content after fetching and before setting it to state
            const safeHTMLContent = DomPurify.sanitize(data.Data.content);
            setBlog({...data.Data, content: safeHTMLContent})
        })
        .catch(error => console.error('Error fetching blog:', error));
    }, []) // empty array ensures this effect runs only once after initial render


    return (


        <Paper className={styles.home}>
            <div className={styles.profileContainer}>
                <img className={styles.profile} src={profilePic} alt="Profile" />
                <div className={styles.profileInfo}>
                    <Typography className={styles.user} variant="h6">Cin Khai</Typography>
                    <Typography variant="body2">
                        <p>Hello! My name is Khai, I am a Software Engineer, and welcome to my blog. 
                            The main point of this blog is to document all my learnings so that 
                            I may better retained and internalized materials that I have learned throughout my career.</p>
                    </Typography>
                    <Button variant="outlined" color="primary">
                        Read More
                    </Button>
                </div>
            </div>
            {blog ? (
                <div className={styles.blogContainer}>
                    <Typography className={styles.author} variant="body1">
                        by: {blog.author}
                        <span className={styles.separator}>|</span>
                        {blog.date}
                    </Typography>
                    <Typography variant="h4" className={styles.title}>
                        {blog.title}
                    </Typography>
                    <Typography variant="body2" className={styles.content}>
                        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                    </Typography>
                    <Link to={`/blogs/${blog._id}`}>
                        <Button className={styles.readMore} variant="outlined" color="primary">
                            Read More
                        </Button>
                    </Link>

                </div>
            ) : (
                <p>Loading latest blog...</p>
            )}
        </Paper>

    )
}



        // <div className={styles.container}>
        //     <div>
        //         <img className={styles.profile} src={profilePic} alt="Profile"  />
        //         <p className={styles.profileInfo}>Hi, my name is Khai, and I am a Software Engineer.</p>
        //     </div>
        //     <h1 className={styles.title}><b>{blog?.title}</b></h1>

        //     {blog ? (
        //         <div className={styles.blog}>
        //             {/* <div className={styles.imgContainer}>
        //                 <Image src={Universe} alt="HomeImage" className={styles.image}/>
        //             </div> */}

        //             <div className={styles.author}>By: {blog.author} | {blog.date}</div>
        //             <div className={styles.textContainer}>
        //                 <div dangerouslySetInnerHTML={{__html: blog.content}}></div>
        //                 <button className={styles.readMore}>Read More</button>
        //             </div>
        //         </div>
        //     ) : (
        //         <p>Loading latest blog...</p>
        //     )}
        // </div>



        // <div className={styles.container}>
        //     <div className={styles.header}>
        //         <div className={styles.profileContainer}>
        //             <img className={styles.profile} src={profilePic} alt="Profile" />
        //         <p className={styles.profileInfo}>Hi, my name is Khai, and I am a Software Engineer.</p>

        //         </div>
        //         <div className={styles.authorDetails}>
        //             <div className={styles.author}>By: {blog?.author}</div>
        //             <div className={styles.date}>{blog?.date}</div>
        //         </div>
        //     </div>
        //     {blog ? (
        //         <div className={styles.blog}>
        //             <h1 className={styles.title}><b>{blog.title}</b></h1>
        //             <div className={styles.textContainer}>
        //                 <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        //                 <button className={styles.readMore}>Read More</button>
        //             </div>
        //         </div>
        //     ) : (
        //         <p>Loading latest blog...</p>
        //     )}
        // </div>


        // <Paper className={styles.home}>
        //     <div className="profile">
        //         <img className={styles.profile} src={profilePic} alt="Profile" />
        //         <div className="profile-info">
        //             <Typography variant="h6">Cin Khai</Typography>
        //             <Typography variant="body2"><p>Hi! My name is Khai, and welcome to my blog.</p></Typography>
        //             <Button variant="outlined" color="primary">
        //                 Read More
        //             </Button>
        //         </div>
        //     </div>
        //     {blog ? (
        //         <div className={styles.contentContainer}>
        //             <div className={styles.profileInfoContainer}>
        //                 <Typography className={styles.author}>
        //                     by: {blog.author}
        //                     <span className={styles.separator}>|</span>
        //                     {blog.date}
        //                 </Typography>
        //             </div>
        //             <div className={styles.blogContentContainer}>
        //                 <Typography variant="h4" className={styles.title}>
        //                     {blog.title}
        //                 </Typography>
        //                 <Typography variant="body2" className={styles.content}>
        //                     <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        //                 </Typography>
        //             </div>
        //         </div>
        //     ) : (
        //         <p>Loading latest blog...</p>
        //     )}

        // </Paper>