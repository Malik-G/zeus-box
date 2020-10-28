import axios from "axios"

const instance = axios.create({
  baseURL: 'https://us-central1-clone-590dd.cloudfunctions.net/api'
  // baseURL: 'http://localhost:5001/clone-590dd/us-central1/api'
});

export default instance;