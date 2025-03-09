import React from 'react'
import LeaderBoard from '../components/LeaderBoard'
import Navbar from '../components/Navbar'

const UserLeaderBoard = () => {
  return (
    <div className='h-screen w-screen bg-gradient-to-b from-[#000000]/95 via-[#010a0a]/95 to-[#06b7b4]/95'>
        <Navbar/>
        <LeaderBoard/>
    </div>
  )
}

export default UserLeaderBoard