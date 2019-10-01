const mosca = require('mosca');
const config = require('../config');
const DeviceModel = require('../models/devices');

const {MQTT} = config;


var ascoltatore = {
    type: 'mongo',
    url: 'mongodb://localhost:27017/mqtt',
    pubsubCollection: 'ascoltatori',
    mongo: {}
  };
  
  var settings = {
    port: MQTT.PORT,
    backend: ascoltatore,
    interfaces:[
      { type: "mqtt", port: 1883 },
      { type: "http", port: 3001, bundle: true, static: './' }
    ]
  };
  
  var server = new mosca.Server(settings);
  
  server.on('clientConnected', async function(client) {
    // Set this device to online;
    const resp = await DeviceModel.currentOwner();
    const deviceUser = resp[0];
    DeviceModel.update(client.id,{online:true});
    server.publish({
      topic: "5585",
      payload: deviceUser.name, // or a Buffer
      qos: 0, // 0, 1, or 2
      retain: false // or true
    });
    console.log('client connected', client.id);
  });

  server.on('clientDisconnected', function(client) {
    console.log('Client Disconnected:', client.id);
    DeviceModel.update(client.id,{online:false});
    // Set this device to offline
  });
  
  // fired when a message is received
  server.on('published', function(packet, client) {
    // console.log('client : ', client.id);
    console.log(`client ${client} Published : ${packet.payload}`);

  });
  
  server.on('ready', setup);
    
  // fired when the mqtt server is ready
  function setup() {
    console.log('Mosca server is up and running');
  }