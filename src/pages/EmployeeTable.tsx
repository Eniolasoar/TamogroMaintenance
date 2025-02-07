import React, { useState } from 'react';
import TableThree from '../components/Tables/TableThree';
import { Package } from '../types/package';
import { useGlobalContext } from '../GlobalProvider';
import EmployeeTableTemplate from '../components/Tables/EmployeeTableTemplate';

const EmployeeTable: React.FC = () => {
   const {
        globalEmployeeState,
        updateEmployeeData
      } = useGlobalContext();

      const data=globalEmployeeState.packageData;

  return (

    <>
    
    {globalEmployeeState.packageData.length>0 ? (
      <>
      
      <div className='w-full flex justify-between items-center py-4'>
      <h2 className='font-bold text-[#09432D] text-xl '>Employee Table</h2>
      
      </div>
      
      <EmployeeTableTemplate employeeData={data} onUpdate={updateEmployeeData}/>
      </>
    ):
    <div className='mx-auto flex justify-center items-center min-h-[100vh]'>
    <h1 className='text-2xl font-bold text-[#09432D]'>No Logs Available</h1>
    </div>
    }
      
    </>
  );
};

export default EmployeeTable;
