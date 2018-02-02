'use strict';

module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;

  const Operate = app.model.define('operate', {
    channel_id: STRING,
    device_id: STRING,
    sub_order_id: STRING,
    user_id: STRING,
    name: STRING,
    duration: INTEGER,
    attr: STRING,
    attr_value: STRING,
    position: STRING,
    strength: STRING,
    code: STRING,
    status: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  },
  {
    tableName: 'operates',
  });

  return Operate;
};