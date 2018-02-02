'use strict';
const path = require('path')

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1517448508968_8041';

  config.accessToken = '18f83231f2a5ccc653a2ce1515b836f6';
  config.baseApi = 'http://momoda.iot.rotai.com/api/1.5';
  config.userApi = 'https://rt.liuchong.me/api/cloud';
  // add your config here
  config.middleware = [];

  config.bodyParser = {
    enableTypes:['json','form','text'],
    extendTypes: {
      text: ['text/xml']
    }
  }


  config.security = {
    csrf: {
      enable: false,
    },
  }

    // 数据库配置
    config.sequelize = {
      dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
      database: 'rt-ble',
      host: 'localhost',
      port: '3306',
      username: 'root',
      password: '',
    };

    config.mongoose = {
      url: 'mongodb://127.0.0.1/rt-ble',
      options: {},
    }

    config.redis = {
      client: {
        port: 6379,
        host: '127.0.0.1',
        password: '',
        db: 0,
      },
    }
  return config;
    
};
