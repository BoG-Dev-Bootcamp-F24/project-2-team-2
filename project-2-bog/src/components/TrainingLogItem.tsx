import React from "react";

interface TrainingLogItemProps {
  log: {
    date: string;
    title: string;
    animal: string;
    hours: string;
    description: string;
  };
  onEdit: () => void;
}

const TrainingLogItem: React.FC<TrainingLogItemProps> = ({ log, onEdit }) => {
  return (
    <div className="flex justify-between items-center bg-white p-4 shadow-md rounded-lg mb-4 border border-gray-600">
      <div className="flex items-center">
        <div className="bg-blue-700 text-white p-4 rounded-lg mr-4 text-center w-[80px]">
          <p className="text-xl font-bold">{log.date.split(" ")[0]}</p>
          <p>{log.date.split(" ")[1]}</p>
        </div>

        <div>
          <h3 className="text-lg text-gray-600 font-semibold">
            {log.title} · {log.hours}
          </h3>
          <p className="text-sm text-gray-500">{log.animal}</p>
          <p className="text-gray-600">{log.description}</p>
        </div>
      </div>

      <button
        onClick={onEdit}
        className="text-red-500 hover:text-red-700 p-2 rounded-full bg-gray-100 hover:bg-gray-600 transition-colors duration-150"
      >
        ✏️
      </button>
    </div>
  );
};

export default TrainingLogItem;
