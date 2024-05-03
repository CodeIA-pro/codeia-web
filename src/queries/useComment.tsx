import { useMutation, useQuery } from "@tanstack/react-query";

import { comments, createComment } from "../api/comment";
import { useNotification } from "../hooks/useNotification";
import { CommentRequest } from "../interfaces/comment/comment.interface";

export const useComments = () => {
    const info = useQuery({
        queryKey: ['comments'],
        queryFn: () => comments(),
      });
    return info;
}

export const useCreateCommets = () => {
  const {getSuccess, getError} = useNotification();
  const info = useMutation({
      mutationFn:(data: CommentRequest) => createComment(data),
      onSuccess: () => {
          getSuccess('Submitted successfully');
      },
      onError: () => {
          getError('Error sending');
      }
  });
  return info;
}