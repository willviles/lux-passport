export default class PassportRequest {
  constructor(request, req = {}) {
    req = Object.assign(Object.create(request), request);

    req.headers = Array.from(request.headers).reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});

    req.body = Object.keys(request.params).reduce((obj, key) => {
      obj[key] = request.params[key];
      return obj;
    }, {})

    req.query = req.body;

    return req;
  }
}
