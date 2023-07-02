import Link from "next/link";
import {ProfileIcon} from "@/components/ProfileIcon";

export const Navbar = () => {
  return (
      <nav className='flex items-center justify-between fixed left-0 right-0 px-8 h-14 bg-blue-800'>
        <Link href={'/'} className='font-bold'>Product site name</Link>
        <ProfileIcon/>
      </nav>
  )
}
