import { useState } from 'react';
import { router } from '@inertiajs/react';
import toast from 'react-hot-toast';

type DeleteOptions = {
  preserveState?: boolean;
};

export function useDeleteWithToast() {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteItem = (
    routeName: string,
    params: any,
    successMessage = 'Data berhasil dihapus!',
    errorMessage = 'Terjadi kesalahan saat menghapus data.',
    options: DeleteOptions = { preserveState: true }
  ) => {
    setIsDeleting(true);
    router.delete(route(routeName, params), {
      preserveState: options.preserveState,
      onSuccess: () => {
        toast.success(successMessage);
        setIsDeleting(false);
      },
      onError: () => {
        toast.error(errorMessage);
        setIsDeleting(false);
      },
    });
  };

  return { deleteItem, isDeleting };
}