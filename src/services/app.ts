import axios from "axios";

const app = axios.create({
  baseURL: "https://viacep.com.br/ws/",
});

export default app;
