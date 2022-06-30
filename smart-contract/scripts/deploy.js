const main = async () => {
  const ElectionContract = await ethers.getContractFactory("Election");
  const [deployer] = await ethers.getSigners();
  const ElectionInstance = await ElectionContract.deploy();
  console.log('Deployer is: ', deployer.address);
  console.log(ElectionInstance.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => console.log(error));
