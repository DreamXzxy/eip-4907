// 函数实现，参数单位 毫秒 ；
function wait(ms) {
  return new Promise(resolve => setTimeout(() =>resolve(), ms));
};
exports.wait = wait

const increaseWorldrimeInSeconds = async (seconds) => {
  await hre.network.provider.send("hardhat_mine", ["0x10", seconds]);
  // await ethers.provider.send('evm_increaserime', [seconds]);
  // if (mine) {
  //  await ethers.provider.send('evm mine []');
  // }
};
exports.increaseWorldrimeInSeconds = increaseWorldrimeInSeconds

  // async function sleep(ms) {
  //   await _sleep(ms);
  // }

  // function _sleep(ms) {
  //   return new Promise((resolve) => setTimeout(resolve, ms));
  // }

  // console.time('start')
  // sleep(500).then(() => {
  //     console.timeEnd('start')
  // })
