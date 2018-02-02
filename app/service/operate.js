const Service = require('egg').Service

class Opreate extends Service {

 //设备操作记录到数据库
  async start(userId, deviceId, channelId, data) {
    this.logger.debug('operate start:', userId, deviceId, channelId, data);
    return this.ctx.model.Operate.create({
        name: 'start',
        duration: data.duration,
        attr: data.attr,
        attr_value: data.attr_value,
        position: data.position,
        strength: data.strength,
        user_id: userId,
        device_id: deviceId,
        channel_id: channelId,
        status: 0,
      })
    }
 async check(userId, deviceId, channelId) {
    this.logger.debug('operate start check:', userId, deviceId, channelId);
    return this.ctx.model.Operate.create({
      name: 'check',
      user_id: userId,
      device_id: deviceId,
      channel_id: channelId,
      status: 0,
    })
  }

  callback(channelId, code) {
    return this.ctx.model.Operate.findOne({
      where: { channel_id: channelId },
      // attributes: ['id', ['code', 'status']]
    }).then(operate => {
      if (operate) {
        operate.code = code;
        operate.status = 1; // 指令已完成回调
        return operate.save();
      }
    })
  }
}
module.exports = Opreate