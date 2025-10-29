
function Dialog(){
    const dialog = document.querySelector("dialog");
    return {
        open: () => dialog.showModal(), 
        close: () => dialog.close()
    }
}
const dialog = Dialog()
export default dialog;