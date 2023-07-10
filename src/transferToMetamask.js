/*
 * @Author: ischengcheng ischengcheng20@gmail.com
 * @Date: 2023-07-04 18:10:17
 * @LastEditors: ischengcheng ischengcheng20@gmail.com
 * @LastEditTime: 2023-07-10
 * @FilePath: /ethers-study/src/transferToMetamask.js
 * @Description: 转账到我的metamask上
 */
const {ethers} = require('ethers');

// 1、获得provider连接区块链网络
const rpcUrl = 'https://rpc-testnet.kcc.network/';
const provider = new ethers.JsonRpcProvider(rpcUrl);

const fromAddress = '0x350aA9b548383d775eE3aDD24Ccd2D843de3029C';
const toAddress = '0xc04F6F1FA66aaE40FA25726326c2f9862D55Eb5F';
const privateKey = '0x3b0febfae4c8052c0bf2e112d279c70eb9b85e6874f3fa71eb35182508bda521';

const transfer = async () => {
    // 2、查询账户余额
    const beforeBalance = await provider.getBalance(fromAddress);
    console.log(`wallet address: ${fromAddress}`);
    console.log(`before transfer wallet balance: ${ethers.formatEther(beforeBalance)}kcs`);

    // 3、创建交易对象
    const transaction = {
        to: toAddress,
        value: beforeBalance / 10n, // 转账10分之一的钱
    };

    // 4、构建钱包对象 -> 构建signer对象 -> 发送交易 -> 等待交易完成
    const wallet = new ethers.Wallet(privateKey, provider);
    const signer = wallet.connect(provider)
    const txResult = await signer.sendTransaction(transaction);
    await txResult.wait()

    // 5、查询转账后的余额
    const afterBalance = await provider.getBalance(signer.address);

    // 6、打印转账的相关信息
    console.log(`transfer hash: ${txResult.hash}`);
    console.log(`transfer gasLimit: ${txResult.gasLimit}`);
    console.log(`transfer gasPrice: ${txResult.gasPrice}`);
    console.log(`transfer amount: ${ethers.formatEther(txResult.value)}`);
    console.log(`after transfer wallet balance: ${ethers.formatEther(afterBalance)}kcs`);
};

transfer();
