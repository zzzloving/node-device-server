'use strict';

module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;

  const DeviceStatus = app.model.define('device_status', {
    device_sn: STRING,
    status: INTEGER,
    rssi: INTEGER,
    attr: STRING,
    attr_value: STRING,
    position: STRING,
    strength: STRING,
    created_at: DATE,
    updated_at: DATE,
  },
  {
    tableName: 'device_status',
  });

  return DeviceStatus;
};

