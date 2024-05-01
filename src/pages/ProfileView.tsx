import { GenericFrame } from "../common/Frame/GenericFrame";
import { BasicFrame } from "../common/Frame/BasicFrame";
import { Typography } from "@mui/material";
import Profile from "../components/Profile/Profile";

const ProfileView: React.FC = () => {

    return (
        <GenericFrame isCentered={false} className="items-start justify-center">

            <BasicFrame isCentered={false} className="mt-10" style={{flexDirection:'column'}}>
                <BasicFrame isCentered={false} className="flex-col pb-12">
                    <Typography style={{ fontSize: '1.3em', fontWeight:'500'}}>Account Settings</Typography>
                </BasicFrame>

                <BasicFrame isCentered={false} className="card-container items-start justify-between">
                    <BasicFrame isCentered={false} style={{width:'200px', padding: '20px 32px 20px 0'}} className="card-item items-start justify-center flex-col">
                        <BasicFrame isCentered={false} style={{width:'168px', padding: '8px 14px'}} className="items-start justify-start">
                            <span>Hola</span>
                        </BasicFrame>
                        
                    </BasicFrame>
                    
                    {/* Profile */}
                    <Profile/>

                </BasicFrame>

            </BasicFrame>
        </GenericFrame>
    );
}
export default ProfileView;