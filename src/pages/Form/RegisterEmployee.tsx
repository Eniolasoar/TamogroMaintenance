import React, { useState } from 'react';
import { useGlobalContext } from '../../GlobalProvider';
import EmployeeForm from './EmployeeForm';

const RegisterEmployee: React.FC = () => {
  const {
 
    updateEmployeeData,
       globalEmployeeState,
     } = useGlobalContext();

     const handleSave = (newPackage: any) => {
        const updatedPackages = [...globalEmployeeState.packageData, newPackage];
        updateEmployeeData(updatedPackages);
      };

  return (

    <>
    
  
      <h2 className='font-bold text-[#09432D] text-xl '>Register Employee</h2>
      <div className="" >
          {/* Modal Content */}
    
              <EmployeeForm
                item={{ fullname: '', username: '', password: '', phoneNumber: '', email: '',role:'' }}
                onSave={handleSave}
                onClose={()=>{}}
                buttonName="Save Log"
              />
       
      
 
      </div>
    
      
   
    
      
    </>
  );
};

export default RegisterEmployee;
