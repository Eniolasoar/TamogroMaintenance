import React, { useState } from 'react';
import TableThree from '../../components/Tables/TableThree';
import { Package } from '../../types/package';
// import Form from '../../components/Form'; // import your Form component
import Form from '../Form/Form';
import { useGlobalContext } from '../../GlobalProvider';

const ECommerce: React.FC = () => {
  const [show, setShow] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handlePress = () => setShow(false);

  const packageData: Package[] = [
    {
      name: 'Free package',
      id: 'RSH 2883',
      type: 'Electronics',
      description: 'Outdated Wires',
      invoiceDate: `Jan 13,2023`,
      status: 'Not Started',
    },
    {
      name: 'Free package',
      id: 'RSH 2883',
      type: 'Electronics',
      description: 'Outdated Wires',
      invoiceDate: `Jan 13,2023`,
      status: 'Completed',
    },
    {
      name: 'Free package',
      id: 'Blender 2355',
      type: 'Machinery',
      description: 'Flat Truck Tire',
      invoiceDate: `Jan 16,2023`,
      status: 'In Progress',
    },
    {
      name: 'Free package',
      id: 'SMK 2390',
      type: 'Vehicle',
      description: 'Rusted Engine',
      invoiceDate: `Jan 11,2023`,
      status: 'Completed',
    },
    {
      name: 'Free package',
      id: 'John 4490',
      type: 'Vehicle',
      description: 'Regular Checkup',
      invoiceDate: `Jan 09,2023`,
      status: 'Not Started',
    },
  ];
  const technicianData: Package[] = [
    {
      name: 'Free package',
      id: 'RSH 2883',
      type: 'Electronics',
      description: 'Outdated Wires',
      invoiceDate: `Jan 13,2023`,
      status: 'Not Started',
    },
    {
      name: 'Free package',
      id: 'RSH 2883',
      type: 'Electronics',
      description: 'Outdated Wires',
      invoiceDate: `Jan 13,2023`,
      status: 'Not Started',
    },
    {
      name: 'Free package',
      id: 'Blender 2355',
      type: 'Machinery',
      description: 'Flat Truck Tire',
      invoiceDate: `Jan 16,2023`,
      status: 'Not Started',
    },
  ];

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const {
    updateRole,
    globalState: { role },
  } = useGlobalContext();

  return (
    <>
      {/* Modal Section */}
      {isModalOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black opacity-50 z-40"
            onClick={closeModal}
          />
          {/* Modal Content */}
          <div className="fixed inset-0 flex items-center justify-center z-50 mt-[50px] ml-[20%]">
            <div className="bg-white p-6 rounded-md shadow-lg relative w-md">
              <div className="flex items-start justify-between">
                <h2 className="text-xl font-bold mb-4">
                  Maintenanace Log Form
                </h2>
                <button
                  className="text-gray-600 hover:text-gray-800 text-[50px]"
                  onClick={closeModal}
                >
                  &times;
                </button>
              </div>
              {/* Close button */}

              <Form />
            </div>
          </div>
        </>
      )}

      {/* Main Content */}

      {role === 'Technician' ? (
        <>
          <h2 className="font-bold text-[#09432D] text-2xl pb-3">
            Assigned Tasks
          </h2>
          <TableThree packageData={technicianData} />
        </>
      ) : !show ? (
        <>
          <div className="w-full flex justify-between items-center py-4">
            <h2 className="font-bold text-[#09432D] text-2xl">Recent Logs</h2>
            <button
              className="bg-[#09432D] p-2 rounded-md text-white"
              onClick={openModal}
            >
              Create New Log
            </button>
          </div>
          <TableThree packageData={packageData} />
        </>
      ) : (
        <div className="mx-auto flex justify-center items-center min-h-[100vh]">
          <button
            className="bg-[#09432D] p-3 rounded-md text-white"
            onClick={handlePress}
          >
            Create New Log
          </button>
        </div>
      )}
    </>
  );
};

export default ECommerce;
