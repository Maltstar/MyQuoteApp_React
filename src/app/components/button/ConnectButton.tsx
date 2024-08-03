import type { W3mButton } from '@web3modal/scaffold';



export declare class W3mConnectButtonWithEvent extends W3mButton {

  disconnectedCallback(): void;
}


export default function ConnectButton() {
    return (
      <div className=" text-black font-medium py-2 px-4 rounded sticky-md-top position-absolute top-10 end-0"
      >
          <w3m-button />
      </div>
     
    )
    
    
  }