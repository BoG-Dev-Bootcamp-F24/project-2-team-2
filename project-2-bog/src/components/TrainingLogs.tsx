import React from 'react';
import TrainingLogItem from './TrainingLogItem';

const TrainingLogs = () => {
  const logs = [
    { date: '20 Oct - 2023', title: 'Complete sit lessons', description: 'Lucy finishes the sit lessons very well today. Should give her a treat' },
    { date: '20 Oct - 2023', title: 'Complete sit lessons', description: 'Lucy finishes the sit lessons very well today. Should give her a treat' },
    { date: '20 Oct - 2023', title: 'Complete sit lessons', description: 'Lucy finishes the sit lessons very well today. Should give her a treat' },
    { date: '20 Oct - 2023', title: 'Complete sit lessons', description: 'Lucy finishes the sit lessons very well today. Should give her a treat' },
  ];

  return (
    <>

      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h2 className="text-xl text-gray-600 font-semibold">Training logs</h2>

        <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-150">
          + Create new
        </button>
      </div>


      {logs.map((log, index) => (
        <TrainingLogItem key={index} date={log.date} title={log.title} description={log.description} />
      ))}
    </>
  );
};

export default TrainingLogs;