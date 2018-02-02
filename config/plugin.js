'use strict';
const path = require('path');

// had enabled by egg
// exports.static = true;
exports.sequelize = {
    enable: true,
    package: 'egg-sequelize',
  };
  exports.redis = {
    enable: true,
    package: 'egg-redis',
  }
  exports.kokemongoose = {
    enable: true,
    path: path.join(__dirname, '../lib/plugin/egg-koke-mongoose'),
  }