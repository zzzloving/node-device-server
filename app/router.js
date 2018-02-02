'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/devices/:id', controller.device.create);
  router.post('/devices/:id/start', controller.device.start);
  router.post('/devices/:id/check', controller.device.check);
  router.post('/devices/:id/stop', controller.device.stop);
  router.get('/devices/:id/status', controller.device.status);
  router.get('/devices/:sn/operates/:id', controller.device.operateStatus);
  router.post('/device/status', controller.device.callback);
  router.post('/device/ack', controller.device.ackCallback);

};
