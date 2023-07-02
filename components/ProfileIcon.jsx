"use client"

import {signIn, signOut, useSession} from "next-auth/react";
import Image from "next/image";
import {useRouter} from "next/navigation";

/*
To enable load external image url of Image next/image, add below inside const nextConfig = {}

images: {
    domains: [
        'avatars.githubusercontent.com'
    ]
  }

Penjelasan ditulis sini karena nextConfig ga bisa dikasih komen.
 */
export const ProfileIcon = () => {
  const { data: session, status } = useSession()
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/contact');
  };

  const handleSignIn = async () => {
    await signIn('github');
    router.push('/contact');
  };

  if (status === 'authenticated') {
    return (
        <div className='flex gap-5'>
          <Image
              src={session.user.image}
              width={40}
              height={40}
              className='rounded-full'
          />
          <div className='text-amber-300 mt-2'>{session.user.name}</div>
          <button onClick={handleSignOut}>
            Sign Out
          </button>
          {/*<button onClick={() => signOut() }>Sign Out</button>*/}
        </div>
    )
  }

  return (
      <button onClick={handleSignIn}>Sign In</button>
      // <button onClick={() => signIn('github')}>Sign In</button>
  );
}
