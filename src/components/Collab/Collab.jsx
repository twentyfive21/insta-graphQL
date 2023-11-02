import {useContext} from 'react'
import './Collab.css'
import details from '../../assets/dots.png'
import { UserContext } from '../../contexts/CurrentUser'


function Collab({userData}) {
  const {currentUser} = useContext(UserContext)
  return (
    <div className='collab-container'>
        <div className='collab-left'>
          <img src={currentUser.avatar} className='p-circle' alt='profile pic'/>
          <p><span>{currentUser.username}</span></p>
        </div>
        <img src={details} alt='detail dots' className='dots'/>
    </div>
  )
}

export default Collab