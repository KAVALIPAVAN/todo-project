// import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import {  } from './store/contentSlice';
// import { IoMenu } from "react-icons/io5";
// import { CiCalendar, CiSearch, CiStar } from "react-icons/ci";
// import { MdCheckBox } from "react-icons/md";
// import { BsMoonStarsFill } from "react-icons/bs";
// import { FiMap } from "react-icons/fi";
// import { IoGridOutline } from "react-icons/io5";
// import { IoIosAdd } from "react-icons/io";
// import { IoIosInformationCircle } from "react-icons/io";
// import { CiBellOn } from "react-icons/ci";
// import { CiRepeat } from "react-icons/ci";
// import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
// import { RiDeleteBin6Fill } from "react-icons/ri";
// import { FaRegBell } from "react-icons/fa";
// import { RxCross1 } from "react-icons/rx";

// const App = () => {

//   const [first, setfirst] = useState('true');
//   const [second, setsecond] = useState('true');
//   const dispatch = useDispatch();

//   return (
//     <div className='mx-4'>
// {/* #Navbar */}
//       <div className="p-3 flex justify-between my-4">

//         <div className="flex gap-4 items-center">
//         <IoMenu onClick={() => setfirst(!first)} className='text-2xl cursor-pointer'  />
//           <img src="../public/logo.png" alt="" />
//         </div>

//         <div className="flex gap-4 items-center">
//         <CiSearch className='text-2xl cursor-pointer'/>
//         <IoGridOutline className='text-2xl cursor-pointer'/>
//         <BsMoonStarsFill className='text-2xl cursor-pointer'/>
//         </div>

//       </div>
// {/* Main */}
//       <div className="flex">

//         <section className="flex gap-2 h-full w-full ">

//           <left className={`h-full transition-all duration-500 ease-in-out  bg-[#EEF6EF] ${first&&'opacity-0 h-0 w-0'}  w-60 flex flex-col items-center  p-2 `}>

//             <div className="bg-red-500 rounded-full h-20 w-20 my-2"></div>
//             <h3 className='mb-3'>Hey,ABCD</h3>

//             <div className="bg-white w-full p-2  ">
//               <li className="flex hover:bg-[#EEF6EF] items-center gap-2 p-1 cursor-pointer"><img src="../public/menu.png" alt="" />All Tasks</li>
//               <li className="flex cursor-pointer  bg-[#EEF6EF] items-center  gap-2 p-1"><CiCalendar className='w-6'/>Today</li>
//               <li className="flex items-center cursor-pointer p-1 gap-2"><CiStar className='w-6' />Important</li>
//               <li className="flex cursor-pointer items-center gap-2 p-1"><FiMap className='w-6'/>Planned</li>
//               <li className="flex cursor-pointer items-center p-1 gap-2"><img src="../public/clock.png" alt="" /> Assigned to me</li>
//             </div>


//             <div className="bg-white p-2 my-2 flex items-center gap-3 h-12 w-full"><IoIosAdd />Add list</div>

//             <div className="bg-white w-full p-2 rounded-sm my-2   ">
//               <div className="flex gap-6">
//                 <div className="">
//                   <h2 className='text-xl'>Today Tasks</h2>
//                   <h3 className='text-2xl'>11</h3>
//                 </div>
//                 <IoIosInformationCircle className='mt-2' />
//               </div>
//               <hr />
//               <div className="h-20">
//                 chart
//               </div>
//             </div>


//           </left>

//           <div className=" w-full p-4">
//           <select name="cars" id="cars">
//             <option value="volvo">To Do</option>
//           </select>
//           <hr />

//           <div className="bg-[#EEF6EF] p-2 mb-3 ">
//             <h3>Add A Task</h3>
//             <div className="flex mt-12 justify-between">
//               <div className="flex gap-4">
//               <CiBellOn className='text-xl' />
//               <CiCalendar className='text-xl' />
//               <CiRepeat className='text-xl' />
//               </div>
//               <button className='px-3 rounded-md bg-[#35793729] py-2'>ADD TASK</button>
//             </div>
//           </div>

//           <div className="flex cursor-pointer justify-between border-t-2 p-3  " onClick={() => setsecond(!second)}>
//             <div className="items-center gap-1 flex">
//               <MdOutlineCheckBoxOutlineBlank />Buy Groceries
//             </div>
//             <CiStar className='text-2xl' />
//           </div>

//           <div className="flex justify-between border-t-2 p-3  ">
//             <div className="items-center line-through gap-1 flex">
//             <MdCheckBox />Buy Groceries
//             </div>
//             <CiStar className='text-2xl' />
//           </div>



//           </div>

          

//         </section>

//         <section className={`bg-[#EEF6EF] ${second&&'opacity-0 h-0 w-0'} transition-all duration-500 ease-in-out  h-full  overflow-hidden  w-[25%]`}>
//         <div className="flex justify-between mt-11 ml-4 border-t-2 p-4  ">
//             <div className="items-center gap-1 flex">
//             <MdCheckBox />Buy Groceries
//             </div>
//             <CiStar className='text-2xl' />
//           </div>
//           <div className="flex items-center gap-3 ml-4 border-t-2 p-3  ">
//           <IoIosAdd className='text-2xl'/>Add Step
//           </div>
//           <div className="flex items-center gap-3 ml-4 border-t-2 p-3  ">
//           <CiBellOn className='text-2xl' />Set Remainder
//           </div>
//           <div className="flex items-center gap-3 ml-4 border-t-2 p-3  ">
//           <CiCalendar className='text-2xl' />Add Due Date
//           </div>
//           <div className="flex items-center gap-3 ml-4 border-t-2 p-3  ">
//           <CiRepeat  className='text-2xl' />Repeat
//           </div>
//           <div className=" ml-4 border-t-2 p-3  ">
//             <h3 className='ml-8 text-gray-500'>Add Notes</h3>
//           </div>
//           <div className="flex h-full bottom-0 w-full align-middle  justify-between mt-24 ml-4 border-t-2 p-4 text-gray-500 "> 
//             <RxCross1 onClick={() => setsecond(!second)} className='text-xl text-black cursor-pointer '/>Created Today 
//             <RiDeleteBin6Fill className=' mr-1 text-2xl text-black' />
//           </div>
//         </section>
        
//       </div>

//     </div>
//   )
// }

// export default App



import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from '../pages/SignUp';
import MainApp from './MainApp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route path="/app" element={<MainApp />} />
      </Routes>
    </Router>
  );
}

export default App;