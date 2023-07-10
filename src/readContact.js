/*
 * @Author: ischengcheng ischengcheng20@gmail.com
 * @Date: 2023-07-2
 * @LastEditors: ischengcheng ischengcheng20@gmail.com
 * @LastEditTime: 2023-07-10
 * @FilePath: /ethers-study/src/readContact.js
 * @Description: 读取合约
 */
const ethers = require('ethers');

// 1. 创建provider
const providerETH = new ethers.getDefaultProvider();
// 2. 准备合约地址和abi
const addressDAI = '0x6B175474E89094C44Da98b954EedeAC495271d0F';

const abiERC20 = [
    'function name() view returns (string)',
    'function symbol() view returns (string)',
    'function totalSupply() view returns (uint256)',
    'function balanceOf(address) view returns (uint)'
];

// 3. 创建合约变量
const contactDAI = new ethers.Contract(addressDAI, abiERC20, providerETH);

const main = async () => {
    // 1. 读取WETH合约上的信息
    const nameWETH = await contactDAI.name();
    const symbolWETH = await contactDAI.symbol();
    const totalSupplyWETH = await contactDAI.totalSupply();
    const balanceWETH = await contactDAI.balanceOf('vitalik.eth');

    console.log('1.读取WETH合约地址', addressDAI);
    console.log('1.读取WETH合约名称', nameWETH);
    console.log('1.读取WETH合约代号', symbolWETH);
    console.log('1.读取WETH合约供给', totalSupplyWETH);
    console.log('1.读取WETH合约余额', balanceWETH);
};

main();
