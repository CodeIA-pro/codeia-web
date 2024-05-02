import { GenericFrame } from "../common/Frame/GenericFrame";
import { BasicFrame } from "../common/Frame/BasicFrame";
import { Box, Typography } from "@mui/material";
import Profile from "../components/Profile/Profile";
import Sidebar from "../components/Profile/Sidebar";
import Security from '../components/Profile/Security';

const ProfileView: React.FC = () => {
    return (
        <GenericFrame isCentered={false} className="items-start justify-center">
            <BasicFrame isCentered={false} className="mt-10" style={{flexDirection:'column'}}>
                <BasicFrame isCentered={false} className="flex-col pb-12">
                    <Typography style={{ fontSize: '1.3em', fontWeight:'500'}}>Account Settings</Typography>
                </BasicFrame>
                <BasicFrame isCentered={false} className="card-container items-start justify-between">
                    <Sidebar/>
                    <BasicFrame className="flex-col">
                        <Profile/>
                        <Box marginBottom={4}/>
                        <Security/>
                    </BasicFrame>
                </BasicFrame>
            </BasicFrame>
        </GenericFrame>
    );
}
export default ProfileView;