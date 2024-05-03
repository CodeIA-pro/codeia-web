import { BasicFrame } from "../../common/Frame/BasicFrame";
import { PlanFeatureItems } from "../../interfaces/plan/plan-item.interface";


const PlanFeatureItem: React.FC<{data: PlanFeatureItems}>= ({data}) => {
    return (
        <BasicFrame isCentered={false} className={'flex items-center justify-between pb-4 pt-4 pl-14 pr-14'}>
            <span style={{fontSize:'0.8em', fontWeight:'500', width: '150px'}} className="text-white">{data.plan_title}</span>
            <BasicFrame isCentered={false} className="flex items-center justify-center flex-col mt-2 mb-2">
                <span style={{fontSize:'0.8em', fontWeight:'400', width: '150px', textAlign:'center'}} className="text-white pt-1">{data.basic}</span>
            </BasicFrame>
            <BasicFrame isCentered={false} className="flex items-center justify-center flex-col mt-1 mb-2">
                <span style={{fontSize:'0.8em', fontWeight:'400', width: '150px', textAlign:'center'}} className="text-white pt-1">{data.pro}</span>
            </BasicFrame>
            <BasicFrame isCentered={false} className="flex items-center justify-center flex-col mt-1 mb-3">
                <span style={{fontSize:'0.8em', fontWeight:'400', width: '150px', textAlign:'center'}} className="text-white pt-1">{data.enterprise}</span>
            </BasicFrame>
        </BasicFrame>
    );
};

export default PlanFeatureItem;