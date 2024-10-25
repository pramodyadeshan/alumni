import './header.scss';

import React, { useState } from 'react';

import { Navbar, Nav, NavbarToggler, Collapse } from 'reactstrap';
import LoadingBar from 'react-redux-loading-bar';

import { Home, Brand } from './header-components';
import { AdminMenu, EntitiesMenu, AccountMenu } from '../menus';
import { FaBell } from 'react-icons/fa';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isOpenAPIEnabled: boolean;
}

const Header = (props: IHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };
  const toggleMenu = () => setMenuOpen(!menuOpen);

  /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */

  return (
    <div id="app-header">
      <LoadingBar className="loading-bar" />
      <Navbar data-cy="navbar" dark expand="md" fixed="top" className="bg-gray-900 py-3">
        <NavbarToggler aria-label="Menu" onClick={toggleMenu} />
        <Brand />
        <Collapse isOpen={menuOpen} navbar>
          <Nav id="header-tabs" className="ms-auto" navbar>
            {props.isAuthenticated && (
              <div className="relative text-white cursor-pointer pt-2 mx-4" onClick={toggleNotification}>
                <FaBell className="text-2xl" />
                {isNotificationOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded-lg shadow-lg">
                    <div className="p-4">
                      <h3 className="font-bold text-lg">Notifications</h3>
                      <ul className="space-y-2 mt-2">
                        {/* Sample notifications */}
                        <li className="border-b border-gray-200 pb-2">New event added: Alumni Meetup</li>
                        <li className="border-b border-gray-200 pb-2">Volunteer Opportunity Updated</li>
                        <li className="pb-2">New Donation Received</li>
                      </ul>
                      <div className="text-center mt-4">
                        {/* <Link to="/notifications" className="text-blue-500 hover:underline">
                    View all
                  </Link> */}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            <Home />
            {props.isAuthenticated && <EntitiesMenu />}
            {props.isAuthenticated && props.isAdmin && <AdminMenu showOpenAPI={props.isOpenAPIEnabled} />}
            <AccountMenu isAuthenticated={props.isAuthenticated} />
          </Nav>
        </Collapse>
      </Navbar>
    </div>

    // navbar screen
    //     <div className="fixed z-[3] top-0 left-0 right-0 bg-base-100 w-full flex justify-between px-3 xl:px-4 py-3 xl:py-5 gap-4 xl:gap-0">
    //       {/* container */}
    //       <div className="flex gap-3 items-center">
    //         {/* for mobile */}
    //         <div className="drawer w-auto p-0 mr-1 xl:hidden">
    //           <input
    //             id="drawer-navbar-mobile"
    //             type="checkbox"
    //             className="drawer-toggle"
    //             checked={isDrawerOpen}
    //             onChange={toggleDrawer}
    //           />
    //           <div className="p-0 w-auto drawer-content">
    //             <label
    //               htmlFor="drawer-navbar-mobile"
    //               className="p-0 btn btn-ghost drawer-button"
    //             >
    //               <HiBars3CenterLeft className="text-2xl" />
    //             </label>
    //           </div>
    //           <div className="drawer-side z-[99]">
    //             <label
    //               htmlFor="drawer-navbar-mobile"
    //               aria-label="close sidebar"
    //               className="drawer-overlay"
    //             ></label>
    //             <div className="menu p-4 w-auto min-h-full bg-base-200 text-base-content">
    //               <Link
    //                 to={'/'}
    //                 className="flex items-center gap-1 xl:gap-2 mt-1 mb-5"
    //               >
    //                 <DiReact className="text-3xl sm:text-4xl xl:text-4xl 2xl:text-6xl text-primary animate-spin-slow" />
    //                 <span className="text-[16px] leading-[1.2] sm:text-lg xl:text-xl 2xl:text-2xl font-semibold text-base-content dark:text-neutral-200">
    //                   React Dashboard
    //                 </span>
    //               </Link>
    //               {menu.map((item, index) => (
    //                 <MenuItem
    //                   onClick={toggleDrawer}
    //                   key={index}
    //                   catalog={item.catalog}
    //                   listItems={item.listItems}
    //                 />
    //               ))}
    //             </div>
    //           </div>
    //         </div>
    //
    //         {/* navbar logo */}
    //         <Link to={'/'} className="flex items-center gap-1 xl:gap-2">
    //           <DiReact className="text-3xl sm:text-4xl xl:text-4xl 2xl:text-6xl text-primary animate-spin-slow" />
    //           <span className="text-[16px] leading-[1.2] sm:text-lg xl:text-xl 2xl:text-2xl font-semibold text-base-content dark:text-neutral-200">
    //             React Dashboard
    //           </span>
    //         </Link>
    //       </div>
    //
    //       {/* navbar items to right */}
    //       <div className="flex items-center gap-0 xl:gap-1 2xl:gap-2 3xl:gap-5">
    //         {/* search */}
    //         <button
    //           onClick={() =>
    //             toast('Gaboleh cari!', {
    //               icon: '😠',
    //             })
    //           }
    //           className="hidden sm:inline-flex btn btn-circle btn-ghost"
    //         >
    //           <HiSearch className="text-xl 2xl:text-2xl 3xl:text-3xl" />
    //         </button>
    //
    //         {/* fullscreen */}
    //         <button
    //           onClick={toggleFullScreen}
    //           className="hidden xl:inline-flex btn btn-circle btn-ghost"
    //         >
    //           {isFullScreen ? (
    //             <RxEnterFullScreen className="xl:text-xl 2xl:text-2xl 3xl:text-3xl" />
    //           ) : (
    //             <RxExitFullScreen className="xl:text-xl 2xl:text-2xl 3xl:text-3xl" />
    //           )}
    //         </button>
    //
    //         {/* notification */}
    //         <button
    //           onClick={() =>
    //             toast('Gaada notif!', {
    //               icon: '😠',
    //             })
    //           }
    //           className="px-0 xl:px-auto btn btn-circle btn-ghost"
    //         >
    //           <HiOutlineBell className="text-xl 2xl:text-2xl 3xl:text-3xl" />
    //         </button>
    //
    //         {/* theme */}
    //         <div className="px-0 xl:px-auto btn btn-circle btn-ghost xl:mr-1">
    //           <ChangeThemes />
    //         </div>
    //
    //         {/* avatar dropdown */}
    //         <div className="dropdown dropdown-end">
    //           <div
    //             tabIndex={0}
    //             role="button"
    //             className="btn btn-ghost btn-circle avatar"
    //           >
    //             <div className="w-9  rounded-full">
    //               <img
    //                 src="https://avatars.githubusercontent.com/u/74099030?v=4"
    //                 alt="foto-cowok-ganteng"
    //               />
    //             </div>
    //           </div>
    //           <ul
    //             tabIndex={0}
    //             className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-40"
    //           >
    //             <Link to={'/profile'}>
    //               <li>
    //                 <a className="justify-between">My Profile</a>
    //               </li>
    //             </Link>
    //             <li onClick={() => navigate('/login')}>
    //               <a>Log Out</a>
    //             </li>
    //           </ul>
    //         </div>
    //       </div>
    //     </div>
  );
};

export default Header;
