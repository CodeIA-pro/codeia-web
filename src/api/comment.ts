import axios from "axios";
import { API_URL } from "../services";
import { getAuthorizationHeaders } from "../utils/authorization";
import { CommentRequest, Comments } from "../interfaces/comment/comment.interface";

  export const comments = async (): Promise<Comments[]> => {
    const headers = getAuthorizationHeaders();
    const response = await axios.get(API_URL + 'typecomment/list/', { headers });
    return response.data;
  };

  export const createComment = async (data: CommentRequest): Promise<Comments> => {
    const headers = getAuthorizationHeaders();
    const response = await axios.post(API_URL + 'comment/create/type/'+ data.type_id +'/', data ,{ headers });
    return response.data;
  };
