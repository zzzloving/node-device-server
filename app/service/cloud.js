'use strict';

const Service = require('egg').Service

class Cloud extends Service {

    //发送启动指令
    async deviceStart(sn, data) {

        this.logger.info('device start:', sn, data)
        this.logger.info('device start baseApi:', this.config.baseApi)
        
        return this.ctx.curl(this.config.baseApi + '/devices/' + sn + '/start', {
            method: 'POST',
            headers: {
              'access-token': this.config.accessToken,
            },
            data: data,
            dataType: 'json',
            timeout: 10000,
          })
    }
    //creat

    async deviceCreate(sn) {
      
      this.logger.info('device start baseApi:', this.config.baseApi)
      return this.ctx.curl(this.config.baseApi + '/devices/' + sn , {
        method: 'get',
        headers: {'access-token': this.config.accessToken }
      })
    }


    //check
    async deviceCheck(sn) {
      this.logger.debug('device check:', sn)
      return this.ctx.curl(this.config.baseApi + '/devices/' + sn + '/check', {
        method: 'get',
        headers: { 'access-token': this.config.accessToken }
      })
    }


    //stop
    async deviceStop(sn) {
        this.logger.debug('device stop:', sn)
        return this.ctx.curl(this.config.baseApi + '/devices/' + sn + '/stop', {
          method: 'POST',
          headers: { sn,
             'access-token': this.config.accessToken }
        })
      }
}
module.exports = Cloud
