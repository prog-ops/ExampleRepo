'use client'

import {useState} from "react";

export const Sidebar2 = () => {
  const [collapse, setCollapse] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(false);

  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible)
  }

  const handleSidebarToggle = () => {
    setCollapse(!collapse)
  }

  // if (!collapse) {
  //   return (
  //
  //   )
  // }
  return (
      <div
          onMouseEnter={onMouseOver}
          onMouseLeave={onMouseOver}
          style={{ transition: 'width 300ms cubic-bezier(0.2, 0, 0, 1) 0s' }}
          className='h-screen px-4 pt-8 bg-lime-50 flex justify-between flex-col border border-dashed w-80'>
        <div className='flex flex-col'>
          <div className='flex items-center justify-between relative'>
            <div className='flex items-center pl-1 gap-4'>
              <span className='mt-2 text-lg font-medium text-teal-200 hidden'>span Logo</span>
            </div>
            {isCollapsible ? (
                <button
                    onClick={handleSidebarToggle}
                    className='p-4 rounded bg-lime-100 absolute right-0 rotate-180'>
                  Collapse icon
                </button>
            ) : null}
          </div>
        </div>
        <div></div>
      </div>
  );
}
