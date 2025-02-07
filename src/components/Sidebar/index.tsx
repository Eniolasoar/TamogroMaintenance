import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SidebarLinkGroup from './SidebarLinkGroup';
import { useGlobalContext } from '../../GlobalProvider';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );
  const { globalState: { role } } = useGlobalContext();

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-[#09432D] duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/">
        <div className='flex flex-row justify-center items-center gap-3'>
       
<h1 className='text-white text-xl font-bold text-center'>Tamogro Maintenance Department</h1>
        </div>
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        {role!=='Administrator'?(
           <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
           {/* <!-- Menu Group --> */}
           <div>
             <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
               MENU
             </h3>
 
             <ul className="mb-6 flex flex-col gap-1.5">
               {/* <!-- Menu Item Dashboard --> */}
               <SidebarLinkGroup
                 activeCondition={
                   pathname === '/' || pathname.includes('dashboard')
                 }
               >
                 {(handleClick, open) => {
                   return (
                     <React.Fragment>
                       <NavLink
                         to="/"
                         className={`group relative flex items-center gap-2.5 rounded-sm py-2
                            px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-white hover:text-[#09432D] ${
                           pathname.includes('chart') && 'bg-[#09432D] '
                         }`}
                         onClick={(e) => {
                          
                           sidebarExpanded
                             ? handleClick()
                             : setSidebarExpanded(true)
                         }}
                       >
                         <svg
                           className="fill-current"
                           width="18"
                           height="18"
                           viewBox="0 0 18 18"
                           fill="none"
                           xmlns="http://www.w3.org/2000/svg"
                         >
                           <path
                             d="M6.10322 0.956299H2.53135C1.5751 0.956299 0.787598 1.7438 0.787598 2.70005V6.27192C0.787598 7.22817 1.5751 8.01567 2.53135 8.01567H6.10322C7.05947 8.01567 7.84697 7.22817 7.84697 6.27192V2.72817C7.8751 1.7438 7.0876 0.956299 6.10322 0.956299ZM6.60947 6.30005C6.60947 6.5813 6.38447 6.8063 6.10322 6.8063H2.53135C2.2501 6.8063 2.0251 6.5813 2.0251 6.30005V2.72817C2.0251 2.44692 2.2501 2.22192 2.53135 2.22192H6.10322C6.38447 2.22192 6.60947 2.44692 6.60947 2.72817V6.30005Z"
                             fill=""
                           />
                           <path
                             d="M15.4689 0.956299H11.8971C10.9408 0.956299 10.1533 1.7438 10.1533 2.70005V6.27192C10.1533 7.22817 10.9408 8.01567 11.8971 8.01567H15.4689C16.4252 8.01567 17.2127 7.22817 17.2127 6.27192V2.72817C17.2127 1.7438 16.4252 0.956299 15.4689 0.956299ZM15.9752 6.30005C15.9752 6.5813 15.7502 6.8063 15.4689 6.8063H11.8971C11.6158 6.8063 11.3908 6.5813 11.3908 6.30005V2.72817C11.3908 2.44692 11.6158 2.22192 11.8971 2.22192H15.4689C15.7502 2.22192 15.9752 2.44692 15.9752 2.72817V6.30005Z"
                             fill=""
                           />
                           <path
                             d="M6.10322 9.92822H2.53135C1.5751 9.92822 0.787598 10.7157 0.787598 11.672V15.2438C0.787598 16.2001 1.5751 16.9876 2.53135 16.9876H6.10322C7.05947 16.9876 7.84697 16.2001 7.84697 15.2438V11.7001C7.8751 10.7157 7.0876 9.92822 6.10322 9.92822ZM6.60947 15.272C6.60947 15.5532 6.38447 15.7782 6.10322 15.7782H2.53135C2.2501 15.7782 2.0251 15.5532 2.0251 15.272V11.7001C2.0251 11.4188 2.2501 11.1938 2.53135 11.1938H6.10322C6.38447 11.1938 6.60947 11.4188 6.60947 11.7001V15.272Z"
                             fill=""
                           />
                           <path
                             d="M15.4689 9.92822H11.8971C10.9408 9.92822 10.1533 10.7157 10.1533 11.672V15.2438C10.1533 16.2001 10.9408 16.9876 11.8971 16.9876H15.4689C16.4252 16.9876 17.2127 16.2001 17.2127 15.2438V11.7001C17.2127 10.7157 16.4252 9.92822 15.4689 9.92822ZM15.9752 15.272C15.9752 15.5532 15.7502 15.7782 15.4689 15.7782H11.8971C11.6158 15.7782 11.3908 15.5532 11.3908 15.272V11.7001C11.3908 11.4188 11.6158 11.1938 11.8971 11.1938H15.4689C15.7502 11.1938 15.9752 11.4188 15.9752 11.7001V15.272Z"
                             fill=""
                           />
                         </svg>
                         Dashboard
                        
                       </NavLink>
                       {/* <!-- Dropdown Menu Start --> */}
                       {/* <div
                         className={`translate transform overflow-hidden ${
                           !open && 'hidden'
                         }`}
                       >
                         <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                           <li>
                             <NavLink
                               to="/"
                               className={({ isActive }) =>
                                 'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                 (isActive && '!text-white')
                               }
                             >
                               eCommerce
                             </NavLink>
                           </li>
                         </ul>
                       </div> */}
                       {/* <!-- Dropdown Menu End --> */}
                     </React.Fragment>
                   );
                 }}
               </SidebarLinkGroup>
             
             </ul>
           </div>
 
           {/* <!-- Others Group --> */}
           <div>
             <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
               MY TASKS
             </h3>
 
             <ul className="mb-6 flex flex-col gap-1.5">
               {/* <!-- Menu Item Chart --> */}
               {role !== 'Technician'?(
                   <li>
                   <NavLink
                     to="/notStarted"
                     className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-white hover:text-[#09432D] ${
                       pathname.includes('chart') && 'bg-[#09432D] '
                     }`}
                   >
                    <svg className="fill-current" width="18" height="19" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"  fill="none" ><path d="M12 17q.425 0 .713-.288T13 16t-.288-.712T12 15t-.712.288T11 16t.288.713T12 17m0-4q.425 0 .713-.288T13 12V8q0-.425-.288-.712T12 7t-.712.288T11 8v4q0 .425.288.713T12 13m0 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/></svg>
                     Not Started
                   </NavLink>
                 </li>
               ):null}
             
               {/* <!-- Menu Item Chart --> */}
 
               {/* <!-- Menu Item Ui Elements --> */}
               <SidebarLinkGroup
                 activeCondition={pathname === '/ui' || pathname.includes('ui')}
               >
                 {(handleClick, open) => {
                   return (
                     <React.Fragment>
                       <NavLink
                         to="/inProgress"
                   className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-white hover:text-[#09432D] ${
                     pathname.includes('chart') && 'bg-[#09432D] '
                   }`}
                         onClick={(e) => {
                          
                           sidebarExpanded
                             ? setSidebarExpanded(false)
                             : (handleClick(), setSidebarExpanded(true))
                         }}
                       >
                        <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 32 32"  fill="none"><path d="M16 2a14 14 0 1 0 14 14A14.016 14.016 0 0 0 16 2m0 26a12 12 0 0 1 0-24v12l8.481 8.481A11.96 11.96 0 0 1 16 28"/></svg>
                         In Progress
                         
                       </NavLink>
                       {/* <!-- Dropdown Menu Start --> */}
                       
                       {/* <!-- Dropdown Menu End --> */}
                     </React.Fragment>
                   );
                 }}
               </SidebarLinkGroup>
               {/* <!-- Menu Item Ui Elements --> */}
 
               {/* <!-- Menu Item Auth Pages --> */}
               <SidebarLinkGroup
                 activeCondition={
                   pathname === '/auth' || pathname.includes('auth')
                 }
               >
                 {(handleClick, open) => {
                   return (
                     <React.Fragment>
                       <NavLink
                         to="/completed"
                         className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-white hover:text-[#09432D] ${
                           pathname.includes('chart') && 'bg-[#09432D] '
                         }`}
                         onClick={(e) => {
                           
                           sidebarExpanded
                             ? handleClick()
                             : setSidebarExpanded(true);
                         }}
                       >
                         <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 2048 2048"  fill="none">
                         <path d="M1024 0q141 0 272 36t244 104t207 160t161 207t103 245t37 272q0 141-36 272t-104
                          244t-160 207t-207 161t-245 103t-272 37q-141 0-272-36t-244-104t-207-160t-161-207t-103-245t-37-272q0-141 
                          36-272t104-244t160-207t207-161T752 37t272-37m603 685l-136-136l-659 659l-275-275l-136 136l411 411z"/>
                         </svg>
                         Completed
                         
                       </NavLink>
                       {/* <!-- Dropdown Menu Start --> */}
                     
                       {/* <!-- Dropdown Menu End --> */}
                     </React.Fragment>
                   );
                 }}
               </SidebarLinkGroup>
               {/* <!-- Menu Item Auth Pages --> */}
             </ul>
           </div>
         </nav>
        ):(
          <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Dashboard --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === '/' || pathname.includes('dashboard')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="/"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2
                           px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-white hover:text-[#09432D] ${
                          pathname.includes('chart') && 'bg-[#09432D] '
                        }`}
                        onClick={(e) => {
                         
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true)
                        }}
                      >
                        <svg
                          className="fill-current"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.10322 0.956299H2.53135C1.5751 0.956299 0.787598 1.7438 0.787598 2.70005V6.27192C0.787598 7.22817 1.5751 8.01567 2.53135 8.01567H6.10322C7.05947 8.01567 7.84697 7.22817 7.84697 6.27192V2.72817C7.8751 1.7438 7.0876 0.956299 6.10322 0.956299ZM6.60947 6.30005C6.60947 6.5813 6.38447 6.8063 6.10322 6.8063H2.53135C2.2501 6.8063 2.0251 6.5813 2.0251 6.30005V2.72817C2.0251 2.44692 2.2501 2.22192 2.53135 2.22192H6.10322C6.38447 2.22192 6.60947 2.44692 6.60947 2.72817V6.30005Z"
                            fill=""
                          />
                          <path
                            d="M15.4689 0.956299H11.8971C10.9408 0.956299 10.1533 1.7438 10.1533 2.70005V6.27192C10.1533 7.22817 10.9408 8.01567 11.8971 8.01567H15.4689C16.4252 8.01567 17.2127 7.22817 17.2127 6.27192V2.72817C17.2127 1.7438 16.4252 0.956299 15.4689 0.956299ZM15.9752 6.30005C15.9752 6.5813 15.7502 6.8063 15.4689 6.8063H11.8971C11.6158 6.8063 11.3908 6.5813 11.3908 6.30005V2.72817C11.3908 2.44692 11.6158 2.22192 11.8971 2.22192H15.4689C15.7502 2.22192 15.9752 2.44692 15.9752 2.72817V6.30005Z"
                            fill=""
                          />
                          <path
                            d="M6.10322 9.92822H2.53135C1.5751 9.92822 0.787598 10.7157 0.787598 11.672V15.2438C0.787598 16.2001 1.5751 16.9876 2.53135 16.9876H6.10322C7.05947 16.9876 7.84697 16.2001 7.84697 15.2438V11.7001C7.8751 10.7157 7.0876 9.92822 6.10322 9.92822ZM6.60947 15.272C6.60947 15.5532 6.38447 15.7782 6.10322 15.7782H2.53135C2.2501 15.7782 2.0251 15.5532 2.0251 15.272V11.7001C2.0251 11.4188 2.2501 11.1938 2.53135 11.1938H6.10322C6.38447 11.1938 6.60947 11.4188 6.60947 11.7001V15.272Z"
                            fill=""
                          />
                          <path
                            d="M15.4689 9.92822H11.8971C10.9408 9.92822 10.1533 10.7157 10.1533 11.672V15.2438C10.1533 16.2001 10.9408 16.9876 11.8971 16.9876H15.4689C16.4252 16.9876 17.2127 16.2001 17.2127 15.2438V11.7001C17.2127 10.7157 16.4252 9.92822 15.4689 9.92822ZM15.9752 15.272C15.9752 15.5532 15.7502 15.7782 15.4689 15.7782H11.8971C11.6158 15.7782 11.3908 15.5532 11.3908 15.272V11.7001C11.3908 11.4188 11.6158 11.1938 11.8971 11.1938H15.4689C15.7502 11.1938 15.9752 11.4188 15.9752 11.7001V15.272Z"
                            fill=""
                          />
                        </svg>
                        Dashboard
                       
                      </NavLink>
                    
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
            
            </ul>
          </div>

          {/* <!-- Others Group --> */}
          <div>
          <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
               OTHERS
             </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
             

             

              {/* <!-- Menu Item Auth Pages --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === '/auth' || pathname.includes('auth')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="/employeeTable"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-white hover:text-[#09432D] ${
                          pathname.includes('chart') && 'bg-[#09432D] '
                        }`}
                        onClick={(e) => {
                          
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <svg className="fill-current" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14 8H19M15 12H19M17 16H19M12 16.33C11.86 14.88 10.71 13.74 9.26 13.61C8.76 13.56 8.25 13.56 7.74 13.61C6.29 13.75 5.14 14.88 5 16.33M17 21H7C3 21 2 20 2 16V8C2 4 3 3 7 3H17C21 3 22 4 22 8V16C22 20 21 21 17 21ZM10.31 9.48C10.31 10.4796 9.49964 11.29 8.5 11.29C7.50036 11.29 6.69 10.4796 6.69 9.48C6.69 8.48036 7.50036 7.67 8.5 7.67C9.49964 7.67 10.31 8.48036 10.31 9.48Z" stroke="#09432D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                        Employee Table
                        
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                    
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              <SidebarLinkGroup
                activeCondition={
                  pathname === '/auth' || pathname.includes('auth')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="/registerEmployee"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-white hover:text-[#09432D] ${
                          pathname.includes('chart') && 'bg-[#09432D] '
                        }`}
                        onClick={(e) => {
                          
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <svg className="fill-current" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.9704 14.44C18.3404 14.67 19.8504 14.43 20.9104 13.72C22.3204 12.78 22.3204 11.24 20.9104 10.3C19.8404 9.59001 18.3104 9.35 16.9404 9.59M7.00043 14.44C5.63043 14.67 4.12043 14.43 3.06043 13.72C1.65043 12.78 1.65043 11.24 3.06043 10.3C4.13043 9.59001 5.66043 9.35 7.03043 9.59M18.0004 7.16C17.9404 7.15 17.8704 7.15 17.8104 7.16C16.4304 7.11 15.3304 5.98 15.3304 4.58C15.3304 3.15 16.4804 2 17.9104 2C19.3404 2 20.4904 3.16 20.4904 4.58C20.4804 5.98 19.3804 7.11 18.0004 7.16ZM5.97043 7.16C6.03043 7.15 6.10043 7.15 6.16043 7.16C7.54043 7.11 8.64043 5.98 8.64043 4.58C8.64043 3.15 7.49043 2 6.06043 2C4.63043 2 3.48043 3.16 3.48043 4.58C3.49043 5.98 4.59043 7.11 5.97043 7.16ZM12.0004 14.63C11.9404 14.62 11.8704 14.62 11.8104 14.63C10.4304 14.58 9.33043 13.45 9.33043 12.05C9.33043 10.62 10.4804 9.47 11.9104 9.47C13.3404 9.47 14.4904 10.63 14.4904 12.05C14.4804 13.45 13.3804 14.59 12.0004 14.63ZM9.09043 17.78C7.68043 18.72 7.68043 20.26 9.09043 21.2C10.6904 22.27 13.3104 22.27 14.9104 21.2C16.3204 20.26 16.3204 18.72 14.9104 17.78C13.3204 16.72 10.6904 16.72 9.09043 17.78Z" stroke="#09432D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                        Register Employee
                        
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                    
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Auth Pages --> */}
            </ul>
          </div>
        </nav>
        )}
       
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
