/// <reference types="vite/client" />

interface Window {
    ethereum: any;
}

interface EIP6963ProviderInfo {
    uuid: string;
    name: string;
    icon: string;
    rdns: string;
  }
  interface EIP6963ProviderDetail {
    info: EIP6963ProviderInfo;
    provider: EIP1193Provider;
  }
  interface EIP6963AnnounceProviderEvent extends CustomEvent {
    type: "eip6963:announceProvider";
    detail: EIP6963ProviderDetail;
  }
  interface EIP6963RequestProviderEvent extends Event {
    type: "eip6963:requestProvider";
  }

  /// <reference types="vite/client" />

interface EIP6963ProviderDetail {
    info: EIP6963ProviderInfo;
    provider: EIP1193Provider;
  }
  
  interface EIP6963ProviderInfo {
    walletId: string;
    uuid: string;
    name: string;
    icon: string;
  }
  
  type EIP6963AnnounceProviderEvent = {
    detail:{
      info: EIP6963ProviderInfo,
      provider: EIP1193Provider
    }
  }
  
  interface EIP1193Provider {
    isStatus?: boolean;
    host?: string;
    path?: string;
    sendAsync?: (request: { method: string, params?: Array<unknown> }, callback: (error: Error | null, response: unknown) => void) => void
    send?: (request: { method: string, params?: Array<unknown> }, callback: (error: Error | null, response: unknown) => void) => void
    request: (request: { method: string, params?: Array<unknown> }) => Promise<unknown>
  }