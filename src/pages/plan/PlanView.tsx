import { BasicFrame } from "../../common/Frame/BasicFrame";
import { GenericFrame } from "../../common/Frame/GenericFrame";
import { Divider, Typography } from "@mui/material";
import PlanItem from "../../components/Plan/PlanItem";
import Plans from "../../utils/plans.utilis";
import PlanFeature from "../../components/Plan/PlanFeature";
import PlansFeatures from "../../utils/feature_plans.utilis";
import PlanFeatureItem from "../../components/Plan/PlanFeatureItem";
import { Fragment } from "react/jsx-runtime";
import ContactUs from "../../components/Plan/ContactUs";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const PlanView: React.FC= () => {
    const location = useLocation();
    useEffect(() => {
        const seccion = location.hash.replace('#', '');
        if (seccion) {
          const elemento = document.getElementById(seccion);
          if (elemento) elemento.scrollIntoView({ behavior: 'smooth' });
        }
      }, [location]);

    return (
        <GenericFrame className="flex-col" style={{backgroundColor: '#080a0f'}} id={'plans'}>
            <BasicFrame className="flex-col mt-20">
                <Typography className="font-bol text-white" style={{fontWeight: '700', fontSize:'1.7em'}}>Plans</Typography>
                <Typography className="font-bol text-white" style={{fontWeight: '300', fontSize:'0.8em', paddingTop:'0.8em'}}>Choose the plan that suites your team</Typography>
                <BasicFrame className="mt-10 justify-between" style={{minWidth:'1180px'}}>
                    {
                        Plans.map((plan, index) => (
                            <PlanItem key={index} data={plan} className={plan.className}/>
                        ))
                    }
                </BasicFrame>
                <BasicFrame isCentered={false} className="flex-col" style={{width: '90vw', maxWidth: '1200px', marginTop:'6em'}}>
                    <PlanFeature/>
                    {
                        PlansFeatures.map((feature, index) => (
                            <Fragment key={index}>
                                <Divider style={{backgroundColor: 'rgb(55 65 81)', width: '100%',}}/>
                                <PlanFeatureItem  data={feature}/>
                            </Fragment>
                        ))
                    }
                </BasicFrame>
            </BasicFrame>
            <ContactUs/>
        </GenericFrame>
    );
};

export default PlanView;