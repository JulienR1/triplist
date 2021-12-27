export type ModalId = {};
export type ModalCallback = () => void | Promise<void>;

export interface IModal {
    id: ModalId;
    content: IModalContent;
    cancel: IModalControl;
    confirm?: IModalControl;
}

export interface IModalContent {
    title: string;
    message: string;
}

export interface IModalControl {
    label: string;
    callback: ModalCallback;
}
