import axios from 'axios';
const state = {
    isLoggedIn: false,
    userDetails: {}
};

const getters = {
    loggedIn(state) {
        return state.isLoggedIn;
    }
}

const mutations = {
    setLoggedIn(state, payload) {
        state.isLoggedIn = payload;
    }
};

const actions = {
    loginUser(ctx, payload) {
        return new Promise( (resolve, reject) => {
            axios
                .post('http://localhost:8000/api/login', payload)
                .then( (response) => {
                localStorage.setItem('token', response.data);
                ctx.commit('setLoggedIn', true);
                resolve(response);
               /*  this.$router.push('dashboard');  */                                   
        })
        .catch((error) => {
            reject(error);
        })
    })
}
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}