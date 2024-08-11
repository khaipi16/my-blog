import API_URL from '../../../config';

const deleteBlog = async ({ id, month, year, setBlogs, setFilteredBlogs }) => {

    const delete_url = `${API_URL}/delete/${id}`;

    try {
        const response = await fetch(delete_url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        })
        if (response.ok) {

            if (year && month) {
                setBlogs(prevBlogs => {
                    const updatedYear = { ...prevBlogs[year] };
                    const updatedMonthBlogs = updatedYear[month].filter(
                        blog => blog._id !== id
                    );
                    updatedYear[month] = updatedMonthBlogs;
                    return {
                        ...prevBlogs,
                        [year]: updatedYear
                    };
                });
                setFilteredBlogs(prevBlogs => {
                    const updatedFilteredYear = { ...prevBlogs[year] };
                    const updatedFilteredMonth = updatedFilteredYear[month].filter(
                        blog => blog._id !== id
                    );
                    updatedFilteredYear[month] = updatedFilteredMonth;
                    return {
                        ...prevBlogs,
                        [year]: updatedFilteredYear
                    };
                });
            }
            else {
                setBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== id));
                setFilteredBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== id));
            }
   
        } else if (response.status === 403) {
            alert("You do not have permission to delete this blog!");
        } else {
            throw new Error("Failed to delete the blog");
        }
    }
    catch(error) {
        console.error("Delete failed: ", error);
        alert('Failed to delete blog');
    };
};


export default deleteBlog;