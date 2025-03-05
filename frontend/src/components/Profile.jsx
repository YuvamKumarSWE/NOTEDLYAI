import { GrLogout } from "react-icons/gr";
import InitialsAvatar from 'react-initials-avatar';
import 'react-initials-avatar/lib/ReactInitialsAvatar.css';

const Profile = ({onLogout}) => {


  return (
    <>
        <div className='flex items-center gap-4'>
            <InitialsAvatar name="Y" />
            <div className='flex flex-col items-center gap-1'>
                <p className='text-md font-medium'>Yuvam</p>
                <button className='text-sm text-slate-500 cursor-pointer' onClick={onLogout} ><GrLogout/></button>
            </div>
            
        </div>
    </>
  );
};

export default Profile;