'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Device = app.model.define('device', {
    sn: STRING,
    mac: STRING,
    product_sn: STRING,
    product_code: STRING,
    activated: STRING,
    channel_code: STRING,
    status: INTEGER,
    product_tmp_sn: STRING,
    product_dt_sn: STRING,
    created_at: DATE,
    updated_at: DATE,
  },
  {
    tableName: 'devices'
  });

  Device.updateStatus = async function(sn) {
    let res = {};
    const device = await this.findOne({
      attributes: [ 'sn', 'mac', 'product_code', 'product_sn' ],
      where: { product_sn: sn },
    });
    const deviceStatus = await app.mongo.DeviceStatus.findOne({
      device_sn: sn,
    }).sort({
      created_at: 'desc',
    });
    console.log('device:', device)
    console.log('deviceStatus:', deviceStatus)
    if (device) {
      if (deviceStatus) {
        res = Object.assign(device.dataValues, deviceStatus.toObject());
      } else {
        res = device.dataValues;
      }
    } else {
      if (deviceStatus) {
        console.log('deviceStatus:', deviceStatus)
        res = deviceStatus.toObject();
        console.log('deviceStatus res:', res)
      }
    }

    // 用 redis 缓存 1h
    app.redis.set('devices:' + sn, JSON.stringify(res), 'ex', 60 * 60);

    return res;
  }

  return Device
}