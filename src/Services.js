import Web3 from "web3";
import abi from "./abi.json";

class Services {
  web3 = new Web3(window.ethereum);
  contractAddress = "0xb282b62732Bd61f9827E76fd778a90A882e4dfaa";

  contractFactory = new this.web3.eth.Contract(abi, this.contractAddress);

  async getBalance() {
    try {
      return await this.contractFactory.methods.getBalance().call();
    } catch (e) {
      console.error(e);
    }
  }

  async sendDeposit(wallet, value) {
    try {
      return await this.contractFactory.methods
        .deposit()
        .send({ from: wallet, value: value });
    } catch (e) {
      console.error(e);
    }
  }

  async withdraw(wallet, value) {
    try {
      return await this.contractFactory.methods
        .withdraw(value)
        .send({ from: wallet });
    } catch (e) {
      console.error(e);
    }
  }
}

export default new Services();
