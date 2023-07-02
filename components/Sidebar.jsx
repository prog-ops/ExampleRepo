'use client'

import { useRouter } from 'next/navigation';
import {useSession} from "next-auth/react";

export default function Sidebar() {
  const { data: session, status } = useSession()

  const router = useRouter();

  const handleMenuItemClick = (route) => {
    router.push(route);
  };

  const isActiveRoute = (route) => {
    return router.pathname === route;
  };

  if (status === 'authenticated') { // ng
    return (
        <div className="bg-gray-200 w-56 p-4">
          <h3 className="text-xl font-semibold mb-4">Menu</h3>
          <ul className="space-y-2">
            <li
                className={`cursor-pointer ${
                    router.pathname === '/' ? 'text-blue-500' : '' // router.pathname sama saja dgn isActiveRoute
                    // isActiveRoute('/') ? 'text-blue-500' : ''
                }
                p-2 hover:bg-cyan-900 hover:rounded`}
                onClick={() => handleMenuItemClick('/')}>
              Home
            </li>
            <li
                className={`cursor-pointer ${
                    // router.pathname === '/dashboard' ? 'text-blue-500' : ''
                    isActiveRoute('/dashboard') ? 'text-blue-500' : ''
                }
                p-2 hover:bg-cyan-800 hover:rounded`}
                onClick={() => handleMenuItemClick('/dashboard')}>
              Dashboard
            </li>
            <li
                className={`cursor-pointer ${
                    // router.pathname === '/contact' ? 'text-blue-500' : ''
                    isActiveRoute('/contact') ? 'text-blue-500' : ''
                }
                p-2 hover:bg-cyan-700 hover:rounded`}
                onClick={() => handleMenuItemClick('/contact')}>
              {/*{isActiveRoute('/contact') ? <div className='bg-blue-800'>Contactcxbvcxb</div> : 'Contact'}*/}
              Contact
            </li>
          </ul>
        </div>
    );
  }
}
