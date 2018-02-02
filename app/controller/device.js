'use strict'

const Controller = require('egg').Controller

class DeviceContoller extends Controller {
        //发动操作指令 物联网
        async start() {
            this.logger.debug('device start params:', this.ctx.params)
            this.logger.debug('device start body:', this.ctx.request.body)
            const params = this.ctx.params;
            const body = this.ctx.request.body;
            const operateRes = await this.ctx.service.cloud.deviceStart(params.id, body)
            this.logger.info('device start operateRes:', operateRes.data)
    
            //记录操作
            if (operateRes.data.error === null) {
                // 记录操作到数据库
                const operate = await this.ctx.service.operate.start('', params.id, operateRes.data.op_id, body);
                if (operateRes.data.op_encrypt){
                  this.ctx.body = operateRes.data
                } else{
                  this.ctx.body = { error: null, operate: operate };
                }           
              } else {
                this.ctx.body = { error: operateRes.data.error };
              }
        }

        //检查
        async check() {
            this.logger.debug('device check params:', this.ctx.params);
            const params = this.ctx.params;
      
            // 发送操作指令
            const operateRes = await this.ctx.service.cloud.deviceCheck(params.id);
            this.logger.debug('device check operateRes:', operateRes.data);
      
            if (operateRes.data.error === null) {
              // 记录操作
              const operate = await this.ctx.service.operate.check('', params.id, operateRes.data.data.op_id);
      
              this.ctx.body = {
                error: null,
                operate: operate,
              };
            } else {
              this.ctx.body = {
                error: 1,
                msg: '检查失败！',
              };
            }
          }

        //stop
        async stop() {
            this.logger.debug('device stop params:', this.ctx.params);
            const params = this.ctx.params;
            const res = await this.ctx.service.cloud.deviceStop(params.id);
            this.ctx.body = res.data;
          }

        //查询设备信息
        async create() {
            this.logger.debug('device create body', this.ctx.params);
            const params = this.ctx.params;
            const res = await this.ctx.service.cloud.deviceCreate(params.id);
            this.ctx.body = res.data
            console.log(typeof res.data.device)
        }

        //设备目前状态
        async status() {
            // this.ctx.logger.info('device status params:', this.ctx.params);
            let statusRes = await this.ctx.app.redis.get('devices:' + this.ctx.params.id);
            // this.logger.info('redis status:', statusRes.length);
            if (!statusRes || statusRes.length < 3) {
              statusRes = await this.ctx.model.Device.updateStatus(this.ctx.params.id);
            } else {
              statusRes = JSON.parse(statusRes);
            }
            this.ctx.body = {
              error: null,
              device: statusRes,
            }
        }
        
        //操作状态
         async operateStatus() {
            this.logger.debug('device operate status params:', this.ctx.params);
            const operate = await this.ctx.model.Operate.findOne({
              where: { channel_id: this.ctx.params.id },
            });
   
            this.ctx.body = {
              error: null,
              operate: operate,
            };
          }

        // 设备状态回调
         async callback() {
            this.ctx.logger.info('device callback params:', this.ctx.params);
            this.ctx.logger.info('device callback body:', this.ctx.request.body);
      
            const body = this.ctx.request.body;
      
            this.ctx.mongo.DeviceStatus.create({
              device_sn: body.psn,
              status: body.status ? Number(body.status) : 0,
              model: body.model,
              rssi: body.rssi ? Number(body.rssi) : 0,
              ver: Number(body.ver),
              created_at: Date.now(),
            });
            // 清空缓存
            this.app.redis.del('devices:' + body.psn);
            this.ctx.body = { error: null };
          }

        //指令结果回调
          async ackCallback() {
            this.ctx.logger.info('device ackCallback params:', this.ctx.params);
            this.ctx.logger.info('device ackCallback body:', this.ctx.request.body.id);
            await this.ctx.service.operate.callback(this.ctx.request.body.id, Number(this.ctx.request.body.code));
            this.ctx.body = { error: 0 };
          }
}
module.exports = DeviceContoller
