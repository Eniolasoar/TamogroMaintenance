import React, { useState } from 'react';
import TableThree from '../components/Tables/TableThree';
import { Package } from '../types/package';
import { useGlobalContext } from '../GlobalProvider';

const Completed: React.FC = () => {
  const {
 
       updatePackageData,
       packagesByStatus,
       globalState,
     } = useGlobalContext();
   
     // Categorized packages
     const completedData = packagesByStatus('Completed');
  return (

    <>
    
    {completedData.length>0 ? (
      <>
      
      <div className='w-full flex justify-between items-center py-4'>
      <h2 className='font-bold text-[#09432D] text-xl '>Completed Logs</h2>
      
      </div>
      
      <TableThree packageData={completedData} onUpdate={updatePackageData}/>
      </>
    ):
    <div className='mx-auto flex justify-center items-center min-h-[100vh]'>
    <h1 className='text-2xl font-bold text-[#09432D]'>No Logs Available</h1>
    </div>
    }
      
    </>
  );
};

export default Completed;
