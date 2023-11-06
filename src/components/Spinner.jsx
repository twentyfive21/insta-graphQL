import { RotatingLines } from  'react-loader-spinner'

function Spinner() {
  return (
   <div className='spinner'>
<RotatingLines
  strokeColor="Tomato"
  strokeWidth="5"
  animationDuration="0.75"
  width="96"
  visible={true}
/>
</div>
  )
}

export default Spinner