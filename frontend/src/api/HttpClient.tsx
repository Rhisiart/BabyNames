import axios from "axios";

export default axios.create({
        //baseURL: `http://${process.env.IP}:2000/api/`,        
<<<<<<< HEAD
        baseURL: "http:/192.168.1.68:2000/api/",
=======
        baseURL: "http://192.168.1.69:2000/api/",
>>>>>>> 000224daf5d30e84350d67ca94f2b936793f4e85
        headers:{'X-Requested-With': 'XMLHttpRequest'},
}); 