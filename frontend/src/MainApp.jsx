import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, getUserPosts, updatePost, deletePost } from './store/contentSlice';
import { IoMenu } from "react-icons/io5";
import { CiCalendar, CiSearch, CiStar } from "react-icons/ci";
import { MdCheckBox } from "react-icons/md";
import { BsMoonStarsFill } from "react-icons/bs";
import { FiMap } from "react-icons/fi";
import { IoGridOutline } from "react-icons/io5";
import { IoIosAdd } from "react-icons/io";
import { IoIosInformationCircle } from "react-icons/io";
import { CiBellOn } from "react-icons/ci";
import { CiRepeat } from "react-icons/ci";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaRegBell } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import SignupPage from '../pages/SignUp';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; // import the styles



const MainApp = () => {
  const [first, setFirst] = useState(true);
  const [second, setSecond] = useState(true);
  const [postid, setpostid] = useState('');
  const [complete, setCompleted] = useState(false);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
const [taskDetails, setTaskDetails] = useState({ taskName: '', priority: 'low', dueDate: '', remainder: '', repeat: 'none', status: false });
const [sidebarVisible, setSidebarVisible] = useState(false);
const [detailPanelVisible, setDetailPanelVisible] = useState(false);
const [selectedTaskId, setSelectedTaskId] = useState(null);

  
  const { user,userId, posts, status, error } = useSelector((state) => state.content);

//  const handleUpdateTask = () => {
//   if (selectedTaskId) {
//     const updates = { ...taskDetails };
//     dispatch(updatePost({ postId: selectedTaskId, updates }));
//   }
// };

const handleUpdateTask = () => {
  if (selectedTaskId) {
    const updates = Object.keys(taskDetails).reduce((acc, key) => {
      if (taskDetails[key] !== posts.find((post) => post._id === selectedTaskId)?.[key]) {
        acc[key] = taskDetails[key];
      }
      return acc;
    }, {});

    if (Object.keys(updates).length) {
      dispatch(updatePost({ postId: selectedTaskId, updates }));
    }
  }
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
  setTaskDetails({ ...taskDetails, [field]: date });
};

  // const handleChange = (event) => {
  //   const selectedValue = event.target.value;
  //   setFrequency(selectedValue);
  // };

  useEffect(()=>{
    handleUpdateTask();
 },[taskDetails]);
 
  const handleClick = () => {
    if (inputRef.current) {
     inputRef.current?.setOpen(true);
    } else {
      console.error("Input reference is null");
    }
  };


  // Fetch posts after user login
  useEffect(() => {
    if (userId) {
      dispatch(getUserPosts(userId));
    }
  }, [userId, dispatch]);

  const handleAddTask = () => {
    const postData = { ...taskDetails, user: userId };
    dispatch(createPost(postData));
    setTaskDetails({ taskName: '', priority: 'low', dueDate: '', remainder: '', repeat: 'none', status: false });
  };


  const handleDeleteTask = (postId) => {
    dispatch(deletePost(postId));
  };

  return (<>  
  {  userId ?(<div className="mx-4">
      
    {/* Navbar */}
    <div className="p-3 flex justify-between my-4">
      <div className="flex gap-4 items-center">
        <IoMenu onClick={() => setFirst(!first)} className="text-2xl cursor-pointer" />
        <img src="../public/logo.png" alt="Logo" />
      </div>

      <div className="flex gap-4 items-center">
        <CiSearch className="text-2xl cursor-pointer" />
        <IoGridOutline className="text-2xl cursor-pointer" />
        <BsMoonStarsFill className="text-2xl cursor-pointer" />
      </div>
    </div>

     {/* Main */}
     <div className="flex">
       <section className="flex gap-2 h-full w-full">
         {/* Sidebar */}
        <aside className={`h-full transition-all duration-500 ease-in-out bg-[#EEF6EF] ${
            first && 'opacity-0 h-0 w-0'
          } w-60 flex flex-col items-center p-2`}
        >
          <div className=" rounded-full h-20 w-20 my-2">
            <img src={user.image} className='h-full w-full' alt="" />
          </div>
          <h3 className="mb-3">Hey, {user.name}</h3>

           <div className="bg-white w-full p-2">
             <li  className="flex hover:bg-[#EEF6EF] items-center gap-2 p-1 cursor-pointer">
               <img src="../public/menu.png" alt="" /> All Tasks
             </li>
             <li className="flex cursor-pointer bg-[#EEF6EF] items-center gap-2 p-1">
               <CiCalendar className="w-6" /> Today
             </li>
             <li className="flex items-center cursor-pointer p-1 gap-2">
               <CiStar className="w-6" /> Important
             </li>
             <li className="flex cursor-pointer items-center gap-2 p-1">
               <FiMap className="w-6" /> Planned
             </li>
             <li className="flex cursor-pointer items-center p-1 gap-2">
               <img src="../public/clock.png" alt="" /> Assigned to me
             </li>
          </div>

           <div className="bg-white p-2 my-2 flex items-center gap-3 h-12 w-full">
           <IoIosAdd /> Add list
          </div>

          <div className="bg-white w-full p-2 rounded-sm my-2">
             <div className="flex gap-6">
               <div>
                 <h2 className="text-xl">Today Tasks</h2>
                 <h3 className="text-2xl">{posts.length}</h3>
               </div>
               <IoIosInformationCircle className="mt-2" />
            </div>
            <hr />
             <div className="h-20">chart</div>
           </div>
         </aside>

         {/* Content */}
         <div className="w-full p-4">
           <select >
             <option value="low">Todo</option>
           </select>
           <hr />

           <div className="bg-[#EEF6EF] p-2 mb-3">
             <h3>Add A Task</h3>
             <input
              type="text"
              className="border p-2 mt-4 w-full"
                placeholder="Task Name"
                value={taskDetails.taskName}
                onChange={(e) => setTaskDetails({ ...taskDetails, taskName: e.target.value })}
              />
            <div className="flex mt-4 justify-between">
              <div className="flex gap-4">
                <CiBellOn className="text-xl" />
                <CiCalendar className="text-xl" />
                <CiRepeat className="text-xl" />
              </div>
              <button
                className="px-3 rounded-md bg-[#35793729] py-2"
                onClick={handleAddTask}
              >
                ADD TASK
              </button>
            </div>
          </div>

          {status === 'loading' && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {posts.map((post,index) => (
            <div
            key={`${post._id}-${index}`} onClick={() => {
               
              setDetailPanelVisible(true); 
              setSelectedTaskId(post._id); 
              setpostid(post._id);
            }}
              className={`flex justify-between  border-t-2 p-3 cursor-pointer `}
            >
              
              <div className={`items-center flex  h-full w-full gap-1 ${postid===post._id&&post.status&&'line-through'} flex`}>
                <MdOutlineCheckBoxOutlineBlank onClick={()=>{setCompleted(!complete);
                  setTaskDetails({ ...taskDetails, status: !status })
                }} /> {post.taskName}
                <div onClick={()=>{setSidebarVisible(!sidebarVisible);}} className="  h-full  w-full flex-1">.</div>
              </div>
              <CiStar
                className="text-2xl cursor-pointer"
                
              />
              <select  className='' name="priority" 
           value={post.priority}
           onChange={(e) => setTaskDetails({ ...taskDetails, priority: e.target.value })}
       >
             <option value="low">Low</option>
             <option value="medium">Medium</option>
             <option value="high">High</option>
           </select>
            </div>
          ))}
        </div>
      </section>
      <section className={`bg-[#EEF6EF] ${sidebarVisible&&'opacity-0 h-0 w-0'} transition-all duration-500 ease-in-out  h-full  overflow-hidden  w-[25%]`}>
       <div className="flex justify-between mt-11 ml-4 border-t-2 p-4  ">
             <div className="items-center text-center gap-2 flex">
              <MdCheckBox />{posts.find((post) => post._id === postid)?.taskName}
              </div>
              <CiStar className='text-2xl' />
            </div>
            <div  className="flex cursor-pointer items-center gap-3 ml-4 border-t-2 p-3  ">
           <IoIosAdd className='text-2xl'/>Add Step
           </div>
           <div onClick={handleClick}  className="flex cursor-pointer items-center gap-3 ml-4 border-t-2 p-3  ">
           <CiBellOn className='text-2xl' />Set Remainder
           <div className=""><DatePicker 
           selected={taskDetails.remainder}
           onChange={(date) => handleDateChange('remainder', date)} className='hidden' ref={inputRef}/></div>
           </div>
           <div onClick={handleClick}  className="flex items-center gap-3 ml-4 border-t-2 p-3  ">
           <CiCalendar className='text-2xl' />Add Due Date
           <div className=""><DatePicker 
           selected={taskDetails.dueDate}
           onChange={(date) => handleDateChange('dueDate', date)}
         className='hidden' ref={inputRef}/></div>
           </div>
           <div className="flex items-center gap-3 ml-4 border-t-2 p-3  ">
           <CiRepeat  className='text-2xl' />Repeat
           <select value={taskDetails.repeat} 
                onChange={(e) => setTaskDetails({ ...taskDetails, priority: e.target.value })}>
            <option value="none">none</option>
            <option value="daily">daily</option>
            <option value="weekly">weekly</option>
            <option value="monthly">monthly</option>
           </select> 
           </div>
           <div className=" ml-4 border-t-2 p-3  ">
             <h3 className='ml-8 text-gray-500'>Add Notes</h3>
           </div>

           <div className="flex h-full bottom-0 w-full align-middle  justify-between mt-24 ml-4 border-t-2 p-4 text-gray-500 "> 
             <RxCross1 onClick={() => setSidebarVisible(!sidebarVisible)} className='text-xl text-black cursor-pointer '/>Created Today 
             <RiDeleteBin6Fill onClick={() =>{ handleDeleteTask(postid)
              setSidebarVisible(!sidebarVisible);
             }}  className=' mr-1 cursor-pointer text-2xl text-black' />
           </div>
         </section>
    </div>
  </div>):(<SignupPage />)}
  </>
    
  );
};

export default MainApp;


// 00000

