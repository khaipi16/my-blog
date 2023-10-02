import cors from 'cors'

const corsConfig = {
    origin: 'http://localhost:3000', 
    methods: 'POST, GET, PUT, DELETE, HEAD, PATCH',
    credentials: true,
};
const applyCors = cors(corsConfig);
export default applyCors;

