import axios from "axios";

const api = axios.create({
    baseURL: ' http://xxx.xxx.x.x:xx/api'
});

export default api;
