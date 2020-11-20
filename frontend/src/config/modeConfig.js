const mode = 'production';
const prod = mode === 'production';

const API = prod ? 'https://lit-brook-76575.herokuapp.com/game' : 'http://localhost:3001/game';

export default API;
