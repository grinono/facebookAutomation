// Handle Requests
module.exports.handleRequest = async (interceptedRequest) => {
  try {
    await interceptedRequest.continue();
  } catch (e) {}
};
