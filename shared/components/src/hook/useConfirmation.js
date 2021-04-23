import { useModuleTrans } from '../provider';
import { confirmation } from '../dialog';

function useConfirmation() {
  const trans = useModuleTrans();
  function deleteConfirmation(options = {}) {
    confirmation({
      title: trans(`common:dialog.confirmation.title`),
      message: trans(`common:dialog.confirmation.delete`),
      buttons: [
        trans(`common:dialog.action.yes`),
        trans(`common:dialog.action.no`),
      ],
      ...options,
    });
  }
  return {
    deleteConfirmation,
  };
}

export default useConfirmation;
