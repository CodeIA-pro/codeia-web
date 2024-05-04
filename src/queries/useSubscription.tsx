import {useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cancelSubscribe, mySubscription, subscribe } from "../api/subscription";
import { PlanItems } from "../interfaces/plan/plan-item.interface";
import Plans from "../utils/plans.utilis";
import { Code } from "../interfaces/subscription/subscription.interface";
import { useNotification } from "../hooks/useNotification";
import { transformDate } from "../utils/filtered";

export const useSubscription = () => {
    const info = useQuery({
        queryKey: ['subscription'],
        queryFn: () => mySubscription(),
        select: (data) => {
            const plan = Plans.find((plan: PlanItems) => plan.id === data.id_plan);
            if(plan){
                return {...data,
                    status: true,
                    due_date: transformDate(data.due_date),
                    plan_title: plan.plan_title,
                    subtitle: plan.subtitle,
                    className: plan.className
                 };
            }
            if(data && !data.status && data.message === 'No subscription found'){
                data.plan_title = Plans[0].plan_title;
                data.subtitle = Plans[0].subtitle;
                data.className = Plans[0].className;
            }
            return data;
        },
      });
    return info;
}

export const useSubscribe = () => {
    const queryClient = useQueryClient();
    const {getSuccess, getError} = useNotification();
    const info = useMutation({
        mutationFn: (data: Code) => subscribe(data),
        onSuccess: (data) => {
            if(data &&data.status === 'error' && data?.message){
                getError(data?.message);
            }else if(data && data.status === 'success'){
                getSuccess('Subscription successful');
                queryClient.resetQueries(['subscription']);
            }
        },
        onError: () => {
            getError('Error in subscription');
        }
      });
    return info;
  }

  export const useCancelSubscribe = () => {
    const queryClient = useQueryClient();
    const {getSuccess, getError} = useNotification();
    const info = useMutation({
        mutationFn: () => cancelSubscribe(),
        onSuccess: (data) => {
            if(data &&data.status === 'error' && data?.message){
                getError(data?.message);
            }else if(data && data.status === 'success'){
                getSuccess('Cancel subscription successful');
                queryClient.resetQueries(['subscription']);
            }
        },
        onError: () => {
            getError('Error in subscription');
        }
      });
    return info;
  }