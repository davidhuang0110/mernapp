import axios from 'axios'

const API_URL = '/api/users'        // 'proxy(package.json)/api/users', to redirect API requests during development

// Register user
const register = async (userData) => {
    // axios.post returns a promise that resolves to the response object, which contains the server's response.
    const response = await axios.post(API_URL, userData)

    // response.data contains the data returned by the server, which might include the newly registered user's information or a token.
    if(response.data) {
        // stores the response.data in the browser's localStorage under the key 'user'.
        // stringify converts the response.data into a JSON string because localStorage only stores strings.
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// Login user
const login = async (userData) => {
    const response = await axios.post(API_URL + '/login', userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// Logout user
const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    logout,
    login
}

export default authService