import axios from "axios";

const fetcher = axios.create({
  baseURL: (process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  timeout: 10000,
});

// fetcher.interceptors.response.use(response => {
//   return response.data
// })

export default fetcher