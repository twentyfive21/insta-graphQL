import { RotatingLines } from  'react-loader-spinner'
import { useContext } from 'react';
import { UserContext } from '../contexts/CurrentUser';

function Spinner() {
  const {darkMode} = useContext(UserContext)
  return (
    <div style={{ backgroundColor: darkMode ? "black" : "white" }}
 className='spinner-height'>
   <div className="spinner">
<RotatingLines
  strokeColor="rgb(0, 149, 246)"
  strokeWidth="5"
  animationDuration="0.75"
  width="96"
  visible={true}
/>
</div>
 </div>
  )
}

export default Spinner