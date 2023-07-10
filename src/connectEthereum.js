/*
 * @Author: ischengcheng ischengcheng20@gmail.com
 * @Date: 2023-07-04 18:10:17
 * @LastEditors: ischengcheng ischengcheng20@gmail.com
 * @LastEditTime: 2023-07-10
 * @FilePath: /ethers-study/src/connectEthereum.js
 * @Description: 连接以太坊主网
 */
const ethers = require('ethers');

// 连接以太坊主网
const providerETH = new ethers.getDefaultProvider()

const main = async () => {
    // 查询信息
    console.log('1. 查询vitalik在主网的ETH余额');
    const balance = await providerETH.getBalance('vitalik.eth');
    console.log('ETH Main Network', ethers.formatEther(balance));

    console.log('2. 查询provider连接到了哪条链');
    const network = await providerETH.getNetwork();
    console.log(network);

    console.log('3. 查询区块高度');
    const blockNumber = await providerETH.getBlockNumber();
    console.log(blockNumber);

    console.log('4. 查询vitalik钱包历史交易次数');
    const txCount = await providerETH.getTransactionCount('vitalik.eth');
    console.log(txCount);

    console.log('5. 查询当前建议的gas设置');
    const feeData = await providerETH.getFeeData();
    console.log(feeData);

    console.log('6. 查询区块信息');
    const block = await providerETH.getBlock(0);
    console.log(block);

    console.log('7. 给定合约地址查询合约bytecode，例子用的WETH地址');
    const code = await providerETH.getCode('0xc778417e063141139fce010982780140aa0cd5ab');
    console.log(code);
};

main();
