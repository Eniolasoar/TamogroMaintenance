import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import NotStarted from './pages/NotStarted';
import InProgress from './pages/InProgress';
import Completed from './pages/Completed';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import Home from './pages/Home';
import Admin from './pages/Dashboard/Admin';
import EmployeeTable from './pages/EmployeeTable';
import RegisterEmployee from './pages/Form/RegisterEmployee';
function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Routes>
      <Route
        path="/home"
        element={
          <>
            <PageTitle title="Home | Tamogro Maintenance Department" />
            <Home />
          </>
        }
      />
      <Route
        path="/auth/signin/:role"
        element={
          <>
            <PageTitle title="Signin | Tamogro Maintenance Management System" />
            <SignIn />
          </>
        }
      />
      <Route
        element={
     
            <DefaultLayout />

        }
  >

      <Route
        index
        element={
          <>
            <PageTitle title="Dashboard | Tamogro Maintenance Department" />
            <ECommerce />
          </>
        }
      />
      <Route
        path='/admin'
        element={
          <>
            <PageTitle title="Dashboard | Tamogro Maintenance Department" />
            <Admin/>
          </>
        }
      />
      <Route
        path="/notStarted"
        element={
          <>
            <PageTitle title="Tamogro Maintenance Department" />
            <NotStarted/>
          </>
        }
      />
      <Route
        path="/employeeTable"
        element={
          <>
            <PageTitle title="Tamogro Maintenance Department" />
            <EmployeeTable/>
          </>
        }
      />
      <Route
        path="/registerEmployee"
        element={
          <>
            <PageTitle title="Tamogro Maintenance Department" />
           <RegisterEmployee/>
          </>
        }
      />
      <Route
        path="/inProgress"
        element={
          <>
            <PageTitle title="Tamogro Maintenance Department" />
            <InProgress />
          </>
        }
      />
      <Route
        path="/completed"
        element={
          <>
            <PageTitle title="Tamogro Maintenance Department" />
            <Completed />
          </>
        }
      />
      <Route
        path="/calendar"
        element={
          <>
            <PageTitle title="Tamogro Maintenance Department" />
            <Calendar />
          </>
        }
      />
      <Route
        path="/profile"
        element={
          <>
            <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <Profile />
          </>
        }
      />
      <Route
        path="/forms/form-elements"
        element={
          <>
            <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <FormElements />
          </>
        }
      />
      <Route
        path="/forms/form-layout"
        element={
          <>
            <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <FormLayout />
          </>
        }
      />
      <Route
        path="/tables"
        element={
          <>
            <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <Tables />
          </>
        }
      />
      <Route
        path="/settings"
        element={
          <>
            <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <Settings />
          </>
        }
      />
      <Route
        path="/chart"
        element={
          <>
            <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <Chart />
          </>
        }
      />
      <Route
        path="/ui/alerts"
        element={
          <>
            <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <Alerts />
          </>
        }
      />
      <Route
        path="/ui/buttons"
        element={
          <>
            <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <Buttons />
          </>
        }
      />

      <Route
        path="/auth/signup"
        element={
          <>
            <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <SignUp />
          </>
        }
      />

      </Route>
    </Routes>
  );
}

export default App;
