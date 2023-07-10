/*
 * @Author: ischengcheng ischengcheng20@gmail.com
 * @Date: 2023-07-04 18:10:17
 * @LastEditors: ischengcheng ischengcheng20@gmail.com
 * @LastEditTime: 2023-07-10
 * @FilePath: /ethers-study/src/createWalletByRandom.js
 * @Description: 创建钱包
 */

// 通过随机数创建一个钱包
const ethers = require('ethers');
const path = require('path');
const {writeFileSync} = require('fs');

// 生成随机助记词
const mnemonic = ethers.Mnemonic.entropyToPhrase(ethers.randomBytes(32));
// 通过随机助记词创建钱包
const wallet = ethers.HDNodeWallet.fromPhrase(mnemonic);

// 将重要信息写入data/wallet.json中
const writeDate = {
    path: wallet.path,
    address: wallet.address,
    phrase: wallet.mnemonic.phrase,
    entropy: wallet.mnemonic.entropy,
    chainCode: wallet.chainCode,
    publicKey: wallet.publicKey,
    privateKey: wallet.privateKey
};

writeFileSync(path.join(__dirname, '../data/wallet.json'), JSON.stringify(writeDate, null, 4));
