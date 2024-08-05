import type { W3mButton } from '@web3modal/scaffold';



export declare class W3mConnectButtonWithEvent extends W3mButton {

  disconnectedCallback(): void;
}


export default function ConnectButton() {
    return (
      <div id="button_connect"
      >
          <w3m-button />
      </div>
     
    )
    
    
  }