import crypto from 'crypto';

/**
 * cryptography in Node.js, you can hash passwords and store them in the database 
 * so that data cannot be converted to plain text after it is hashed; it can only be verified.
 * 
 * crypto module provides cryptographic functions to help you secure your Node.js app. 
 * It includes a set of wrappers for OpenSSL’s hash, HMAC, cipher, decipher, sign, and verify functions.
 * 
 * HMAC stands for Hash-based Message Authentication Code. 
 * It is a process for applying a hash algorithm to both data and a secret key that results in a single final hash.
*/

//Hash-based message authentication code (HMAC) enbles you to provide digital signatures with the use of shared secret. 
//Crypto’s HMAC class uses the HMAC method for digital signing.
const secret = 'abcdefghij123456789';
const hash = crypto.createHmac('sha256', secret)  
                   .update('node js beginners handbook')  
                   .digest('hex');  
console.log(hash);  
const hmac = crypto.createHmac('sha256', secret);
hmac.on('readable', () => {
    // Only one element is going to be produced by the
    // hash stream.
    const data = hmac.read();
    if (data) {
        console.log(data.toString('hex'));
        // Prints:
        //   7fd04df92f636fd450bc841c9418e5825c17f33ad9c87c518115a45971f7f77e
    }
});
hmac.write('node js beginners handbook');
hmac.end();

/**
 * The sign class is for generating signatures. 
 * For efficient cryptography, cryptographs need to be signed and later verified for authentication. 
*/
const { privateKey, publicKey } = crypto.generateKeyPairSync('ec', {
    namedCurve: 'sect239k1'
});
  
// Create
const sign = crypto.createSign('SHA256');
sign.write('Chetan');
sign.end();
const signature = sign.sign(privateKey, 'hex');
console.log(`Signed signature for Chetan is :- ${signature}`);

//Verify --
//If you have a hashed cryptograph, the only way to ascertain its value is with the verify method.
// Verify signed token from `sign` example above
const verify = crypto.createVerify('SHA256');
verify.write('Chetan1');
verify.end();
let verifiedSign = verify.verify(publicKey, signature, 'hex');
console.log(`is verify signed signature  - ${verifiedSign}`); // Prints: true 

/*
The Cipher class is responsible for encrypting information.
*/
// We will first generate the key, as it is dependent on the algorithm.
// In this case for aes192, the key is 16 bytes (128 bits).
// Encrypting abc string 
var myEnckey = crypto.createCipher('aes-128-cbc', 'mypassword');
var myEncstr = myEnckey.update('abc', 'utf8', 'hex')
myEncstr += myEnckey.final('hex');
console.log(`encrypt abc - ${myEncstr}`); //34feb914c099df25794bf9ccb85bea72
//decrypting abc string 
var myDeckey = crypto.createDecipher('aes-128-cbc', 'mypassword');
var myDecstr = myDeckey.update('34feb914c099df25794bf9ccb85bea72', 'hex', 'utf8')
myDecstr += myDeckey.final('utf8');
console.log(`decrypting hash to -'${myDecstr}'`); //abc
