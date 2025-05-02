import { GrLogout } from "react-icons/gr";
import InitialsAvatar from 'react-initials-avatar';
import 'react-initials-avatar/lib/ReactInitialsAvatar.css';

const Profile = ({userInfo, onLogout}) => {
  // Early return with loading indicator if userInfo is not available
  if (!userInfo) {
    return <div className="flex items-center gap-4">Loading profile...</div>;
  }

  return (
    <>
        <div className='flex items-center gap-4'>
            <InitialsAvatar name={userInfo.name || ''} />
            <div className='flex  items-center gap-4'>
                <p className='text-md text-white font-medium'>{userInfo.name}</p>
                <button className='text-lg text-white cursor-pointer hover:text-xl hover:text-red-600 ' onClick={onLogout}><GrLogout/></button>
            </div>
        </div>
    </>
  );
};

export default Profile;