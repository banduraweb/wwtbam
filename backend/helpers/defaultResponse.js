module.exports = {
  defaultResponse: (res, successStatus, payload) => {
    if (payload && payload.error) {
      const { message } = payload.error;
      return res.status(500).json({ error: message });
    }
    return res.status(successStatus).json(payload);
  },
};
