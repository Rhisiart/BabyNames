import axios from "axios";

export default axios.create({
        //baseURL: `http://${process.env.IP}:2000/api/`,        
        baseURL: "http://192.168.1.89:2000/api/",
        headers:{'X-Requested-With': 'XMLHttpRequest'},
}); 