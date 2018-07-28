/**
 * ROUTES
 */

const routes = {
  hello: (data, cb) => {
    if (data.method === "POST") {
      cb(200, {
        message: "Hello dude!",
        payload: data.payload
      });
    } else {
      cb(200);
    }
  },
  notFound: (data, cb) => cb(404)
};

module.exports = routes;
