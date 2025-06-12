import React, { useState } from 'react';
import Table from './Table';
import MedicineTable from './MedicineTable';
import Navbar from './Navbar';
import { FiUsers, FiActivity } from "react-icons/fi";

export default function Layout() {
  const [selectedComponent, setSelectedComponent] = useState('employee');

  const renderContent = () => {
    switch (selectedComponent) {
      case 'employee':
        return <Table />;
      case 'medicines':
        return <MedicineTable />;
      default:
        return <div className="p-6 text-gray-600">Select a component.</div>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <div className="w-64 text-white shadow-lg bg-gradient-to-b from-blue-600 to-purple-600">
          <ul className="px-4 py-2 space-y-2">
            <li>
              <button onClick={() => setSelectedComponent('employee')}
                className={`block w-full text-left py-2 px-3 rounded-lg transition font-bold ${
                  selectedComponent === 'employee' ? 'bg-white text-blue-600 font-semibold' : 'hover:bg-blue-500'
                }`}
              ><FiUsers size={18} />
                Employee
              </button>
            </li>
            <li>
              <button onClick={() => setSelectedComponent('medicines')}
                className={`block w-full text-left py-2 px-3 rounded-lg transition font-bold ${
                  selectedComponent === 'medicines' ? 'bg-white text-blue-600 font-semibold' : 'hover:bg-blue-500'
                }`}
              ><FiActivity size={18} />
                Medicines
              </button>
            </li>
          </ul>
        </div>

        <div className="flex-1 p-6 bg-gray-100">{renderContent()}</div>
      </div>
    </div>
  );
}
