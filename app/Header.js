// 👇 import local font
import localFont from 'next/font/local'

//👇 Configure our local font object
//const myFont = localFont({ src: '../public/font/aspire-font/AspireDemibold-YaaO.ttf' })
//const myFont = localFont({ src: '../public/font/playball-font/Playball-q6o1.ttf' })
//const myFont = localFont({ src: '../public/font/cherry-cocktail-font/CherryCocktail-DOpY9.ttf' })
const myFont = localFont({ src: '../public/font/comfortaa-font/Comfortaa-YJnL.ttf' })
//const myFont = localFont({ src: '../public/font/cymo-font/Cymo-BpRw.ttf' })

// const myFont = localFont({ src: '../public/font/gihun-font/Gihun-DORdR.ttf' })
//const myFont = localFont({ src: '../public/font/juanmikes-font/Juanmikes-7D2K.otf' })
//const myFont = localFont({ src: '../public/font/sd-those-good-times-of-life-font/SdThoseGoodTimesOfLife-B1An.ttf' })
//const myFont = localFont({ src: '../public/font/simplewriting-font/Simplewriting-DRm0.ttf' })
//const myFont = localFont({ src: '../public/font/symca-font/Symcapersonaluse-Ad66.ttf' })
//const myFont = localFont({ src: '../public/font/thinhand-font/Thinhand-MdXv.ttf' })


export default function Header({ children }) {
  //👇 Add our local font as a className
  return <span className={`${myFont.className} `}>{children}</span>
  
}