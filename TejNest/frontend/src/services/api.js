import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const designerService = {
  getAll: () => api.get('/designers'),
  getById: (id) => api.get(`/designers/${id}`),
};

export const portfolioService = {
  getByDesigner: (designerId) => api.get(`/portfolios/designer/${designerId}`),
};

export default api;
