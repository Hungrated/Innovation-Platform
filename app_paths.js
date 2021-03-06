const pathLib = require('path');

const root = __dirname;

const app = pathLib.join(root, 'app.js');

const upload = pathLib.join(root, 'public', 'upload');

const avatars = pathLib.join(upload, 'avatars');

const sources = pathLib.join(upload, 'sources');

const userinfo = pathLib.join(upload, 'userinfo');

const plans = pathLib.join(root, 'public', 'output', 'plans');

module.exports = {
  avatars, sources, userinfo, plans
};