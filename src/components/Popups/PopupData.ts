import { DialogFormConfig } from "../hooks/useDialogForm";

export interface FormPopupConfig {
    title: string;
    dialogContent: (dialogFormConfig: DialogFormConfig) => React.ReactNode;
    handleSubmit: (file: File | null, text: string) => void;

    required?: boolean;
}

export interface CommonPopupConfig {
    dialogTitle?: string;
    dialogContent?: React.ReactNode;
    dialogActions?: (dismiss: () => void) => React.ReactNode;
}
export type PopupConfig = FormPopupConfig | CommonPopupConfig;

export const isCommonPopupConfig = (
    config: PopupConfig
): config is CommonPopupConfig =>
    (config as FormPopupConfig).handleSubmit === undefined;
