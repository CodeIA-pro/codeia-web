
import { BasicFrame } from "../../common/Frame/BasicFrame";

  
const PlanFeature: React.FC = () => {
    return (
        <BasicFrame isCentered={false} className={'flex items-center justify-between pb-4 pl-14 pr-14'}>
            <span style={{fontSize:'0.9em', fontWeight:'500'}} className="text-white">Compare plans</span>
            <BasicFrame isCentered={false} className="flex items-center justify-center flex-col mt-2 mb-2">
                <span style={{fontSize:'1.2em', fontWeight:'700'}} className="text-white">Basic</span>
                <span style={{fontSize:'0.9em', fontWeight:'500'}} className="text-white pt-1">CodeIA Basic</span>
            </BasicFrame>
            <BasicFrame isCentered={false} className="flex items-center justify-center flex-col mt-1 mb-2">
                <span style={{fontSize:'1.2em', fontWeight:'700', color:'#5a7fe7'}}>Pro</span>
                <span style={{fontSize:'0.9em', fontWeight:'500'}} className="text-white pt-1">CodeIA Pro</span>
            </BasicFrame>
            <BasicFrame isCentered={false} className="flex items-center justify-center flex-col mt-1 mb-3">
                <span style={{fontSize:'1.2em', fontWeight:'700',}} className="enterprices">Enterprise</span>
                <span style={{fontSize:'0.9em', fontWeight:'500'}} className="text-white pt-1">CodeIA Enterprise</span>
            </BasicFrame>
        </BasicFrame>
    );
};

export default PlanFeature;