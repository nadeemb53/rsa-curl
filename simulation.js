const rsa = require('.');
const bigInteger = require('big-integer');

const message = "Welcome to Curl Analytics!";

const keys = rsa.generateKeys(250);

//console.log(bigInteger.one.shiftLeft(125-1));
//console.log(bigInteger.one.shiftLeft(125).prev());

console.log('Keys');
console.log('n:',keys.n.toString());
console.log('d:',keys.d.toString());
console.log('e:',keys.e.toString());

const encoded_message = rsa.encode(message);
const encrypted_message = rsa.encrypt(encoded_message, keys.n, keys.e);
const decrypted_message = rsa.decrypt(encrypted_message, keys.d, keys.n);
const decoded_message = rsa.decode(decrypted_message);

console.log('Message:', message);
console.log('Encoded:', encoded_message.toString());
console.log('Encrypted:', encrypted_message.toString());
console.log('Decrypted:', decrypted_message.toString());
console.log('Decoded:', decoded_message.toString());
console.log();
console.log('Correct?', message === decoded_message);
if(message === decoded_message)
console.log("==========================Simulation Success=============================");
else{
    console.log("=========================Simulation Failed==================================");
}