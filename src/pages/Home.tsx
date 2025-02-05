import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const handlePress = (role: string) => {
    navigate(`/auth/signin/${role}`);
  };
  return (
    <div className="min-h-[90vh] flex flex-col justify-center items-center gap-3">
      <div className="flex flex-col gap-1">
        <img src="/logo1.png" className="w-[450px] h-[200px] mx-auto" />
        <h1 className="-mt-7 text-2xl text-[#09432D] font-semibold">
          Welcome To Tamogro Maintenance System
        </h1>
      </div>

      <p className="py-4">Login In As:</p>
      <div className="w-[50%] flex flex-row justify-between items-center">
        <button
          className="bg-[#09432D] p-3 rounded-md text-white w-[200px] hover:opacity-80"
          onClick={()=>{handlePress('Administrator')}}
        >
          Administrator
        </button>

        <button
          className="bg-[#09432D] p-3 rounded-md text-white w-[200px] hover:opacity-80"
          onClick={()=>{handlePress('CS Personnel')}}
        >
          CS Personnel
        </button>

        <button
          className="bg-[#09432D] p-3 rounded-md text-white w-[200px] hover:opacity-80"
          onClick={()=>{handlePress('Technician')}}        >
          Technician
        </button>
      </div>
    </div>
  );
};

export default Home;
