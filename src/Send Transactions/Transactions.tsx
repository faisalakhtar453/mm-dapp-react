import { useState } from 'react';

function EthereumTransaction() {
    const [accounts, setAccounts] = useState([]);
    const [recipientAddress, setRecipientAddress] = useState('');
    const [valueInWei, setValueInWei] = useState('');

    const handleSendEth = async () => {
        const weiAmount = parseFloat(valueInWei) * 1e18;
        try {
            const txHash = await window.ethereum.request({
                method: "eth_sendTransaction",
                params: [
                    {
                        from: accounts[0],
                        to: recipientAddress,
                        value: `0x${weiAmount.toString(16)}`,
                        gasLimit: '0x5028',
                        maxPriorityFeePerGas: '0x3b9aca00',
                        maxFeePerGas: '0x2540be400',
                    },
                ],
            });
            console.log(txHash);
        } catch (error) {
            console.error(error);
        }
    };

    const handleEnableEthereum = async () => {
        try {
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            console.log('accounts', accounts)
            setAccounts(accounts);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Recipient Address"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
            />
            <input
                type="text"
                placeholder="Value in Wei"
                value={valueInWei}
                onChange={(e) => setValueInWei(e.target.value)}
            />
            <button className="enableEthereumButton btn" onClick={handleEnableEthereum}>Enable Ethereum</button>
            <button className="sendEthButton btn" onClick={handleSendEth}>Send ETH</button>
        </div>
    );
}

export default EthereumTransaction;
