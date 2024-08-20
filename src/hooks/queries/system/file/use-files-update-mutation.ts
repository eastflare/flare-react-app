import { modifyFiles } from '@/apis/system/FileUpload';
import { useReactMutation } from '@/hooks/use-react-mutation';
import { FileInfo } from '@/models/system/FileInfo';

function useFilesUpdateMutation() {
  return useReactMutation((files: FileInfo[]) => {
    return modifyFiles(files);
  });
}

export { useFilesUpdateMutation };