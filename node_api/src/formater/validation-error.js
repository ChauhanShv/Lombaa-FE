const formatter = ({ location, msg, param, value, nestedErrors }) => {
  let body = {
    message: msg,
    location: location,
    param: param,
  };
  return body;
};

module.exports = ({ location, msg, param, value, nestedErrors }) => {
  if (nestedErrors) return nestedErrors.map(formatter);

  return formatter({ location, msg, param, value, nestedErrors });
};
