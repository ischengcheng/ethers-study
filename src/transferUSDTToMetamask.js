/*
 * @Author: ischengcheng ischengcheng20@gmail.com
 * @Date: 2023-07-05
 * @LastEditors: ischengcheng ischengcheng20@gmail.com
 * @LastEditTime: 2023-07-10
 * @FilePath: /ethers-study/src/transferUSDTToMetamask.js
 * @Description: 转账USDT到metamask钱包里
 */
const {ethers} = require('ethers');

// 1、获得provider连接区块链网络
const rpcUrl = 'https://rpc-testnet.kcc.network/';
const provider = new ethers.JsonRpcProvider(rpcUrl);

// 2、设置usdt合约地址、接收方地址、发送方的私钥
const toAddress = '0xc04F6F1FA66aaE40FA25726326c2f9862D55Eb5F';
const fromAddress = '0x350aA9b548383d775eE3aDD24Ccd2D843de3029C';
const contractAddress = '0x67f6a7BbE0da067A747C6b2bEdF8aBBF7D6f60dc';
const privateKey = '0x3b0febfae4c8052c0bf2e112d279c70eb9b85e6874f3fa71eb35182508bda521';

const transfer = async () => {
    // 3、创建 Wallet 对象
    const wallet = new ethers.Wallet(privateKey, provider);
    const signer = await wallet.connect(provider);

    // 4、创建合约ABI
    const abi = [
        'function balanceOf(address) view returns (uint256)',
        'function transfer(address, uint256) view returns (bool)',
        'event Transfer(address indexed from, address indexed to, uint value)'
    ];

    // 5、创建合约实例
    const contract = new ethers.Contract(contractAddress, abi, signer);

    // 6、查询USDT的余额
    const balance = await contract.balanceOf(fromAddress);
    console.log(`before transfer usdt balance: ${ethers.formatEther(balance)}usdt`);

    // 7、调用合约方法转账
    const amount = ethers.parseUnits('10', 18);
    const tx = await contract.transfer(toAddress, amount);
    if (tx) {
        console.log(`success transfer ${ethers.formatUnits(amount, 18)} usdt to ${toAddress}`);
    } else {
        console.error(`failed transfer ${ethers.formatUnits(amount, 18)} usdt to ${toAddress}`);
    }
};

transfer().catch(console.error);
