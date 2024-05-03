import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { twoFactorChange, updateUser, user } from "../api/userApi";
import { User } from "../interfaces/user/user.interface";
import { useAuthStore } from "../store";
import { useNotification } from "../hooks/useNotification";

export const useUser = () => {
    const info = useQuery({
        queryKey: ['user'],
        queryFn:() => user(),
        });
    return info;
}

export const useUpdateUser = () => {
    const {getSuccess, getError} = useNotification();
    const queryClient = useQueryClient();
    const { updateName, user } = useAuthStore();
    const info = useMutation({
        mutationFn:(data: User) => updateUser(data),
        onSuccess: (data) => {
            if(data && data.status && data.message){
                getError(data.message);
            }else{
                if (user && data.full_name) updateName(user, data.full_name);
                queryClient.resetQueries(['user']);
                getSuccess('Profile updated');
            }
        }
        });
    return info;
}

export const useTwoFactorChange = () => {
    const {getSuccess} = useNotification();
    const queryClient = useQueryClient();
    const info = useMutation({
        mutationFn:() => twoFactorChange(),
        onSuccess: () => {
            queryClient.resetQueries(['user']);
            getSuccess('Two factor authentication updated');
        } 
    });
    return info;
}