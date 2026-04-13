/**
 * SubmitDialog - Confirmation dialog for form submission.
 *
 * Native components used: DialogNative
 */
import { DialogNative, ButtonNative, ButtonVariant } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const SubmitDialog = ({ isOpen, onClose, onConfirm }: Props): JSX.Element => (
  <DialogNative
    isOpen={isOpen}
    testId="all-comp-dialog"
    title={FM('forms.native.allComponents.dialog.title')}
    onClose={onClose}
  >
    <div className="space-y-4">
      <p className="text-sm text-text-secondary">
        {FM('forms.native.allComponents.dialog.message')}
      </p>
      <div className="flex justify-end gap-2">
        <ButtonNative
          testId="all-comp-dialog-cancel"
          variant={ButtonVariant.Outline}
          onClick={onClose}
        >
          {FM('common.cancel')}
        </ButtonNative>
        <ButtonNative
          testId="all-comp-dialog-confirm"
          variant={ButtonVariant.Primary}
          onClick={onConfirm}
        >
          {FM('forms.native.allComponents.dialog.confirm')}
        </ButtonNative>
      </div>
    </div>
  </DialogNative>
);
