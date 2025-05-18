import React from 'react'
import { useUser } from '../contexts/UserContext'

function Avatar() {
    const {user} = useUser();

  return (
    <div>
        <img
        src={user.avatar_url}
        className='w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover  bg-center'
        />
    </div>
  )
}

export default Avatar