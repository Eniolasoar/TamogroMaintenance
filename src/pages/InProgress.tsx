import React, { useState } from 'react';
import TableThree from '../components/Tables/TableThree';
import { Package } from '../types/package';

const InProgress: React.FC = () => {
  const packageData: Package[] = [
      {
        name: 'Free package',
        id:'RSH 2883',
        type:'Electronics',
        description:'Outdated Wires',
        invoiceDate: `Jan 13,2023`,
        status: 'In Progress'
      },
      {
        name: 'Free package',
        id:'RSH 2883',
        type:'Electronics',
        description:'Outdated Wires',
        invoiceDate: `Jan 13,2023`,
        status: 'In Progress'
      },
      {
        name: 'Free package',
        id:'Blender 2355',
        type:'Machinery',
        description:'Flat Truck Tire',
        invoiceDate: `Jan 16,2023`,
        status: 'In Progress'
      }
    ];
  return (

    <>
    
    {packageData.length>0 ? (
      <>
      
      <div className='w-full flex justify-between items-center py-4'>
      <h2 className='font-bold text-[#09432D] text-2xl '>In Progress Logs</h2>
      
      </div>
      
      <TableThree packageData={packageData}/>
      </>
    ):
    <div className='mx-auto flex justify-center items-center min-h-[100vh]'>
    <h1 className='text-2xl font-bold text-[#09432D]'>No Logs Available</h1>
    </div>
    }
      
    </>
  );
};

export default InProgress;
