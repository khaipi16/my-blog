// import React, { useEffect, useState } from 'react'
// import styles from './home.module.css';
// import DomPurify from 'dompurify'
// import profilePic from '../../../images/profile.jpg';
// import { Button, Paper, Typography } from "@mui/material";
// import { Link } from 'react-router-dom'
// // import DEV_URL from '../../../config';
// import API_URL from '../../../config';

// export const Home = () => {
//     const[blog, setBlog] = useState(null);


//     useEffect(() => {
//         const blog_url = `${API_URL}/blogs/latest`
//         const blog_url2 = 'https://52.91.80.202:5000/blogs/latest';

//         fetch(blog_url)
//         .then(response => response.json())
//         .then(data => {
//             // Santize content after fetching and before setting it to state
//             const safeHTMLContent = DomPurify.sanitize(data.Data.content);
//             setBlog({...data.Data, content: safeHTMLContent})
//         })
//         .catch(error => console.error('Error fetching blog:', error));
//     }, []) // empty array ensures this effect runs only once after initial render


//     return (


//         <Paper className={styles.home}>
//             <div className={styles.profileContainer}>
//                 <img className={styles.profile} src={profilePic} alt="Profile" />
//                 <div className={styles.profileInfo}>
//                     <Typography className={styles.user} variant="h6">Cin Khai</Typography>
//                     <Typography variant="body2">
//                         <p>Hello! My name is Khai, and welcome to my blog. I’m a Software Engineer with a background in Physics.
//                             Here, you’ll find posts about programming, design, bugs, and various topics related to my career. 
//                             Writing these blogs helps me better retain and internalize what I’ve learned, and I hope they can be helpful to you too.</p>
//                     </Typography>
//                     <Button variant="outlined" color="primary">
//                         Read More
//                     </Button>
//                 </div>
//             </div>
//             {blog ? (
//                 <div className={styles.blogContainer}>
//                     <Typography className={styles.author} variant="body1">
//                         by: {blog.author}
//                         <span className={styles.separator}>|</span>
//                         {blog.date}
//                     </Typography>
//                     <Typography variant="h4" className={styles.title}>
//                         {blog.title}
//                     </Typography>
//                     <Typography variant="body2" className={styles.content}>
//                         <div dangerouslySetInnerHTML={{ __html: blog.content }} />
//                     </Typography>
//                     <Link to={`/blogs/${blog._id}`}>
//                         <Button className={styles.readMore} variant="outlined" color="primary">
//                             Read More
//                         </Button>
//                     </Link>

//                 </div>
//             ) : (
//                 <p>Loading latest blog...</p>
//             )}
//         </Paper>

//     )
// }


import React, { useEffect, useState } from 'react';
import styles from './home.module.css';
import DomPurify from 'dompurify';
import profilePic from '../../../images/profile.jpg';
import { Button, Paper, Typography } from "@mui/material";
import { Link } from 'react-router-dom';
import API_URL from '../../../config';

export const Home = () => {
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const blog_url = `${API_URL}/blogs/latest`;
        fetch(blog_url)
            .then(response => response.json())
            .then(data => {
                const safeHTMLContent = DomPurify.sanitize(data.Data.content);
                setBlog({ ...data.Data, content: safeHTMLContent });
            })
            .catch(error => console.error('Error fetching blog:', error));
    }, []); // empty array ensures this effect runs only once after initial render

    return (
        <Paper className={styles.home}>
            <div className={styles.profileContainer}>
                <img className={styles.profile} src={profilePic} alt="Profile" />
                <div className={styles.profileInfo}>
                    <Typography className={styles.profileName} variant="h6">Cin Khai</Typography>
                    <Typography variant="body2" className={styles.intro}>
                        <p>Hello! My name is Khai, and welcome to my blog. I’m a Software Engineer with a background in Physics.
                            Here, you’ll find posts about programming, design, bugs, and various topics related to my career. 
                            Writing these blogs helps me better retain and internalize what I’ve learned, and I hope they can be helpful to you too.</p>
                    </Typography>
                    <Link to={"/about"}>
                        <Button variant="outlined" color="primary">
                            Read More
                        </Button>
                    </Link>
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
    );
};