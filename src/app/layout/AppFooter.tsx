import Image, { StaticImageData } from "next/image";
import web3modalLogo from "@/public/assets/icons/web3modal_ico.png"
import vercelLogo from "@/public/assets/icons/vercel_ico.png"
import ethereumLogo from "@/public/assets/icons/ethereum_ico.png"
import Link from "next/link";

interface LogoProps{
    text_link:string,
    link:string,
    image_src:StaticImageData
}

function Logo({text_link,link,image_src}:LogoProps)
{
    return(

        <div className="logo">

            <Image className="image_logo" src={image_src} alt={`${text_link} logo`} width={32} height={32}/>

            <Link className="nextlink" href={link}>
                {text_link}
            </Link>
        </div>
    )
    
}

export default function AppFooter ()
{

    return(
        <footer className="site-footer">
            <div className="inner-width">
                <div className="logos">
                 &copy; Built with 💗 for free speech and decentralization - {new Date().getFullYear()} {'.'}

                    <div className="logo"> 
                        Powered by 
                        <Logo  text_link='Web3Modal'image_src={web3modalLogo} link='https://github.com/WalletConnect/web3modal' />
                        <Logo  text_link='NextJs, Vercel'image_src={vercelLogo}  link='https://github.com/WalletConnect/web3modal' />
                        <Logo  text_link='Ethereum'image_src={ethereumLogo}  link='https://ethereum.org/en/' />                   
                    </div>
                </div>
            </div>
        </footer>
    )
}