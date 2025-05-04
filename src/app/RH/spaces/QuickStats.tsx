import {
    FaBoxes,
    FaClock,
    FaChartLine,
    FaPercentage,
  } from "react-icons/fa";
  
  const stats = [
    {
      title: "Total Rooms",
      value: 285,
      icon: <FaBoxes className="text-xl text-gray-600 mr-2" />,
    },
    {
      title: "Pending Approval",
      value: 120,
      icon: <FaClock className="text-xl text-yellow-500 mr-2" />,
    },
    {
      title: "Demanded Room this month",
      value: 89,
      icon: <FaChartLine className="text-xl text-green-500 mr-2" />,
    },
    {
      title: "Presence Rate",
      value: "46%",
      icon: <FaPercentage className="text-xl text-blue-500 mr-2" />,
    },
  ];
  
  const QuickStats = () => (
    <div className="bg-white p-4 rounded-xl shadow-md mb-6">
      <h2 className="text-lg font-semibold mb-4">Quick Stats</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-lg p-4 flex flex-col items-center justify-center"
          >
            <div className="flex items-center mb-2">
              {stat.icon}
              <span className="text-sm font-medium text-gray-700">
                {stat.title}
              </span>
            </div>
            <div className="text-2xl font-bold text-black">{stat.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
  
  export default QuickStats;
  