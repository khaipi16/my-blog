
// // import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// // import { app } from '@/utils/firebase';


// // const storage = getStorage(app);


//     // useEffect(() => {
//     //     const upload = () => {
//     //         const fileName = new Date().getTime + file.name;
//     //         // const storageRef = ref(storage, fileName);
//     //         // const uploadTask = uploadBytesResumable(storageRef, file);

//     //         uploadTask.on('state_changed', 
//     //         (snapshot) => {
//     //             // Observe state change events such as progress, pause, and resume
//     //             // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//     //             const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//     //             console.log('Upload is ' + progress + '% done');
//     //             switch (snapshot.state) {
//     //             case 'paused':
//     //                 console.log('Upload is paused');
//     //                 break;
//     //             case 'running':
//     //                 console.log('Upload is running');
//     //                 break;
//     //             }
//     //         }, 
//     //         (error) => {}, 
//     //         () => {
//     //             getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//     //                 setMedia(downloadURL); 
//     //             });
//     //             }
//     //         )
//     //     }
//     //     file && upload();
//     // }, [file])


//     // useEffect(() => {
//     //     if(status === "unauthenticated"){
//     //         router.push("/")
            
//     //     }
//     // }, [status, router]);

//     // if (status === "loading"){
//     //     return <div>Loading...</div>
//     // }

//     // const regexID = (str) => 
//     //     str
//     //         .toLowerCase()
//     //         .trim()
//     //         .replace(/[^\w\s-]/g, "")
//     //         .replace(/[\s_-]+/g, "-")
//     //         .replace(/^-+|-+$/g, "");

//     // const handleSubmit = async () => {
//     //     const postURL = '/api/posts';
//     //     const options = {
//     //         method: "POST",
//     //         body: JSON.stringify({
//     //             title,
//     //             desc: text,
//     //             img: media,
//     //             // slug: regexID(title),
//     //             catSlug: "asd",
//     //         })
//     //     };
//     //     const response = await fetch(postURL, options)
//     //     console.log("response: ", response)
//     // };

import React, { useState } from 'react';
import ReactQuill from 'react-quill'
import styles from '../blogs/write.module.css'
import 'react-quill/dist/quill.snow.css'
import { json } from 'react-router-dom';




export const WriteBlog = () => {

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');
    const [content, setContent] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault(); 

        const blog_url = 'http://localhost:8000/write';

        const data = new FormData()
        data.set('title', title);
        data.set('author', author);
        data.set('content', content);
        console.log("data: ", data.values)

        try {
            const response = await fetch(blog_url, {
                method: 'POST',
                body: data,
            });
            console.log("response: ", response)
        }
        catch (ex) {
            console.log("Error! ", ex)
        }
    };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Write Blog</h2>
      <form className={styles.blog} onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" className="form-control" id="title" value={title} onChange={(ev) => setTitle(ev.target.value)} placeholder="Title" required />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input type="text" className="form-control" id="author" value={author} onChange={(ev) => setAuthor(ev.target.value)} placeholder="Author" required />
        </div>
        <div className="form-group">
          <input type="file" className="form-control-file" id="image" />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select className="form-control" id="category" value={category} onChange={(ev) => setCategory(ev.target.value)} required>
            <option value="">Select category</option>
            <option value="technology">Daily</option>
            <option value="health">Work</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="education">Finance</option>
          </select>
        </div>
        <div className="form-group">
            <ReactQuill value={content} placeholder='Today marks the beginning of...' onChange={setContent}/>
        </div>
        <br></br>
        <button type="submit" className="btn btn-primary submitButton" >Submit</button>
      </form>
    </div>
  );
};


// import React, { useState } from 'react';
// import ReactQuill from 'react-quill';
// import styles from '../blogs/write.module.css';
// import 'react-quill/dist/quill.snow.css';

// export const WriteBlog = () => {
//   const [title, setTitle] = useState('');
//   const [author, setAuthor] = useState('');
//   const [category, setCategory] = useState('');
//   const [content, setContent] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent the default form submission behavior

//     const blog_url = 'http://localhost:8000/write'; // Add http:// to the URL

//     const data = new FormData();
//     data.set('title', title);
//     data.set('author', author);
//     data.set('content', content);

//     try {
//       const response = await fetch(blog_url, {
//         method: 'POST',
//         body: data,
//       });
//       console.log("response: ", response);
//     } catch (ex) {
//       console.log("Error! ", ex);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="mb-4">Write Blog</h2>
//       <form className={styles.blog} onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="title">Title</label>
//           <input
//             type="text"
//             className="form-control"
//             id="title"
//             value={title}
//             onChange={(ev) => setTitle(ev.target.value)}
//             placeholder="Title"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="author">Author</label>
//           <input
//             type="text"
//             className="form-control"
//             id="author"
//             value={author}
//             onChange={(ev) => setAuthor(ev.target.value)}
//             placeholder="Author"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <input type="file" className="form-control-file" id="image" />
//         </div>
//         <div className="form-group">
//           <label htmlFor="category">Category</label>
//           <select
//             className="form-control"
//             id="category"
//             value={category}
//             onChange={(ev) => setCategory(ev.target.value)}
//             required
//           >
//             <option value="">Select category</option>
//             <option value="technology">Technology</option>
//             <option value="health">Health</option>
//             <option value="lifestyle">Lifestyle</option>
//             <option value="education">Education</option>
//           </select>
//         </div>
//         <div className="form-group">
//           <ReactQuill
//             value={content}
//             placeholder='Today marks the beginning of...'
//             onChange={setContent}
//           />
//         </div>
//         <br />
//         <button type="submit" className="btn btn-primary submitButton">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };
