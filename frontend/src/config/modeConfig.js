const prod = process.env.NODE_ENV === 'production';
const API = prod ? '/game' : 'http://localhost:3001/game';

export default API;
