import { findFiles } from '@/apis/system/FileUpload';
import { useReactQuery } from '@/hooks/use-react-query';
import { FileQueryKeys } from './file-query-keys';

function useFindFilesQuery(atchFileGrId?: string) {
  return useReactQuery({
    queryKey: FileQueryKeys.findFiles(atchFileGrId!),
    queryFn: () => {
      return findFiles(atchFileGrId!);
    },
    enabled: Boolean(atchFileGrId),
  });
}

export { useFindFilesQuery };