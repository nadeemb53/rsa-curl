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
}

module.exports = rsa;