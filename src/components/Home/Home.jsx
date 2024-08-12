import React from 'react'
import { getDatabase, ref, set } from 'firebase/database'
import { app } from '../../firebase'
import { useState } from 'react'

const db = getDatabase(app);

const Home = () => {

    const [count, setCount] = useState(0)

    const putData = () => {
        set(ref(db, "users/sourav"),{
          id: 1,
          name: "Sourav",
          count: count,
        })
      }
  return (
    <div>
        <div className="flex font-sans">
            <div class="flex space-x-4 mb-6 text-sm font-medium">
            <div class="flex space-x-6">
                <button class="h-10 px-6 font-semibold rounded-md bg-black text-white" type="submit" onClick={()=> setCount(count+1)}>
                Count {count}
                </button>
                <button class="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900" type="button" onClick={putData}>
                Put Data
                </button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Home