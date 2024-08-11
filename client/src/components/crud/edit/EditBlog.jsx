import API_URL from '../../../config';

const editBlog = async (currentBlog, setBlogs, setFilteredBlogs, categorizedByDate) => {
    const update_url = `${API_URL}/update/${currentBlog._id}`;

    const dateConverter = (blog) => {
        const blogData = blog.Data || blog;
        console.log("blogData: ", blogData)
        
        const dateStr = blogData.date;
        console.log("dateStr: ", dateStr);

        if(!dateStr) {
            throw new Error("Date is not defined in the blog object");
        }

        const date = new Date(dateStr);
        const year = date.getFullYear().toString();
        const month = date.toLocaleString('default', { month: 'long' });

        return { year, month };
    }

    try{
        const response = await fetch(update_url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(currentBlog)
        })
        if (response.ok) {
            if (categorizedByDate) {
                const{ year: currentYear, month: currentMonth } = dateConverter(currentBlog);

                setBlogs(prevBlogs => {
                    const updatedYear = { ...prevBlogs[currentYear] };
                    const updatedMonthBlogs = updatedYear[currentMonth].map(blog =>
                        blog._id === currentBlog._id ? currentBlog : blog
                    );
                    updatedYear[currentMonth] = updatedMonthBlogs;
                    return {
                        ...prevBlogs,
                        [currentYear]: updatedYear
                    };
                });
                setFilteredBlogs(prevBlogs => {
                    const updatedFilteredYear = { ...prevBlogs[currentYear] };
                    const updatedFilteredMonth = updatedFilteredYear[currentMonth].map(blog =>
                        blog._id === currentBlog._id ? currentBlog : blog
                    );
                    updatedFilteredYear[currentMonth] = updatedFilteredMonth;
                    return {
                        ...prevBlogs,
                        [currentYear]: updatedFilteredYear
                    };
                });
                
            }
            else {
                // Handle the case where no date categorization is needed (AllBlogs)
                setBlogs(prevBlogs => prevBlogs.map(blog =>
                    blog._id === currentBlog._id ? currentBlog : blog
                ));

                setFilteredBlogs(prevBlogs => prevBlogs.map(blog =>
                    blog._id === currentBlog._id ? currentBlog : blog
                ));
            }
        } else if (response.status === 403) {
            alert("You do not have permission to update this blog!");
        } else {
            throw new Error("Failed to update the blog");
        }
    }
    catch (error) {
        console.error("Update failed: ", error);
        alert('Failed to update blog');
    };
};

export default editBlog;