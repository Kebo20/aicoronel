import axios from 'axios';



export default axios.create({
    baseURL: "http://aicoronel-backend/api",//process.env.REACT_APP_API,
    headers: {
        'Content-Type': 'application/json',
        //'Authorization':"Bearer " + localStorage.getItem('token')
    }
});
