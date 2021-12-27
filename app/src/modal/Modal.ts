import type { IModalContent, IModalControl } from "./IModal";
import { modalStore } from "./ModalStore";

export class Modal {
    public static confirm = (content: IModalContent, cancel: IModalControl, confirm: IModalControl) => {
        modalStore.update((storedModals) => {
            storedModals.push({ id: {}, content, cancel, confirm });
            return storedModals;
        });
    };
}
