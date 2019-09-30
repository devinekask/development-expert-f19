const os = require('os');

const getIpAddresses = () => {
  return new Promise(resolve => {
    const ifaces = os.networkInterfaces();
    const ipAddresses = {};
    Object.keys(ifaces).forEach(ifname => {
      ifaces[ifname].forEach(iface => {
        if ('IPv4' !== iface.family || iface.internal !== false) {
          // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
          return;
        }
        if (!ipAddresses[ifname]) {
          ipAddresses[ifname] = [];
        }
        ipAddresses[ifname].push(iface.address);
      });
    });
    return resolve(ipAddresses);
  });
};

module.exports = getIpAddresses;
