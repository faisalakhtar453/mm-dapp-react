import { useEffect, useState } from 'react'
import { useSyncProviders } from './useSyncProviders'
import { formatBalance, formatChainAsNum } from '../utils'
import detectEthereumProvider from "@metamask/detect-provider";

interface EIP6963ProviderDetail {
    provider: any;
    info: {
        uuid: string;
        icon: string;
        name: string;
    };
}

export default function DetectMultiple() {
    const [selectedWallet, setSelectedWallet] = useState<EIP6963ProviderDetail>()
    const [userAccount, setUserAccount] = useState<string>('')
    const providers = useSyncProviders()
    const [hasProvider, setHasProvider] = useState<boolean | null>(null);
    const initialState = { accounts: [], balance: "", chainId: "" };
    const [wallet, setWallet] = useState(initialState);
    const [isConnecting, setIsConnecting] = useState(false);
    const [isdisConnect, setIsdisConnect] = useState(false);

    const [triggerEffect, setTriggerEffect] = useState(false);

    const handleConnect = async (providerWithInfo: EIP6963ProviderDetail) => {
        setIsConnecting(true);
        const accounts = await providerWithInfo.provider
            .request({ method: 'eth_requestAccounts' })
            .catch(console.error)
        if (accounts?.[0]) {
            setSelectedWallet(providerWithInfo)
            setUserAccount(accounts?.[0])
            setTriggerEffect(true);
        }
        setIsConnecting(false);
    }



    useEffect(() => {
        const refreshAccounts = (accounts: any) => {
            if (accounts.length > 0) {
                updateWallet(accounts);
            } else {
                setWallet(initialState);
            }
        };

        const refreshChain = (chainId: any) => {
            setWallet((wallet) => ({ ...wallet, chainId }));
        };

        const getProvider = async () => {
            const provider = await detectEthereumProvider({ silent: true });
            setHasProvider(Boolean(provider));

            if (provider) {
                const accounts = await window.ethereum.request({
                    method: "eth_accounts",
                });
                refreshAccounts(accounts);
                window.ethereum.on("accountsChanged", refreshAccounts);
                window.ethereum.on("chainChanged", refreshChain);
            }
        };

        if (triggerEffect) {
            getProvider();
            setTriggerEffect(false);
        }
        return () => {
            window.ethereum?.removeListener("accountsChanged", refreshAccounts);
            window.ethereum?.removeListener("chainChanged", refreshChain);
        };
    }, [triggerEffect]);

    const updateWallet = async (accounts: any) => {
        const balance = formatBalance(
            await window.ethereum!.request({
                method: "eth_getBalance",
                params: [accounts[0], "latest"],
            })
        );
        const chainId = await window.ethereum!.request({
            method: "eth_chainId",
        });
        setWallet({ accounts, balance, chainId });
    };
    const disconnect = async () => {
        await window.ethereum.request({
            method: "wallet_revokePermissions",
            params: [
                {
                    eth_accounts: {},
                },
            ],
        });
        setIsdisConnect(true)
    }
    return (
        <>
            {/* <div>
                Injected Provider {hasProvider ? "DOES" : "DOES NOT"} Exist
            </div> */}
            {(!userAccount && isdisConnect == false) || isdisConnect == true ? (
                <div style={{ display: 'flex', flexDirection: "column" }}>
                    <h2>Wallets Detected:</h2>
                    {providers.length > 0 ? providers?.map((provider: EIP6963ProviderDetail) => (
                        <button key={provider.info.uuid} onClick={() => handleConnect(provider)} >
                            <img src={provider.info.icon} alt={provider.info.name} />
                            <div>{provider.info.name}</div>
                        </button>
                    )) :
                        <div>
                            there are no Announced Providers
                        </div>}
                </div>
            ) : ''}

            <hr />
            <h2>{userAccount ? "" : "No "}Wallet Selected</h2>
            {isdisConnect == false && userAccount ?
                (
                    <div>
                        <div>
                            <img src={selectedWallet!.info.icon} alt={selectedWallet!.info.name} />
                            <div>{selectedWallet!.info.name}</div>
                            {/* <div>({formatAddress(userAccount)})</div> */}
                            <div>{userAccount}</div>
                            <div>Wallet Balance: {wallet.balance}</div>
                            <div>Hex ChainId: {wallet.chainId}</div>
                            <div>Numeric ChainId: {formatChainAsNum(wallet.chainId)}</div>
                        </div>
                        <button onClick={disconnect}>Disconnect</button>
                    </div>
                ) : ''
            }
        </>
    )
}
