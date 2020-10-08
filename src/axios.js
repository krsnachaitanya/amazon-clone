import axios from "axios";

const instance = axios.create({
  baseURL: "https://us-central1-clone-edb97.cloudfunctions.net/api", // The API (cloud function) URL
});

export default instance;

// Local
// http://localhost:5001/clone-edb97/us-central1/api
