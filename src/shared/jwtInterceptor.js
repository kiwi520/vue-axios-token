import store from "../store";
import axios from "axios";

const jwtInterceptor = axios.create({});

jwtInterceptor.interceptors.request.use((config) => {
    const authData = store.getters["getAuthData"];
    if (authData.token == null) {
        return config;
    }
    config.headers.common["Authorization"] = `bearer ${authData.token}`;
    config.headers["Content-Type"] = `application/json`;
    return config;
});


jwtInterceptor.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response.status === 401) {
            const authData = store.getters["getAuthData"];
            const payload = {
                access_token: authData.token,
                refresh_token: authData.refreshToken,
            };
            axios.post(
                "http://localhost:8080/api/token/refresh",
                payload
            ).then(function (response) {
                console.log(response);
                store.dispatch("saveTokensToStorage", response.data);
                error.config.headers[
                    "Authorization"
                    ] = `bearer ${response.data.access_token}`;
                return axios(error.config);
            }).catch(function (error) {
                // console.log(error);
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                window.location.href ="http://localhost:8081/login"
                });
        } else {
            return Promise.reject(error);
        }
    }
)

export default jwtInterceptor;