import React from 'react'

const Sidebar = () => {
  return (
    <div className='flex w-screen h-[calc(100%-4rem)] '>
            <div className='w-1/4 bg-black/50 backdrop-blur-md p-4'>
                <ul className='flex flex-col space-y-8 justify-center items-center'>
                    <li className='text-white font-bold'>Leaderboard</li>
                    <li className='text-white font-bold'>Add Player</li>
                    <li className='text-white font-bold'>Players</li>
                </ul>

            </div>
        </div>
  )
}

export default Sidebar