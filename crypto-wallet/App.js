import React, { useState } from 'react';
import './NavBar.css';
import './App.css';
import './Accounts.css';
import './Send.css';

function App() {

  const [activeNetwork, setNetwork] = useState('Bitcoin');
  const [nativeBalance, setNativeBalance] = useState(0);
  const [nativeCoin, setNativeCoin] = useState('BTC');

  function Navigation() {

    const handleNetworkClick = (network, coin) => {
      setNetwork(network);
      setNativeCoin(coin);
      //setNativeBalance(getBalance(network));
    };

    return (
      <nav className="navigation">
        <ul>
          <li className={activeNetwork === 'Bitcoin' ? 'active' : ''} onClick={() => handleNetworkClick('Bitcoin', 'BTC')}>
            <a href="#">Bitcoin</a>
          </li>
          <li className={activeNetwork === 'Ethereum' ? 'active' : ''} onClick={() => handleNetworkClick('Ethereum', 'ETH')}>
            <a href="#">Ethereum</a>
          </li>
          <li className={activeNetwork === 'Tron' ? 'active' : ''} onClick={() => handleNetworkClick('Tron', 'TRX')}>
            <a href="#">Tron</a>
          </li>
          <li className={activeNetwork === 'BNB Chain' ? 'active' : ''} onClick={() => handleNetworkClick('BNB Chain', 'BNB')}>
            <a href="#">BNB Chain</a>
          </li>
          <li className={activeNetwork === 'Litecoin' ? 'active' : ''} onClick={() => handleNetworkClick('Litecoin', 'LTC')}>
            <a href="#">Litecoin</a>
          </li>
        </ul>
      </nav>
    );
  };

  function CurrentNetworkBalance() {
    return (
      <div className="network-balance">
        <p>
          <b>Network:</b> {activeNetwork} <br />
          <b>Balance:</b> {nativeBalance} {nativeCoin}
        </p>
      </div>
    );
  }

  function Accounts() {
    const [currentAddress, setCurrentAddress] = useState('0x123456789abcdef');
    const [accounts, setAccounts] = useState(['0x123456789abcdef', '0x987654321fedcba', '0xfedcba987654321']);

    const handleAccountChange = (event) => {
      const newAddress = event.target.value;
      setCurrentAddress(newAddress);
    };

    return (
      <div className="accounts-block">
        <div className="current-address">
          <span><b>Current Address: </b></span>
          <span><i>{currentAddress}</i></span>
          <button className="copy-button" onClick={() => navigator.clipboard.writeText(currentAddress)}>
            Copy
          </button>
        </div>
        <div className="accounts-choices">
          <span><b>Select Account: </b></span>
          <select className="account-selector" value={currentAddress} onChange={handleAccountChange}>
            {accounts.map((address) => (
              <option key={address} value={address}>
                {address}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }

  function SendBlock() {

    const [destinationAddress, setDestinationAddress] = useState("");
    const [amount, setAmount] = useState("");

    const handleSend = () => {
      // logic for sending crypto to destinationAddress with amount
      setDestinationAddress("");
      setAmount("");
    };

    return (
      <div className="send-block">
        <label>
          <b>Destination Address:</b>
          <input
            className="send-input"
            type="text"
            value={destinationAddress}
            onChange={(e) => setDestinationAddress(e.target.value)}
          />
        </label>
        <br />
        <label>
          <b>Amount:</b>
          <input
            className="send-input"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <br />
        <button className="send-button" onClick={handleSend}>Send</button>
      </div>
    );
  }

  return (
    <>
      <Navigation />
      <div className="box">
        <CurrentNetworkBalance />
        <hr className="hr" />
        <Accounts />
        <br />
        <br />
        <hr className="hr" />
        <br />
        <SendBlock />
      </div>
    </>
  );
}

export default App;
