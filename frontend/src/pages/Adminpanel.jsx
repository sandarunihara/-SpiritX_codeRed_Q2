import React from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import LeaderBoard from '../components/LeaderBoard'

const Adminpanel = () => {
  return (
    <div className='h-screen w-screen bg-gradient-to-b from-[#000000]/95 via-[#010a0a]/95 to-[#06b7b4]/95'>
        <Navbar admin={true} />
        <div className='flex w-screen h-[calc(100%-4rem)] '>
            <div className='w-1/4 bg-black/50 backdrop-blur-md p-4'>
                <ul className='flex flex-col space-y-8 justify-center items-center'>
                    <Link to={'/admin'} className='text-white font-bold bg-green-400 w-full text-center py-3 rounded-2xl '>Leaderboard</Link>
                    <Link to={'/admin/addplayer'} className='text-white font-bold w-full text-center py-3 rounded-2xl hover:bg-green-400/50 transition-all duration-300'>Add Player</Link>
                    <Link to={'/admin/player'} className='text-white font-bold w-full text-center py-3 rounded-2xl hover:bg-green-400/50 transition-all duration-300'>Players</Link>
                </ul>
            </div>
            <div className='bg-white mx-auto'>
                <LeaderBoard/>
            </div>
        </div>

    </div>
  )
}

export default Adminpanel