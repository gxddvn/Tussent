import { Outlet } from 'react-router-dom'

const User = () => {
    return (
        <div className='min-h-full'>
            <Outlet/>
        </div>
    )
}

export default User