import { BasicFrame } from "../../common/Frame/BasicFrame";

const Sidebar: React.FC = () => {
    return (
        <BasicFrame isCentered={false} style={{width:'200px', padding: '20px 32px 20px 0'}} className="card-item items-start justify-center flex-col">
            <BasicFrame isCentered={false} style={{width:'168px', padding: '8px 14px'}} className="items-start justify-start">
                <span>Profile</span>
            </BasicFrame>
            <BasicFrame isCentered={false} style={{width:'168px', padding: '8px 14px'}} className="items-start justify-start">
                <span>Security</span>
            </BasicFrame>
        </BasicFrame>
    );
}

export default Sidebar;