const URL = require('url').URL;

exports.handler = async (event) => {
    const origin = getOrigin(event.referer);
    return { origin };
};

const getOrigin = (referer) => {
  if (!referer || referer === '') {
    return process.env['defaultCallbackOrigin'];
  }
  return new URL(referer).origin;
}