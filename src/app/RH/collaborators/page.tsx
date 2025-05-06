"use client";
import { useState } from "react";
import Link from "next/link";
import { FaHome, FaCalendarAlt, FaUserFriends, FaCog, FaSearch, FaPlus } from "react-icons/fa";
import { Bell, Map, FileUser, Settings, Home, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface Collaborator {
  id: string;
  name: string;
  personalNumber: string;
  initialEntry: string;
  department: string;
  workEmail: string;
}

export default function CollaboratorsPage() {
  const [userName] = useState("Marwa Rsaim");
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  const [collaborators] = useState<Collaborator[]>([
    {
      id: 'U30C25',
      name: 'Christine Brooke',
      personalNumber: '33900211',
      initialEntry: '14 Feb 2019',
      department: 'IT',
      workEmail: 'christine.brooke@avl.com'
    },
    {
      id: 'U06D65',
      name: 'Rosie Pearson',
      personalNumber: '33900210',
      initialEntry: '14 Feb 2019',
      department: 'IT',
      workEmail: 'rosie.pearson@avl.com'
    },
    {
      id: 'U22P76',
      name: 'Darrell Caldwell',
      personalNumber: '33900331',
      initialEntry: '14 Feb 2019',
      department: 'HR',
      workEmail: 'darrell.caldwell@avl.com'
    },
    {
      id: 'U04N99',
      name: 'Gilbert Johnston',
      personalNumber: '33900341',
      initialEntry: '14 Feb 2019',
      department: 'HR',
      workEmail: 'gilbert.johnston@avl.com'
    },
    {
      id: 'U89H53',
      name: 'Alan Cain',
      personalNumber: '33900351',
      initialEntry: '14 Feb 2019',
      department: 'IT',
      workEmail: 'alan.cain@avl.com'
    },
    {
      id: 'U32F89',
      name: 'Alfred Murray',
      personalNumber: '33900362',
      initialEntry: '14 Feb 2019',
      department: 'FINANCE',
      workEmail: 'alfred.murray@avl.com'
    },
    // Ajoutez plus de collaborateurs si nécessaire pour tester la pagination
  ]);

  const departments = [...new Set(collaborators.map(c => c.department))];

  const filteredCollaborators = collaborators.filter(collaborator => {
    const matchesSearch = collaborator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         collaborator.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         collaborator.workEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = !departmentFilter || collaborator.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredCollaborators.length / itemsPerPage);
  const paginatedCollaborators = filteredCollaborators.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const resetFilters = () => {
    setSearchTerm('');
    setDepartmentFilter(null);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-full md:w-[164px] bg-gradient-to-b from-green-500 to-blue-500 p-5 text-white flex flex-col">
        <Image
          width={100}
          height={100}
          src="/avl.png"
          alt="User"
          className="w-28 h-14 rounded-lg mb-16"
        />
        <nav className="flex flex-col flex-grow space-y-4">
          <Link href="/RH/home" className="flex flex-col items-center hover:bg-white hover:text-black p-2 rounded-lg">
            <Home size="24" />
            <span>Home</span>
          </Link>
          <Link href="/RH/spaces" className="flex flex-col items-center hover:bg-white hover:text-black p-2 rounded-lg">
            <Map size="24" />
            <span>Spaces</span>
          </Link>
          <Link href="/RH/booking" className="flex flex-col items-center hover:bg-white hover:text-black p-2 rounded-lg">
            <Calendar size="24" />
            <span>Booking</span>
          </Link>
          <Link href="/RH/collaborators" className="flex flex-col items-center hover:bg-white hover:text-black p-2 rounded-lg">
            <FileUser size="24" />
            <span>Collaborators</span>
          </Link>
          <div className="flex-1"></div>
          <Link href="/RH/settings" className="flex flex-col items-center hover:bg-white hover:text-black p-2 mt-auto rounded-lg">
            <Settings size="24" />
            <span>Settings</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {/* Top Bar */}
        <div className="flex flex-col p-5 md:flex-row bg-white justify-between items-center mb-3 shadow-lg">
          <Image
            width={100}
            height={100}
            src="/logo.png"
            alt="User"
            className="w-20 h-25"
          />
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="bg-gradient-to-r from-[rgba(69,168,72,0.5)] to-[rgba(1,166,187,0.5)] font-bold text-black px-8 py-2 rounded-xl">
              Human Resources
            </div>
            <Bell className="text-gray-700" />
            <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
              {userName.charAt(0).toUpperCase()}
            </div>
            <span>{userName}</span>
          </div>
        </div>
        <div className="mb-6 flex justify-end">
  <div className="flex flex-col space-y-3">
    <button className="w-40 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-black rounded shadow">
      <FaPlus className="mr-2 text-gray-700" />
      <span className="text-sm font-medium">Team Leader</span>
    </button>
    <button className="w-40 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-black rounded shadow">
      <FaPlus className="mr-2 text-gray-700" />
      <span className="text-sm font-medium">Collaborators</span>
    </button>
  </div>
</div>

        {/* Collaborators Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden mb-4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NAME</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Personal number</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Initial Entry</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Work Email</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedCollaborators.map((collaborator, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{collaborator.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{collaborator.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{collaborator.personalNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{collaborator.initialEntry}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{collaborator.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{collaborator.workEmail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
     

<div className="flex justify-between items-center bg-gray-100 px-6 py-3 mt-4 rounded-md">
  <button
    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
    disabled={currentPage === 1}
    className={`flex items-center px-3 py-1 text-sm rounded-md border 
      ${currentPage === 1 
        ? 'bg-white text-gray-400 cursor-not-allowed' 
        : 'bg-white text-gray-700 hover:bg-gray-100'}`}
  >
    <ChevronLeft size={16} className="mr-1" />
    Prev. Date
  </button>

  <button
    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
    disabled={currentPage === totalPages}
    className={`flex items-center px-3 py-1 text-sm rounded-md border 
      ${currentPage === totalPages 
        ? 'bg-white text-gray-400 cursor-not-allowed' 
        : 'bg-white text-gray-700 hover:bg-gray-100'}`}
  >
    Next Date
    <ChevronRight size={16} className="ml-1" />
  </button>
</div>

      </div>
    </div>
  );
}