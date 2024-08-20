import { uploadFiles } from '@/apis/system/FileUpload';
import { useReactMutation } from '@/hooks/use-react-mutation';

function useFilesUploadMutation() {
  return useReactMutation((formData: FormData) => {
    return uploadFiles(formData);
  });
}

export { useFilesUploadMutation };