import SelectGroupTwo from "../../components/Forms/SelectGroup/SelectGroupTwo";
import { useState,useEffect } from "react";

interface FormProps {
  
  item: {
    customerName?: string;
    idNumber?: string;
    description?: string;
    category?:string;
    date?:string;
    status?:string;
  };
  onSave: (item: any) => void;
  onClose: () => void;
  buttonName: string;
}


 

const Form: React.FC<FormProps> = ({ item, onSave, onClose, buttonName }) => {
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const changeTextColor = () => {
    setIsOptionSelected(true);
  };
  const formatDate = (date: string) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  };
  
  const [selectedOption, setSelectedOption] = useState(item?.category || "");  
  const [formData, setFormData] = useState({
    customerName: item?.customerName || "",
    idNumber: item?.idNumber || "",
    description: item?.description || "",
    category: selectedOption || "",
    date: formatDate(new Date().toISOString()), // Use current date
    status: item?.status || "",
  });
  useEffect(() => {
    setFormData((prevData) => ({ ...prevData, category: selectedOption }));
  }, [selectedOption]);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log('Items are:',formData)
    onSave({ ...item, ...formData }); // Pass updated item back
    onClose(); // Close modal
  };
   
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 mt-[70px] ml-[300px]">
      <div className="bg-white p-5 rounded-lg shadow-lg w-[600px]">
      <h2 className="text-xl font-bold mb-4">
                  Maintenance Log Form
                </h2>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col gap-3 p-3'>
            <label className="block text-black">Customer Name</label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div className='flex flex-col gap-3 p-3'>
            <label className="block text-black">ID Number</label>
            <input
              type="text"
              name="idNumber"
              value={formData.idNumber}
              onChange={handleChange}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <div className='flex flex-col gap-3 p-3'>
          <div>
      <label className="mb-3 block text-black dark:text-white">
        Select Category
      </label>

      <div className="relative z-20 bg-white dark:bg-form-input">
        <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.8">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.0007 2.50065C5.85852 2.50065 2.50065 5.85852 2.50065 10.0007C2.50065 14.1428 5.85852 17.5007 10.0007 17.5007C14.1428 17.5007 17.5007 14.1428 17.5007 10.0007C17.5007 5.85852 14.1428 2.50065 10.0007 2.50065ZM0.833984 10.0007C0.833984 4.93804 4.93804 0.833984 10.0007 0.833984C15.0633 0.833984 19.1673 4.93804 19.1673 10.0007C19.1673 15.0633 15.0633 19.1673 10.0007 19.1673C4.93804 19.1673 0.833984 15.0633 0.833984 10.0007Z"
                fill="#637381"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.833984 9.99935C0.833984 9.53911 1.20708 9.16602 1.66732 9.16602H18.334C18.7942 9.16602 19.1673 9.53911 19.1673 9.99935C19.1673 10.4596 18.7942 10.8327 18.334 10.8327H1.66732C1.20708 10.8327 0.833984 10.4596 0.833984 9.99935Z"
                fill="#637381"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.50084 10.0008C7.55796 12.5632 8.4392 15.0301 10.0006 17.0418C11.5621 15.0301 12.4433 12.5632 12.5005 10.0008C12.4433 7.43845 11.5621 4.97153 10.0007 2.95982C8.4392 4.97153 7.55796 7.43845 7.50084 10.0008ZM10.0007 1.66749L9.38536 1.10547C7.16473 3.53658 5.90275 6.69153 5.83417 9.98346C5.83392 9.99503 5.83392 10.0066 5.83417 10.0182C5.90275 13.3101 7.16473 16.4651 9.38536 18.8962C9.54325 19.069 9.76655 19.1675 10.0007 19.1675C10.2348 19.1675 10.4581 19.069 10.6159 18.8962C12.8366 16.4651 14.0986 13.3101 14.1671 10.0182C14.1674 10.0066 14.1674 9.99503 14.1671 9.98346C14.0986 6.69153 12.8366 3.53658 10.6159 1.10547L10.0007 1.66749Z"
                fill="#637381"
              ></path>
            </g>
          </svg>
        </span>

        <select
          value={selectedOption}
          onChange={(e) => {
            setSelectedOption(e.target.value);
            changeTextColor();
          }}
          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
            isOptionSelected ? 'text-black dark:text-white' : ''
          }`}
        >
          <option value="" disabled className="text-body dark:text-bodydark">
            Select Category
          </option>
          <option value="Electronics" className="text-body dark:text-bodydark">
            Electronics
          </option>
          <option value="Machinery" className="text-body dark:text-bodydark">
          Machinery
          </option>
          <option value="Vehicle" className="text-body dark:text-bodydark">
            Vehicle
          </option>
        </select>

        <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.8">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                fill="#637381"
              ></path>
            </g>
          </svg>
        </span>
      </div>
    </div>
            
          </div>
          <div className='flex flex-col gap-3 p-3'>
            <label className="block text-black">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            ></textarea>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="bg-gray-300 p-2 rounded">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded" onClick={handleSubmit}>{buttonName}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
