import { Button, Card } from "@mui/material";
import { BasicFrame } from "../../common/Frame/BasicFrame";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { PlanItems } from "../../interfaces/plan/plan-item.interface";
  
interface PlansProps {
    style?: React.CSSProperties;
    className ?: string;
    data: PlanItems;
}

const PlanItem: React.FC<PlansProps> = ({style, className, data}) => {
    return (
            <Card className={`flex items-start justify-between flex-col ${className ? className || '' : ''}`}
                sx={{ 
                    backgroundColor: '#111623', 
                    padding: '2rem', 
                    borderRadius: '.5em',
                    height: '384px',
                    width: '380px',
                    ...(style || {}),
                }}
            >
                <BasicFrame isCentered={false} className="flex-col items-start justify-start">
                    <span style={{fontSize:'1.5em'}} className="text-white font-bold">{data.plan_title}</span>
                    <span style={{fontSize:'0.9em', fontWeight:'300'}} className="text-white drop-shadow-xl">{data.subtitle}</span>
                    <span style={{fontSize:'2.5em', fontWeight:'700'}} className="text-white mt-1">{data.plan}</span>
                    <BasicFrame isCentered={false} className="flex items-center justify-start mt-2 mb-2">
                        <CheckCircleIcon style={{color: '#5a7fe7', fontSize:'0.9em'}}/>
                        <span style={{fontSize:'0.9em', fontWeight:'300'}} className="text-white ml-2">{data.plan_description_one}</span>
                    </BasicFrame>
                    <BasicFrame isCentered={false} className="flex items-center justify-start mt-1 mb-2">
                        <CheckCircleIcon style={{color: '#5a7fe7', fontSize:'0.9em'}}/>
                        <span style={{fontSize:'0.9em', fontWeight:'300'}} className="text-white ml-2">{data.plan_description_two}</span>
                    </BasicFrame>
                    <BasicFrame isCentered={false} className="flex items-center justify-start mt-1 mb-3">
                        <CheckCircleIcon style={{color: '#5a7fe7', fontSize:'0.9em'}}/>
                        <span style={{fontSize:'0.9em', fontWeight:'300'}} className="text-white ml-2">{data.plan_description_three}</span>
                    </BasicFrame>
                </BasicFrame>
                <Button variant="contained" className="w-full" style={{backgroundColor: `${data.color}`, color: '#F5F5DC', padding: '0.5em 1.5em', textTransform: 'none', borderRadius:'.5rem'}}>
                    {data.button_title}
                </Button>
            </Card>
    );
};

export default PlanItem;