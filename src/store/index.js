import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import {jwtDecrypt, tokenAlive} from "../shared/jwtHelper";
import axios from "axios";
import jwtInterceptor from '../shared/jwtInterceptor';

const state = {
    authData: {
        token: "",
        refreshToken: "",
        username: '',
        userid: "",
    },
    loginStatus: "",
    todos: []
}

const getters = {
    getLoginStatus(state) {
        return state.loginStatus;
    },
    getAuthData(state) {
        return state.authData;
    },
    isTokenActive(state) {
        if (!state.authData.tokenExp) {
            return false;
        }
        return tokenAlive(state.authData.tokenExp);
    },
    getAllTodos(state) {
        return state.todos;
    }
};

const actions = {
    async login({commit}, payload) {
        const response = await axios
            .post("http://localhost:8080/api/login", payload)
            .catch((err) => {
                console.log(err);
            });
        if (response && response.data) {
            commit("saveTokenData", response.data);
            commit("setLoginStatus", "success");
        } else {
            commit("setLoginStatus", "");
        }
    },
    async getAllTodos({commit}) {
        var response = await jwtInterceptor.get('http://localhost:8080/api/todolist');
        if (response && response.data) {
            commit('setTodos', response.data);
        }
    },
    async createTodo({commit}, payload) {
        const response = await jwtInterceptor
            .post("http://localhost:8080/api/todo", payload)
            .catch((err) => {
                console.log(err);
            });
        if (response && response.data) {
            console.log('提交成功')
            commit("setTodos", response.data);
            // commit("setLoginStatus", "success");
        } else {
            // commit("setLoginStatus", "");
        }
    },
    async saveTokensToStorage({commit}, payload) {
        commit("saveTokenData", payload);
    },
    async logout({commit}) {
        const response = await jwtInterceptor
            .post("http://localhost:8080/api/logout")
            .catch((err) => {
                console.log(err);
            });
        if (response && response.data) {
            console.log('提交成功')
            commit("setLogout");
            // commit("setLoginStatus", "success");
        } else {
            // commit("setLoginStatus", "");
        }
    }
};

const mutations = {
    saveTokenData(state, data) {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);

        if (data.access_token == "undefined" || data.access_token == '' || data.access_token == 'null') {
            console.log('kkkkk')
        } else {
            const jwtDecodedValue = jwtDecrypt(data.access_token);
            const newTokenData = {
                token: data.access_token,
                refreshToken: data.refresh_token,
                tokenExp: jwtDecodedValue.exp,
                userId: jwtDecodedValue.user_id,
                username: jwtDecodedValue.username,
            };
            state.authData = newTokenData;
        }


    },
    setLoginStatus(state, value) {
        state.loginStatus = value;
    },
    setTodos(state, payload) {
        state.todos.push(payload);
    },
    setLogout(state) {
        state.loginStatus = ""
        state.authData = {
            token: "",
            refreshToken: "",
            username: '',
            userid: "",
        }
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
    }
}

const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations
});

export default store;