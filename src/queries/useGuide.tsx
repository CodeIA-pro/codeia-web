import { useMutation, useQuery } from "@tanstack/react-query";
import { guideProject, guideURLProject, guideVersion, guideVersionProject, updatePrivacy } from "../api/guide";
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

export const useGuidePrivacy = () => {
  const {getSuccess} = useNotification();
  const info = useMutation({
      mutationFn: (data: Privacy) => updatePrivacy(data),
      onSuccess: () => {
        getSuccess('Privacy updated');
      }
    });
  return info;
}