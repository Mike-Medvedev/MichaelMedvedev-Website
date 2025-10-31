
import DialogForm from "./dialog-form.js"
import registry from "../ComponentRegistry.js"
function Dialog(){
    const dialog = document.querySelector("dialog");
    const dialogForm = DialogForm()
    dialogForm.mount()
    registry.addMountedComponent(dialogForm)
    return {
        open: () => dialog.showModal(), 
        close: () => dialog.close()
    }
}
const dialog = Dialog();
export default dialog;