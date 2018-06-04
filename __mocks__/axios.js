const axios = () => {
  if (global.error) {
    return Promise.reject({
      data: true,
    });
  }
  return Promise.resolve({
    data: true,
  });
};

const create = () => {
  if (global.error) {
    return Promise.reject({
      data: true,
    });
  }
  return Promise.resolve({
    data: true,
  });
};
axios.create = () => create;
axios.defaults = {
  headers: {
    common: {},
  },
};
export default axios;
