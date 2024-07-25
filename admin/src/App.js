import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
// import { FiSettings } from 'react-icons/fi';
// import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Sidebar, ThemeSettings } from './components';
import './App.css';

import { useStateContext } from './contexts/ContextProvider';

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';
import 'antd/dist/reset.css';


import StaffRouter from './router/StaffRouter';
import AdminRouter from './router/AdminRouter';
import AuthRouter from './router/AuthRouter';
import { fetchRefreshToken } from './data/api';

const App = () => {
  // const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();
  const { currentMode, activeMenu, themeSettings } = useStateContext();

  // useEffect(() => {
  //   const currentThemeColor = localStorage.getItem('colorMode');
  //   const currentThemeMode = localStorage.getItem('themeMode');
  //   if (currentThemeColor && currentThemeMode) {
  //     setCurrentColor(currentThemeColor);
  //     setCurrentMode(currentThemeMode);
  //   }
  // }, []);

  const result = JSON.parse(localStorage.getItem("result")) || null;
  useEffect(() => {
    const checkToken = async () => {
      if (result !== null) {
        await fetchRefreshToken(result)
          .then((res) => {
            localStorage.setItem("result", JSON.stringify(res.data.result));
          })
          .catch((error) => {
            localStorage.clear();
            window.location.reload();
          });
      }
    };
    checkToken();
  }, []);

  const isAuthenticatedAdmin = localStorage.getItem('isAuthenticatedAdmin') === 'true';
  const isAuthenticatedStaff = localStorage.getItem('isAuthenticatedStaff') === 'true';

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          {isAuthenticatedStaff ? (
            <>
              {/* <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
                <TooltipComponent
                  content="Settings"
                  position="Top"
                >
                  <button
                    type="button"
                    onClick={() => setThemeSettings(true)}
                    style={{ background: currentColor, borderRadius: '50%' }}
                    className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                  >
                    <FiSettings />
                  </button>

                </TooltipComponent>
              </div> */}
              {activeMenu ? (
                <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                  <Sidebar isAuthenticatedStaff={isAuthenticatedStaff} />
                </div>
              ) : (
                <div className="w-0 dark:bg-secondary-dark-bg">
                  <Sidebar isAuthenticatedStaff={isAuthenticatedStaff} />
                </div>
              )}
              <div
                className={
                  activeMenu
                    ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                    : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
                }
              >
                <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                  <Navbar isAuthenticatedStaff={isAuthenticatedStaff} />
                </div>
                <div>
                  {themeSettings && (<ThemeSettings />)}
                  <StaffRouter />
                </div>
              </div>
            </>
          ) : isAuthenticatedAdmin ? (
            <>
              {/* <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
                <TooltipComponent
                  content="Settings"
                  position="Top"
                >
                  <button
                    type="button"
                    onClick={() => setThemeSettings(true)}
                    style={{ background: currentColor, borderRadius: '50%' }}
                    className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                  >
                    <FiSettings />
                  </button>

                </TooltipComponent>
              </div> */}
              {activeMenu ? (
                <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                  <Sidebar isAuthenticatedAdmin={isAuthenticatedAdmin} />
                </div>
              ) : (
                <div className="w-0 dark:bg-secondary-dark-bg">
                  <Sidebar isAuthenticatedAdmin={isAuthenticatedAdmin} />
                </div>
              )}
              <div
                className={
                  activeMenu
                    ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                    : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
                }
              >
                <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                  <Navbar isAuthenticatedAdmin={isAuthenticatedAdmin} />
                </div>
                <div>
                  {themeSettings && (<ThemeSettings />)}
                  <AdminRouter />
                </div>
              </div>
            </>
          ) : (
            <AuthRouter />
          )

          }
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
