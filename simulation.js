const rsa = require('.');

const message = "Welcome to Curl Analytics!";

const keys = rsa.generateKeys(250);

console.log('Keys');
console.log('n:',keys.n.toString());
console.log('d:',keys.d.toString());
console.log('e:',keys.e.toString());