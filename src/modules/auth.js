import AuthService from "../services/auth"
import { removeItem, setItem } from "../helpers/persistanceStorage"
import { gettersType } from "./types"

const authModule = {
    state: () => ({
        isLoading: false,
        user: null, 
        errors: null
    }),
    mutations: {
        registerStart(state) {
            state.isLoading = true,
            state.user = null, 
            state.errors = null
        },
        registerSuccess(state, payload) {
            state.isLoading = false,
            state.user = payload
        },
        registerFailure(state, payload) {
            state.isLoading = false,
            state.errors = payload
        },


        loginStart(state) {
            state.isLoading = true,
            state.user = null, 
            state.errors = null
        },
        loginSuccess(state, payload) {
            state.isLoading = false,
            state.user = payload
        },
        loginFailure(state, payload) {
            state.isLoading = false,
            state.errors = payload
        },

        currentUserStart(state) {
            state.isLoading = true,
            state.user = null, 
            state.errors = null
        },
        currentUserSuccess(state, payload) {
            state.isLoading = false,
            state.user = payload
        },
        currentUserFailure(state, payload) {
            state.isLoading = false,
            state.errors = payload
        },

        logout(state) {
            state.user = null;
        }
    },
    actions: {
        register(context, userData) {
            return new Promise((resolve, reject) => {
                context.commit('registerStart');
                AuthService.register(userData)
                .then(response => {
                    context.commit('registerSuccess', response.data.user);
                    setItem('token', response.data.user.token)
                    resolve(response.data.user)
                })
                .catch(errors => {
                    context.commit('registerFailure', errors.response.data.errors);
                    reject(errors.response.data.errors)

                })
            })
        },

        login(context, userData) {
            return new Promise((resolve, reject) => {
                context.commit('loginStart');
                AuthService.login(userData)
                .then(response => {
                    context.commit('loginSuccess', response.data.user);
                    setItem('token', response.data.user.token)
                    resolve(response.data.user)
                })
                .catch(errors => {
                    context.commit('loginFailure', errors.response.data.errors);
                    reject(errors.response.data.errors)
                })
            })
        },

        getUser(context) {
            return new Promise(() => {
                context.commit('currentUserStart');
                AuthService.getUser()
                .then(response => {
                    context.commit('currentUserSuccess', response.data.user);
                })
                .catch(errors => {
                    context.commit('currentUserFailure', errors.response.data.errors);
                })
            })
        },

        logout(context) {
            removeItem('token');
            context.commit('logout')
        }
    },
    getters: {
        [gettersType.currentUser](state) {
            return state.user
        },
        [gettersType.errors](state) {
            return state.errors
        },
        [gettersType.isLoading](state) {
            return state.isLoading
        }
    }
}

export default authModule;