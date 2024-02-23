import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const SideBar = ({ data, setData }) => {
  const [time, setTime] = useState(new Date());
  const [show, setShow] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId); // Cleanup
  }, []);

  const Time = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const Day = time.toLocaleDateString(undefined, { weekday: "long" });

  // Group tasks by date
  const groupedTasks = data.reduce((acc, task) => {
    const date = new Date(task.date);
    const dateString = date.toLocaleDateString();
    if (!acc[dateString]) {
      acc[dateString] = [];
    }
    acc[dateString].push(task);
    return acc;
  }, {});

  const reschedule = (taskToReschedule) => {
    const updatedData = data.map((task) =>
      task === taskToReschedule ? { ...task, completed: false } : task
    );
    setData(updatedData);
  };

  return (
    <div className="side-bar m-6">
      {show ? (
        <h1 className="text-[#ffbb47] text-2xl font-bold text-center p-3 relative top-1">
          {Day} {Time}
        </h1>
      ) : null}

      <button className="" onClick={()=>setShow(!show)}> Click to Hide </button>

      <h2 className="text-sm text-center text-[#d7d7d7] mb-2">{`${
        data.length > 0
          ? "You may completed these:"
          : "You need to do something!"
      }`}</h2>

      {Object.entries(groupedTasks).map(([dateString, tasks]) => (
        <div
          key={dateString}
          className="w-full p-5 bg-[#00000060] rounded-md mb-3"
        >
          <h2 className="text-white mb-2">
            {new Date(dateString).toLocaleDateString(undefined, {
              month: "short",
              day: "2-digit",
            })}
          </h2>

          {tasks.map(
            (task, index) =>
              task.completed && (
                <div key={index} className="completed-task mb-3">
                  <h3 className="text-[#dedede] hover:text-white cursor-pointer">
                    <motion.i
                      whileHover={{ rotate: -260, scale: 1.2 }}
                      className="fa-solid fa-arrow-rotate-left text-yellow-500"
                      onClick={() => reschedule(task)}
                    ></motion.i>{" "}
                    {task.title}
                  </h3>
                  {/* Displaying time from task.date in the format you prefer */}
                  <h5 className="flex justify-between text-xs text-yellow-600">
                    <span>
                      {new Date(task.date).toLocaleDateString(undefined, {
                        weekday: "long",
                      })}
                    </span>
                    <span>
                      {new Date(task.date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </h5>
                </div>
              )
          )}
        </div>
      ))}
    </div>
  );
};

export default SideBar;
