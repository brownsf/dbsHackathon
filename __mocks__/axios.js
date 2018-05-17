export default () => {
  if (global.error) {
    return Promise.reject({
      data: true,
    });
  }
  return Promise.resolve({
    data: true,
  });
};
