import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoMenu } from "react-icons/io5";
import { CiCalendar, CiSearch, CiStar } from "react-icons/ci";
import { MdCheckBox } from "react-icons/md";
import { BsMoonStarsFill } from "react-icons/bs";
import { FiMap } from "react-icons/fi";
import { IoGridOutline } from "react-icons/io5";
import logo from '/logo.png';
import { IoIosAdd } from "react-icons/io";
import { IoIosInformationCircle } from "react-icons/io";
import { CiBellOn } from "react-icons/ci";
import { CiRepeat } from "react-icons/ci";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaStar } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import SignupPage from './SignUp';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css"; // import the styles

import { Chart } from "react-google-charts";

import { createPost, getUserPosts, updatePost, deletePost, fetchUser, loginUser, logoutUser } from './store/contentSlice';
import { useNavigate } from 'react-router-dom';


const MainApp = () => {
  const [first, setFirst] = useState(true);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const inputReftwo = useRef(null);
  const inputRefthree = useRef(null);
  const inputReffour = useRef(null);
  const [taskDetails, setTaskDetails] = useState({ taskName: '', priority: 'low', dueDate: '', remainder: '', repeat: 'none', status: false });
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpensec, setIsDropdownOpensec] = useState(false);
  const [isDropdownOpenthree, setIsDropdownOpenthree] = useState(false);
  const { user, userId, posts, status, error } = useSelector((state) => state.content);
  const [date, setDate] = useState('');
  const [allPosts,  setAllPosts] = useState(posts);
  const [data, setdata] = useState(false);
  const [logout, setlogout] = useState(false);
  const navigate=useNavigate();


  const dataChart = [
    ["status", "items"],
    ["pending", posts.filter((post) => !post.status).length],
    ["done", posts.filter((post) => post.status).length],
  ];
// console.log(allPosts);
  const options = {
    pieHole: 0.4,
    is3D: false,
    legend: {
      position: "bottom",
      alignment: "center",
      textStyle: {
        color: "#233238",
        fontSize: 9,
      },
    },
  };


 
  


  const handleUpdateTask = () => {

    if (selectedTaskId) {
      const updates = { ...taskDetails };
      dispatch(updatePost({ postId: selectedTaskId, updates }));
      dispatch(getUserPosts(userId));
      setTaskDetails({ taskName: '', priority: 'low', dueDate: '', remainder: '', repeat: 'none', status: false });
      setSidebarVisible(false);
    }
    setdata(false);
  };

  useEffect(() => {
    if (userId) {
      dispatch(getUserPosts(userId));
      setdata(false);
    }
  }, [userId, dispatch]);

  useEffect(()=>{
    dispatch(fetchUser());
  },[]);

  const handleLogout = () => {
    dispatch(logoutUser()) // ✅ Correct thunk to log out the user
    navigate('/')
  };
  
  const handleTaskClick = (post) => {

    setSelectedTaskId(post._id);

    setTaskDetails({
      taskName: post.taskName,
      priority: post.priority,
      dueDate: post.dueDate ? new Date(post.dueDate) : '',
      remainder: post.remainder ? new Date(post.remainder) : '',
      repeat: post.repeat,
      status: post.status,
    });
    setSidebarVisible(true);
  };


  const handleDateChange = (field, date) => {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      console.error("Invalid date:", date);
      return;
    }
    setTaskDetails({ ...taskDetails, [field]: date });
  };


  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current?.setOpen(true);
    } else {
      console.error("Input reference is null");
    }
  };

  const handleClickTwo = () => {
    if (inputReftwo.current) {
      inputReftwo.current?.setOpen(true);
    } else {
      console.error("Input reference is null");
    }
  };

  const handleClickthree = () => {
    if (inputRefthree.current) {
      inputRefthree.current?.setOpen(true);
    } else {
      console.error("Input reference is null");
    }
  };
  const handleClickfour = () => {
    if (inputReffour.current) {
      inputReffour.current?.setOpen(true);
    } else {
      console.error("Input reference is null");
    }
  };



  const handleSelect = (field, priority) => {
    setTaskDetails({ ...taskDetails, [field]: priority });
    setIsDropdownOpen(false); // Close the dropdown after selection
  };


  const isToday = (date) => {
    const today = new Date();
    const currentDate = new Date(date);

    return today.toDateString() === currentDate.toDateString(); 
  };

  // Fetch posts after user login


  const handleAddTask = () => {
    const postData = { ...taskDetails, user: userId };
    dispatch(createPost(postData));
    setTaskDetails({ taskName: '', priority: 'low', dueDate: '', remainder: '', repeat: 'none', status: false });
    setdata(false);
  };

  const handletodaydata = () => {
    const today = new Date().setHours(0, 0, 0, 0); // Start of today (midnight)

    // Filter posts created today
    const postsCreatedToday = posts.filter(post => {
      const postDate = new Date(post.createdAt).setHours(0, 0, 0, 0); // Ignore time portion
      return postDate === today; // Compare only the date (without time)
    });

    setAllPosts(postsCreatedToday);
    setdata(true);
  };

  const handleImportant = () => {
    const importantPosts = posts.filter(post => post.priority === 'high');

    setAllPosts(importantPosts);
    setdata(true);
  }

  const handleplanned = () => {
    const importantPosts = posts.filter(post => post.status === false);

    setAllPosts(importantPosts);
    setdata(true);
  }


  const handleDeleteTask = (postId) => {
    dispatch(deletePost(postId));
    setTaskDetails({ taskName: '', priority: 'low', dueDate: '', remainder: '', repeat: 'none', status: false });
    setAllPosts(posts);
    setdata(false);
  };
  
 
  return (<>
    {userId ? (
      <div className="h-screen ">

      {/* Navbar */}
      <div className="p-3 flex justify-between mb-4">
        <div className="flex gap-4 items-center">
          <IoMenu onClick={() => setFirst(!first)} className="md:text-2xl cursor-pointer" />
          <img className=' w-1/2 md:w-full' src="/logo.png" alt="Logo" />
        </div>

        <div className="flex gap-4 items-center relative">
          <IoGridOutline onClick={()=>{setlogout(!logout)}}  className="text-xl md:text-2xl cursor-pointer" />
          <div onClick={()=>{handleLogout()}} className={`hover:cursor-pointer absolute top-8 ${!logout?'hidden':'block'} right-0 bg-[#bfe1c3] p-1 rounded-md `} >Logout</div>
        </div>
      </div>


      {/* Main */}
      <div className="flex md:flex-nowrap flex-wrap">
        <section className="flex gap-2 mb-3 h-full w-full">
          {/* Sidebar */}


          <aside className={`h-full transition-all duration-600 ease-in-out bg-[#EEF6EF] ${first && 'opacity-0 h-0 w-0 hidden'
            } lg:w-[20%] md:w-[30%] sm:w-[35%]  flex flex-col items-center p-2`}
          >
            <div className=" rounded-full h-20 w-20 my-2">
              <img src={user.image} className='h-full w-full rounded-full' alt="" />
            </div>
            <h3 className="mb-3">Hey, {user.name}</h3>

            <div className="bg-white w-full p-2">


              <li onClick={() => {
                setActiveIndex(0);
                setAllPosts(posts);
              }} className={`flex hover:bg-[#EEF6EF] items-center gap-2 p-1 cursor-pointer ${activeIndex === 0 ? "bg-[#EEF6EF]" : ""} `}>
                <img src="/menu.png" alt="" /> All Tasks
              </li>


              <li onClick={() => {
                setActiveIndex(1);
                handletodaydata();
              }} className={`flex hover:bg-[#EEF6EF] items-center gap-2 p-1 cursor-pointer ${activeIndex === 1 ? "bg-[#EEF6EF]" : ""} `}>
                <CiCalendar className="w-6" /> Today
              </li>


              <li onClick={() => {
                setActiveIndex(2);
                handleImportant();
              }} className={`flex hover:bg-[#EEF6EF] items-center gap-2 p-1 cursor-pointer ${activeIndex === 2 ? "bg-[#EEF6EF]" : ""} `}>
                <CiStar className="w-6" /> Important
              </li>

              <li onClick={() => {
                setActiveIndex(3);
                handleplanned();
              }} className={`flex hover:bg-[#EEF6EF] items-center gap-2 p-1 cursor-pointer ${activeIndex === 3 ? "bg-[#EEF6EF]" : ""} `}>
                <FiMap className="w-6" /> Planned
              </li>

              <li onClick={() => {
                setActiveIndex(4);
                setAllPosts(posts);
              }} className={`flex hover:bg-[#EEF6EF] items-center gap-2 p-1 cursor-pointer ${activeIndex === 4 ? "bg-[#EEF6EF]" : ""} `}>
                <img src="/clock.png" alt="" /> Assigned to me
              </li>

            </div>

            <div className="bg-white p-2 my-2  flex items-center gap-3 h-12 w-full">
              <IoIosAdd /> Add list
            </div>

            <div className="bg-white w-full p-2 rounded-sm my-2">
              <div className="flex gap-6">
                <div>
                  <h2 className="text-xl">Total Tasks</h2>
                  <h3 className="text-2xl">{posts.length}</h3>
                </div>
                <IoIosInformationCircle className="mt-2" />
              </div>
              <hr  className='mb-1'/>
              <div className=" h-full w-full  overflow-hidden ">
                <Chart className='-mt-10 p-1'
                  chartType="PieChart"
                  data={dataChart}
                  options={options}
                />
              </div>
            </div>
          </aside>

          {/* Content */}
          <div className="w-full bg-transparent p-4">
            <select >
              <option value="low">Todo</option>
            </select>
            <hr />

            {/* middle part */}

            <div className="bg-[#EEF6EF] p-2 mb-3">
              <h3>Add A Task</h3>
              <input
                type="text"
                className="border  p-2 mt-4 w-full"
                placeholder="Task Name"
                value={taskDetails.taskName}
                onChange={(e) => setTaskDetails({ ...taskDetails, taskName: e.target.value })}
              />
              <div className="flex mt-4 justify-between">
                <div className="flex gap-4">

                  <div onClick={handleClickthree} className="">
                    <CiBellOn className='text-xl' />
                  </div>

                  <div onClick={handleClickfour} className="   ">
                    <CiCalendar className='text-xl' />
                    
                  </div>

                  <div onClick={() => { setIsDropdownOpenthree(!isDropdownOpenthree) }} className=" cursor-pointer">
            <CiRepeat className='text-xl ' />
            <div className="relative">
              {isDropdownOpenthree && (
                <ul className="absolute  bg-white shadow-lg rounded-md w-28 z-10">
                  <li
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleSelect("repeat", "none")}
                  >
                    none
                  </li>
                  <li
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleSelect("repeat", "daily")}
                  >
                    daily
                  </li>
                  <li
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleSelect("repeat", "weekly")}
                  >
                    weekly
                  </li>
                  <li
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleSelect("repeat", "monthly")}
                  >
                    monthly
                  </li>
                </ul>
              )}
            </div>

          </div>

          <div className="  ">
                      <DatePicker
                        selected={taskDetails.remainder}
                        onChange={(date) => handleDateChange('remainder', date)} className="ml-32 hidden" ref={inputRefthree} />
                    </div>

                    <div className=""><DatePicker
                      selected={taskDetails.dueDate}
                      onChange={(date) => handleDateChange('dueDate', date)}
                      className='hidden' ref={inputReffour} />
                      </div>

                </div>
                <button
                  className="lg:px-3 sm:px-2 md:text-base text-xs md:p-2 rounded-md bg-[#35793729] lg:py-2"
                  onClick={handleAddTask}
                >
                  ADD TASK
                </button>
              </div>
            </div>

            {status === 'loading' && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {((data ? allPosts:posts).filter((post) => !post.status).map((post, index) => (
              <div
                key={`${post._id}-${index}`} onClick={() => {

                  setSidebarVisible(true);
                  handleTaskClick(post);
                  setDate(post.updatedAt);
                }}
                className={`flex  justify-between  border-t-2 p-3 cursor-pointer `}
              >
                <div className={`items-center  flex  h-full w-full gap-1 ${post.status && 'line-through'} flex`}>
                  <div className="">{!post.status ? <MdOutlineCheckBoxOutlineBlank /> :
                    <MdCheckBox />}</div>
                  {post.taskName}
                </div>
                <div className="">
                  {post.priority === "high" ? <FaStar /> : <CiStar
                    className="text-2xl "
                  />
                  }

                </div>
                
              </div>
            )))}
            {(data?allPosts:posts)?.filter((post) => post.status).map((post, index) => (
              <div
                key={`${post._id}-${index}`} onClick={() => {
                  setSidebarVisible(true);
                  handleTaskClick(post);
                  setDate(post.updatedAt);
                }}
                className={`flex  justify-between  border-t-2 p-3 cursor-pointer `}
              >
                <div className={`items-center  flex  h-full w-full gap-1 ${post.status && 'line-through'} flex`}>
                  <div className="">{!post.status ? <MdOutlineCheckBoxOutlineBlank /> :
                    <MdCheckBox />}</div>
                  {post.taskName}
                </div>
                <div className="">
                  {post.priority === "high" ? <FaStar /> : <CiStar
                    className="text-2xl "
                  />
                  }

                </div>

              </div>
            ))}
          </div>
        </section>

        {/* right sidebar */}
        <section className={`bg-[#EEF6EF] p-2 ${!sidebarVisible && 'opacity-0 h-0 w-0 hidden'} transition-all duration-500 ease-in-out  h-full  overflow-hidden  lg:w-[25%]`}>
          <div className="flex justify-between mt-11 ml-4 border-t-2 p-4  ">
            <div className="items-center text-center gap-2 flex">
              <div onClick={() => {
                setTaskDetails({ ...taskDetails, status: !taskDetails.status });
              }} className="">
                {!(taskDetails.status) ? <MdOutlineCheckBoxOutlineBlank /> :
                  <MdCheckBox />}</div>
                  <p className=''>{taskDetails.taskName}</p>
              
            </div>

            <div className="relative inline-block">
              {/* Trigger Icon */}
              <div onClick={() => setIsDropdownOpen((prev) => !prev)} // Toggle dropdown
                className="text-2xl cursor-pointer"
                title="Select Priority">
                {taskDetails.priority === "high" ? <FaStar /> : <CiStar
                  className="text-2xl "
                />
                }
              </div>

              {/* Dropdown */}
              {isDropdownOpen && (
                <ul className="absolute -ml-14 bg-white shadow-lg rounded-md w-24 z-10">
                  <li
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleSelect("priority", "low")}
                  >
                    Low
                  </li>
                  <li
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleSelect("priority", "medium")}
                  >
                    Medium
                  </li>
                  <li
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleSelect("priority", "high")}
                  >
                    High
                  </li>
                </ul>
              )}
            </div>

          </div>

          <div className="flex cursor-pointer items-center gap-3 ml-4 border-t-2 p-3  ">
            <IoIosAdd className='text-2xl' /><p className=' md:block'>Add Step</p>
          </div>

          <div onClick={handleClick} className="flex cursor-pointer items-center gap-3 ml-4 border-t-2 p-3  ">
            <CiBellOn className='text-2xl' /><p className='hidden md:block'>Set Remainder</p>
            <div className=" ">
              <DatePicker
                selected={taskDetails.remainder}
                onChange={(date) => handleDateChange('remainder', date)} className=" hidden" ref={inputRef} />
            </div>
            <p className=' md:block'> {taskDetails.remainder ? new Date(taskDetails.remainder).toLocaleDateString()
              : "No remainder set"}</p>

          </div>


          <div onClick={handleClickTwo} className="flex items-center gap-3 ml-4 border-t-2 p-3  ">
            <CiCalendar className='text-2xl' /><p className='hidden md:block'>Add Due Date</p>
            <div className=""><DatePicker
              selected={taskDetails.dueDate}
              onChange={(date) => handleDateChange('dueDate', date)}
              className='hidden' ref={inputReftwo} /></div>
            <p className=' md:block'> {taskDetails.dueDate ? new Date(taskDetails.dueDate).toLocaleDateString()
              : "No duedate set"}</p>

          </div>

          <div onClick={() => { setIsDropdownOpensec(!isDropdownOpensec) }} className="flex cursor-pointer  items-center gap-3 ml-4 border-t-2 p-3  ">
            <CiRepeat className='text-2xl ' />
            <p className='hidden md:block'>Repeat</p>
            <p className=' md:block'>{taskDetails.repeat}</p>
            <div className="relative">
              {isDropdownOpensec && (
                <ul className="absolute  bg-white shadow-lg rounded-md w-28 z-10">
                  <li
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleSelect("repeat", "none")}
                  >
                    none
                  </li>
                  <li
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleSelect("repeat", "daily")}
                  >
                    daily
                  </li>
                  <li
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleSelect("repeat", "weekly")}
                  >
                    weekly
                  </li>
                  <li
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleSelect("repeat", "monthly")}
                  >
                    monthly
                  </li>
                </ul>
              )}
            </div>
            
          </div>
          <div className=" ml-4 border-t-2 p-3  ">
            <h3 className='ml-8 text-gray-500 hidden md:block'>Add Notes</h3>
          </div>
          <div className="  flex md:justify-end p-2 ml-4"><button onClick={handleUpdateTask} className='bg-[#f0852d] flex justify-center  rounded-lg sm:text-xs md:text-base  md:p-2 '>update</button></div>

          <div className="flex h-full bottom-0 w-full align-middle gap-2 justify-between mt-24 ml-4 border-t-2 p-4 text-gray-500 ">

            <RxCross1 onClick={() => {
              setSidebarVisible(false);
              setTaskDetails({ taskName: '', priority: 'low', dueDate: '', remainder: '', repeat: 'none', status: false });
            }} className='text-xl text-black cursor-pointer ' />

            <div className='md:block'>
            {isToday(date)
              ? 'Created today'
              : `Created on ${new Date(date).toLocaleDateString()}`}
            </div>

            <RiDeleteBin6Fill onClick={() => {
              handleDeleteTask(selectedTaskId)
              setSidebarVisible(!sidebarVisible);
            }} className=' mr-1 cursor-pointer text-2xl  text-black' />

          </div>
        </section>
      </div>
    </div>) : (<SignupPage />)}
  </>

  );
};

export default MainApp;
