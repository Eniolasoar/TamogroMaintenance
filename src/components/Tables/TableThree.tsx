import { useState } from 'react';
import { Package } from '../../types/package';
import Form from '../../pages/Form/Form';
interface TableThreeProps {
  packageData: Package[];
  onUpdate: (updatedData: Package[]) => void;
}

const TableThree: React.FC<TableThreeProps> = ({ packageData, onUpdate }) => {
  const [editItem, setEditItem] = useState<Package | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Delete a package item
  const handleDelete = (id: string) => {
    const updatedData = packageData.filter(item => item.idNumber !== id);
    onUpdate(updatedData); // Update the parent state
  };

  // Set the item to be edited
  const handleEdit = (packageItem: Package) => {
    setEditItem(packageItem);
    setIsModalOpen(true); // Open modal
  };

  // Save the edited item
  const handleSave = (updatedPackage: Package) => {
    const updatedData = packageData.map(item =>
      item.idNumber === updatedPackage.idNumber ? updatedPackage : item
    );
    onUpdate(updatedData); // Update the parent state
    setIsModalOpen(false); // Close the modal
    setEditItem(null); // Clear the edit item
  };

  // Close modal
  const handleClose = () => {
    setIsModalOpen(false);
    setEditItem(null);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[20px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">S/N</th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Maintenance Id</th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white text-center">Maintenance Type</th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Description</th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Date</th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Status</th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {packageData.map((packageItem, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">{key + 1}</h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="text-black dark:text-white">{packageItem.idNumber}</h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{packageItem.category}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{packageItem.description}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{packageItem.date}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-[12px] font-medium ${
                      packageItem.status === 'Completed'
                        ? 'bg-success text-success'
                        : packageItem.status === 'Not Started'
                        ? 'bg-danger text-danger'
                        : 'bg-warning text-warning'
                    }`}
                  >
                    {packageItem.status}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    {/* Edit Button */}
                    <button className="group" onClick={() => handleEdit(packageItem)}>
                      <svg className="fill-current text-[#64748b] group-hover:text-yellow-400" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48">
                        <g fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="4">
                          <path strokeLinecap="round" d="M7 42h36" />
                          <path fill="currentColor" d="M11 26.72V34h7.317L39 13.308L31.695 6z" />
                        </g>
                      </svg>
                    </button>
                    {/* Delete Button */}
                    <button className="group" onClick={() => handleDelete(packageItem.idNumber)}>
                      <svg className="fill-current text-[#64748b] group-hover:text-red-800" width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.91102 16.2563 5.52352 15.8819 5.52352 15.5216L5.99552 6.88102C6.02227 6.49065 6.39552 6.19902 6.78652 6.19902H11.2085C11.5995 6.19902 11.9735 6.49065 11.9955 6.88102L12.4675 15.5216C12.4675 15.8819 12.08 16.2563 11.7285 16.2563Z" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Item Modal */}
      {isModalOpen && editItem && (
        <div className="modal">
          <Form item={editItem} onSave={handleSave} onClose={handleClose} buttonName={'Edit Log'} />
        </div>
      )}
    </div>
  );
};

export default TableThree;
