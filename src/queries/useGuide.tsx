import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPrivacy, guideProject, guideURLProject, guideVersion, guideVersionProject, updatePrivacy } from "../api/guide";
import { sortArray } from "../utils/filtered";
import { useNotification } from "../hooks/useNotification";
import { Privacy } from "../interfaces/guide/guide.interface";

export const useGuideProject = (project: string, owner: string) => {
    const info = useQuery({
        queryKey: ['guide-project', project, owner],
        refetchInterval: 35000,
        queryFn: () => guideProject(project, owner),
        select: (data) => {
            const { assets } = data;
            const sortedAssets = sortArray(assets);
            return { ...data, assets: sortedAssets };
          },
      });
    return info;
}

export const useGuideVersion = (id: number) => {
  const {getSuccess, getWarning} = useNotification();
    const info = useQuery({
        queryKey: ['guide-version', id],
        queryFn: () => guideVersion(id),
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
          if (data.status) getSuccess('You have the latest commit.');
          else getWarning('New commit detected');
        },
      });
    return info;
}

export const useGuideVersionProject = (owner: string, project: string, version: string,) => {
    const info = useQuery({
        queryKey: ['guide-version-project', version, project, owner],
        queryFn: () => guideVersionProject(version, project, owner),
      });
    return info;
}

export const useGuideVersionURL = (url: string,) => {
  const info = useQuery({
      queryKey: ['guide-version-url', url],
      queryFn: () => guideURLProject(url),
    });
  return info;
}

export const useGuidePrivacyStatus = (project_id: number, asset_id: number) => {
  const info = useQuery({
      queryKey: ['guide-privacy', project_id, asset_id],
      queryFn: () => getPrivacy(project_id, asset_id),
    });
  return info;
}

export const useGuidePrivacy = () => {
  const queryClient = useQueryClient();
  const {getSuccess} = useNotification();
  const info = useMutation({
      mutationFn: (data: Privacy) => updatePrivacy(data),
      onSuccess: (data) => {
        getSuccess('Privacy updated');
        queryClient.resetQueries(['guide-privacy', data.project_id, data.asset_id]);
      }
    });
  return info;
}