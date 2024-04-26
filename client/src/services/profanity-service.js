import api from './axios-service.js';

const ProfanityService = {
  checkForProfanity: (text) => {
    return api.post('/profanity/check', { text });
  },
};

export default ProfanityService;