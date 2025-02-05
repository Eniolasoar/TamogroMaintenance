import React, { useState } from 'react';
import TableThree from '../../components/Tables/TableThree';
import Form from '../Form/Form';
import { useGlobalContext } from '../../GlobalProvider';

const ECommerce: React.FC = () => {
  const [show, setShow] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    updateRole,
    globalState: { role },
    updatePackageData,
    packagesByStatus,
    globalState,
  } = useGlobalContext();

  // Categorized packages
  const notStartedPackages = packagesByStatus('Not Started');
  const inProgressPackages = packagesByStatus('In Progress');
  const completedPackages = packagesByStatus('Completed');

  const handlePress = () => setShow(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSave = (newPackage: any) => {
    const updatedPackages = [...globalState.packageData, newPackage];
    updatePackageData(updatedPackages);
    closeModal();
  };

  return (
    <>
      {/* Modal Section */}
      {isModalOpen && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={closeModal} />
          {/* Modal Content */}
          <div className="fixed inset-0 flex items-center justify-center z-50 mt-[50px] ml-[20%]">
            <div className="bg-red-900 p-6 rounded-md shadow-lg relative w-md">
              <Form
                item={{ customerName: '', idNumber: '', description: '', category: '', date: '', status: 'Not Started' }}
                onSave={handleSave}
                onClose={closeModal}
                buttonName="Save Log"
              />
            </div>
          </div>
        </>
      )}

      {/* Main Content */}
      {role === 'Technician' ? (
        <>
          <h2 className="font-bold text-[#09432D] text-2xl pb-3">Assigned Tasks</h2>
          <TableThree packageData={notStartedPackages} onUpdate={updatePackageData} />
        </>
      ) : !show ? (
        <>
          <div className="w-full flex justify-between items-center py-4">
            <h2 className="font-bold text-[#09432D] text-2xl">Recent Logs</h2>
            <button className="bg-[#09432D] p-2 rounded-md text-white" onClick={openModal}>
              Create New Log
            </button>
          </div>
          <TableThree packageData={globalState.packageData} onUpdate={updatePackageData} />
        </>
      ) : (
        <div className="mx-auto flex justify-center items-center min-h-[100vh]">
          <button className="bg-[#09432D] p-3 rounded-md text-white" onClick={handlePress}>
            Create New Log
          </button>
        </div>
      )}
    </>
  );
};

export default ECommerce;
