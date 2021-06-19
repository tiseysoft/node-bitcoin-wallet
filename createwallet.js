const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

//define network
const network = bitcoin.networks.bitcoin //use networks.tesnet

//Derivation path
const path = `m/44'/0'/0'/0`

let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)
let root = bip32.fromSeed(seed, network)

let account = root.derivePath(path)
let node = account.derive(0).derive(0)

let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

console.log(`

Wallet generated:

-Your Adress : ${btcAddress},
-Your Key: ${node.toWIF()}, //use toBase58() to obtain base58 format too.
-Mnemonic : ${mnemonic}
`)