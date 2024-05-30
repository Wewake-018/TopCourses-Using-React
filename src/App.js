import React from 'react';
import Filter from './components/Filter';
import Navbar from './components/Navbar';
import Cards from './components/Cards';
import Spinner from './components/Spinner';
import {apiUrl,filterData} from './data.js';
import { useEffect,useState } from 'react';
import { toast } from 'react-toastify';

const App = () => {

  const [courses,setCourses] = useState(null);
  const [loading,setLoading] = useState(true);
  const [category,setCategory] = useState(filterData[0].title);

  async function fetchData() {
    setLoading(true);
    try{
      const resp = await fetch(apiUrl);
      const output = await resp.json();
      //save data into a variable
      setCourses(output.data);
    }
    catch(error){
      toast.error("Something went wrong");
    }
    setLoading(false);
  }
  useEffect( () => {
    fetchData();
  },[]);

  return (
    <div className='min-h-screen flex flex-col bg-bgDark2'>
      <div>
         <Navbar/> 
      </div> 

      <div className='bg-bgDark2'>
      <div>
        <Filter 
          filterData={filterData}
          category={category}
          setCategory={setCategory}
        />
      </div>

      <div className="w-11/12 max-w-[1200px] min-h-[50vh] mx-auto flex flex-wrap justify-center items-center">
        {
          loading ? (<Spinner/>) : (<Cards courses={courses} category={category}/>)
        }
      </div>
      </div>

    </div>
  );
};

export default App;
