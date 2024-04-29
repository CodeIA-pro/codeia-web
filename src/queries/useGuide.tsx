import { useQuery } from "@tanstack/react-query";
import { guideProject, guideVersion } from "../api/guide";
import { sortArray } from "../utils/filtered";
import { useNotification } from "../hooks/useNotification";

export const useGuideProject = (project: string, owner: string) => {
    const info = useQuery({
        queryKey: ['guide-project', project, owner],
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