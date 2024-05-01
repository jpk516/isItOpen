import axios from "axios"

const api = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:8099/api", //http://localhost:8099/api https://server.whatstarted.com/api
})

//https://stackoverflow.com/questions/71096083/react-js-add-middleware-to-redirect-to-login-when-axios-response-is-401
api.interceptors.response.use((response) => {
    return response;
}, (error) => { // Anything except 2XX goes to here
    const status = error.response?.status || 500;
    if (status === 401) {
         window.location = window.location.protocol + "//" + window.location.host + "/login"
    } else {
        return Promise.reject(error); // Delegate error to calling side
    }
});

export default api