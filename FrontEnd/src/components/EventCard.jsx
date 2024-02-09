import intern from "../assets/Logos-icons/interne.png";
import externe from "../assets/Logos-icons/extern.png";
import ideathon from "../assets/Logos-icons/ideathon.png";
import hackathon from "../assets/Logos-icons/hackathon.png";
import locationImage from "../assets/Logos-icons/location.png";
import timeImage from "../assets/Logos-icons/Time.png";

const EventCard = ({
  EventTitle,
  EventDiscription,
  isIntern,
  isHackathon,
  isBefore,
  isOngoing,
  isDone,
  place,
  time,
  timeLeft,
}) => {
  // Set the desired completion percentage
  const completionPercentage = 70;

  return (
    <div className="flex flex-col rounded-xl border bg-[#FFFEFB] px-8 py-6">
      <div className="flex justify-between items-center w-full">
        {/* Left side (Title) */}
        <h1 className="font-bold text-2xl m-0">{EventTitle}</h1>

        {/* Right side (Icons and States) */}
        <div className="flex items-center">
          {/* Intern and extern icons */}
          {isIntern ? (
            <img src={intern} alt="" className="w-8 h-8" />
          ) : (
            <img src={externe} alt="" className="w-8 h-8" />
          )}

          {/* Hackathon and ideathon icons */}
          {isHackathon ? (
            <img src={hackathon} alt="" className="w-8 h-8 mr-2" />
          ) : (
            <img src={ideathon} alt="" className="w-8 h-8 mr-2" />
          )}

          {/* Event date state text */}
          {isBefore && (
            <p className="text-center min-w-24 h-8 bg-slate-500 text-white rounded-lg m-0 flex items-center justify-center">
              Before
            </p>
          )}
          {isOngoing && (
            <p className="text-center min-w-24 h-8 bg-slate-500 text-white rounded-lg m-0 flex items-center justify-center">
              On going
            </p>
          )}
          {isDone && (
            <p className="text-center min-w-24 h-8 bg-slate-500 text-white rounded-lg m-0 flex items-center justify-center">
              Finished
            </p>
          )}
        </div>
      </div>
      <p className="text-justify mt-2">{EventDiscription}</p>
      {(isBefore || isDone) && (
        <div className="flex justify-between items-center w-full mt-2">
          <div className="flex items-center">
            <img src={locationImage} alt="" className="h-6 mr-2" />
            <p>{place}</p>
          </div>
          <div className="flex items-center">
            <img src={timeImage} alt="" className="w-6 h-6 mr-2" />
            <p>{time}</p>
          </div>
        </div>
      )}
      {isOngoing && (
        <div className="mt-4">
          <div className="bg-gray-300 h-6 rounded-full relative">
            <div
              className="bg-green-500 h-full rounded-full"
              style={{ width: `${completionPercentage}%` }}
            ></div>
            <p className="absolute text-white text-sm top-1/2 left-[50%] transform -translate-x-1/2 -translate-y-1/2">
              Time Left: {timeLeft}
            </p>
          </div>
        </div>
      )}
      {(isOngoing || isDone) && (
        <div className="mt-4">
          <p className="font-semibold max-w-40 text-center text-[#FFFEFB] cursor-pointer hover:underline bg-[#F9AB00] px-4 py-2 rounded-md">
            Read more
          </p>
        </div>
      )}
      {isBefore && (
        <div className="mt-4 w-full flex justify-between items-center">
          <p className="font-semibold min-w-40 text-center text-[#FFFEFB] cursor-pointer hover:underline bg-[#F9AB00] px-4 py-2 rounded-md">
            Read more
          </p>
          <p className="font-semibold min-w-28 text-center text-[#FFFEFB] cursor-pointer hover:underline bg-[#2B82FB] px-4 py-2 rounded-md">
            Register
          </p>
        </div>
      )}
    </div>
  );
};

export default EventCard;
