const bigInteger = require('big-integer');

class rsa {
    static primes(bits){
        const min = bigInteger.one.shiftLeft(bits - 1);
        const max = bigInteger.one.shiftLeft(bits).prev();

        while(true){
            let p = bigInteger.randBetween(min,max);
            if(p.isProbablePrime(256)){
                return p;
            }        
        }
    }

    static generateKeys(keysize){
        const e = bigInteger(65537);
        let p;
        let q;
        let totient;

        do{
            p = this.primes(keysize/2);
            q = this.primes(keysize/2);
            totient = bigInteger.lcm(p.prev(),q.prev());
        }while(bigInteger.gcd(e,totient).notEquals(1) || p.minus(q).abs().shiftRight(keysize/2 - 100).isZero());

        return{
            e,
            n: p.multiply(q),
            d: e.modInv(totient),
        };
    }
  
    static encrypt(encodedMsg, n, e) {
        return bigInt(encodedMsg).modPow(e, n);
    }  

    static decrypt(encryptedMsg, d, n) {
        return bigInt(encryptedMsg).modPow(d, n); 
    }

    static encode(str){
        const codes = str.split('').map(i=>i.charCodeAt()).join('');
        return bigInteger(codes);
    }

    static decode(code){
        const codestring = code.toString();
        let string = '';

        for(let i=0;i<codestring.length;i+=2){
            let num = Number(codestring.substr(i,2));

            if(num<=30){
                string += String.fromCharCode(Number(codestring.substr(i,3)));
                i++;
            }
            else {
                string += String.fromCharCode(num);
            }
        }

        return string;
    }
}

module.exports = rsa;