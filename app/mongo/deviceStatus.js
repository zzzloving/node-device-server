'use strict';

module.exports = app => {
  const mongoose = app.mongoose;

  const DeviceStatusSchema = new mongoose.Schema({
    device_sn: { type: String },
    status: { type: Number },
    rssi: { type: Number },
    attr: { type: String },
    attr_value: { type: String },
    position: { type: String },
    strength: { type: String },
    created_at: { type: Date },
  });

  return mongoose.model('DeviceStatus', DeviceStatusSchema);
};
