import Link from 'next/link'
 
function Nav() {
  return (
    <ul id='navigation_menu'>
      <li>
        <Link className="navipunkt" id='dabinich' href="/">Home</Link>
      </li>
      <li>
        <Link className="navipunkt" href="/about">About</Link>
      </li>
    </ul>
  )
}
 
export default Nav