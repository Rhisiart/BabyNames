import axios from "axios";

export default axios.create({
        baseURL: "http://192.168.1.68:2000/api/",
        headers:{'X-Requested-With': 'XMLHttpRequest'},
}); 