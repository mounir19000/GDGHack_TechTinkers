// Import library
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

// import assets
import Logo from "../assets/Logos-icons/Logo-gdg-algiers.png";
import Pfp from "../assets/Logos-icons/Profile.png";
import SearchLogo from "../assets/Logos-icons/search.svg";

// Import compo and pages
import EventCardUser from "../components/EventCardUser";

const UserPage = () => {
  const initialEventsToShow = 9; // Initial number of events to show
  const [eventsToShow, setEventsToShow] = useState(initialEventsToShow);
  const [allEvents, setAllEvents] = useState([]);

  // Dummy data for events (you can replace it with your actual data)
  const dummyEvents = [
    {
      EventTitle: "GDG Hack 1",
      EventDiscription: "Description for GDG Hack 1",
      isIntern: true,
      isHackathon: true,
      isBefore: true,
      isOngoing: false,
      isDone: false,
      place: "Location 1",
      time: "14:30",
      timeLeft: "12:50",
    },
    {
      EventTitle: "GDG Hack 2",
      EventDiscription: "Description for GDG Hack 2",
      isIntern: false,
      isHackathon: true,
      isBefore: false,
      isOngoing: true,
      isDone: false,
      place: "Location 2",
      time: "15:45",
      timeLeft: "10:30",
    },
    {
      EventTitle: "GDG Hack 3",
      EventDiscription: "Description for GDG Hack 3",
      isIntern: true,
      isHackathon: false,
      isBefore: false,
      isOngoing: false,
      isDone: true,
      place: "Location 3",
      time: "18:00",
      timeLeft: "Finished",
    },
    // Add more events as needed
    {
      EventTitle: "GDG Workshop 4",
      EventDiscription: "Description for GDG Workshop 4",
      isIntern: true,
      isHackathon: false,
      isBefore: true,
      isOngoing: false,
      isDone: false,
      place: "Location 4",
      time: "10:00",
      timeLeft: "1 day left",
    },
    {
      EventTitle: "GDG Meetup 5",
      EventDiscription: "Description for GDG Meetup 5",
      isIntern: false,
      isHackathon: false,
      isBefore: false,
      isOngoing: true,
      isDone: false,
      place: "Location 5",
      time: "19:30",
      timeLeft: "2 hours left",
    },
    {
      EventTitle: "GDG Seminar 6",
      EventDiscription: "Description for GDG Seminar 6",
      isIntern: true,
      isHackathon: true,
      isBefore: false,
      isOngoing: false,
      isDone: true,
      place: "Location 6",
      time: "16:15",
      timeLeft: "Finished",
    },
    {
      EventTitle: "GDG CodeJam 7",
      EventDiscription: "Description for GDG CodeJam 7",
      isIntern: false,
      isHackathon: true,
      isBefore: true,
      isOngoing: false,
      isDone: false,
      place: "Location 7",
      time: "14:00",
      timeLeft: "3 days left",
    },
    {
      EventTitle: "GDG Tech Talk 8",
      EventDiscription: "Description for GDG Tech Talk 8",
      isIntern: true,
      isHackathon: false,
      isBefore: false,
      isOngoing: true,
      isDone: false,
      place: "Location 8",
      time: "17:45",
      timeLeft: "1 hour left",
    },
    {
      EventTitle: "GDG Conference 9",
      EventDiscription: "Description for GDG Conference 9",
      isIntern: false,
      isHackathon: false,
      isBefore: false,
      isOngoing: false,
      isDone: true,
      place: "Location 9",
      time: "11:30",
      timeLeft: "Finished",
    },
    {
      EventTitle: "GDG Hack 1",
      EventDiscription: "Description for GDG Hack 1",
      isIntern: true,
      isHackathon: true,
      isBefore: true,
      isOngoing: false,
      isDone: false,
      place: "Location 1",
      time: "14:30",
      timeLeft: "12:50",
    },
    {
      EventTitle: "GDG Hack 2",
      EventDiscription: "Description for GDG Hack 2",
      isIntern: false,
      isHackathon: true,
      isBefore: false,
      isOngoing: true,
      isDone: false,
      place: "Location 2",
      time: "15:45",
      timeLeft: "10:30",
    },
    {
      EventTitle: "GDG Hack 3",
      EventDiscription: "Description for GDG Hack 3",
      isIntern: true,
      isHackathon: false,
      isBefore: false,
      isOngoing: false,
      isDone: true,
      place: "Location 3",
      time: "18:00",
      timeLeft: "Finished",
    },
    // Add more events as needed
    {
      EventTitle: "GDG Workshop 4",
      EventDiscription: "Description for GDG Workshop 4",
      isIntern: true,
      isHackathon: false,
      isBefore: true,
      isOngoing: false,
      isDone: false,
      place: "Location 4",
      time: "10:00",
      timeLeft: "1 day left",
    },
    {
      EventTitle: "GDG Meetup 5",
      EventDiscription: "Description for GDG Meetup 5",
      isIntern: false,
      isHackathon: false,
      isBefore: false,
      isOngoing: true,
      isDone: false,
      place: "Location 5",
      time: "19:30",
      timeLeft: "2 hours left",
    },
    {
      EventTitle: "GDG Seminar 6",
      EventDiscription: "Description for GDG Seminar 6",
      isIntern: true,
      isHackathon: true,
      isBefore: false,
      isOngoing: false,
      isDone: true,
      place: "Location 6",
      time: "16:15",
      timeLeft: "Finished",
    },
    {
      EventTitle: "GDG CodeJam 7",
      EventDiscription: "Description for GDG CodeJam 7",
      isIntern: false,
      isHackathon: true,
      isBefore: true,
      isOngoing: false,
      isDone: false,
      place: "Location 7",
      time: "14:00",
      timeLeft: "3 days left",
    },
    {
      EventTitle: "GDG Tech Talk 8",
      EventDiscription: "Description for GDG Tech Talk 8",
      isIntern: true,
      isHackathon: false,
      isBefore: false,
      isOngoing: true,
      isDone: false,
      place: "Location 8",
      time: "17:45",
      timeLeft: "1 hour left",
    },
    {
      EventTitle: "GDG Conference 9",
      EventDiscription: "Description for GDG Conference 9",
      isIntern: false,
      isHackathon: false,
      isBefore: false,
      isOngoing: false,
      isDone: true,
      place: "Location 9",
      time: "11:30",
      timeLeft: "Finished",
    },
  ];

  const user = { username: "Mounir", isInterne: true };

  // Load all events on component mount
  useEffect(() => {
    setAllEvents(dummyEvents);
  }, []);

  // Function to handle "See more events" button click
  const handleSeeMoreClick = () => {
    setEventsToShow(eventsToShow + 3); // Increase the number of events to show
  };

  // States for the filters
  const [selectedFilter1, setSelectedFilter1] = useState("nothing");
  const [selectedFilter2, setSelectedFilter2] = useState("nothing");
  const [selectedFilter3, setSelectedFilter3] = useState("nothing");

  // Function to handle filter changes
  const handleFilterChange = (filterType, value) => {
    switch (filterType) {
      case 1:
        setSelectedFilter1(value);
        break;
      case 2:
        setSelectedFilter2(value);
        break;
      case 3:
        setSelectedFilter3(value);
        break;
      default:
        break;
    }
  };

  // Filtered events based on selected filters
  const filteredEvents = allEvents.filter((event) => {
    // Filter 1: Interne/Externe
    const filter1Pass =
      selectedFilter1 === "nothing" ||
      event.isIntern === (selectedFilter1 === "interne");

    // Filter 2: Hackathon/Ideathon
    const filter2Pass =
      selectedFilter2 === "nothing" ||
      event.isHackathon === (selectedFilter2 === "hackathon");

    // Filter 3: Not registred/Pending/Accepted
    const filter3Pass =
      selectedFilter3 === "nothing" ||
      (selectedFilter3 === "notregistred" && !event.isDone) ||
      (selectedFilter3 === "pending" && event.isOngoing && !event.isDone) ||
      (selectedFilter3 === "accepted" && event.isDone);

    return filter1Pass && filter2Pass && filter3Pass;
  });

  return (
    <>
      <div className="flex flex-col bg-[#011225]">
        <div className=" flex flex-row items-center justify-between w-full px-16 py-6 ">
          <img src={Logo} alt="Logo" className="h-10 " />
          <div className="flex justify-center items-center space-x-3">
            <p className="text-white text-xl text-center">{user.username}</p>
            <img src={Pfp} alt="Pfp" className="h-10 w-10" />
          </div>
        </div>

        <div className="flex flex-col justify-center items-center px-16 bg-[#011225]">
          <h1 className="mb-6 font-bold text-5xl text-[#ffffff]">Our events</h1>

          <div className="min-w-full flex flex-row justify-between items-center">
            <div className="relative cursor-pointer h-[40px] min-w-40">
              <input
                className="w-full min-w-40 h-full py-2 px-8 border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500 text-center"
                name="searched"
                type="text"
                placeholder="Rechercher"
              />
              <img
                className="absolute inset-y-0 left-0 flex items-center pl-4 w-10 h-10"
                src={SearchLogo}
              />
            </div>
            <div className="flex my-4">
              {/* Filter 1: Interne/Externe */}
              <label className="text-black w-auto">
                Filter 1:
                <select
                  className="py-1 px-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500 text-center"
                  onChange={(e) => handleFilterChange(1, e.target.value)}
                  value={selectedFilter1}
                >
                  <option value="nothing">Nothing</option>
                  <option value="interne">Interne</option>
                  <option value="externe">Externe</option>
                </select>
              </label>

              {/* Filter 2: Hackathon/Ideathon */}
              <label className="text-black">
                Filter 2:
                <select
                  className="py-1 px-4  border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500 text-center"
                  onChange={(e) => handleFilterChange(2, e.target.value)}
                  value={selectedFilter2}
                >
                  <option value="nothing">Nothing</option>
                  <option value="hackathon">Hackathon</option>
                  <option value="ideathon">Ideathon</option>
                </select>
              </label>

              {/* Filter 3: Not registred/Pending/Accepted */}
              <label className="text-black">
                Filter 3:
                <select
                  className="py-1 px-4  border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500 text-center"
                  onChange={(e) => handleFilterChange(3, e.target.value)}
                  value={selectedFilter3}
                >
                  <option value="nothing">Nothing</option>
                  <option value="notregistred">Not registred</option>
                  <option value="pending">Pending</option>
                  <option value="accepted">Accepted</option>
                </select>
              </label>
            </div>
          </div>

          {/* Show the grid of EventCard components */}
          <div className="grid grid-cols-3 gap-6 flex-wrap">
            {allEvents.slice(0, eventsToShow).map((event, index) => (
              <EventCardUser key={index} {...event} user={user} />
            ))}
          </div>

          {/* Show "See more events" button conditionally */}
          {eventsToShow < allEvents.length && (
            <button
              className="text-white w-80 h-30 px-3 py-2 font-bold bg-[#F9AB00] border 
            border-[#00CED0] text-xl rounded-lg mt-4"
              onClick={handleSeeMoreClick}
            >
              See more events
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default UserPage;
