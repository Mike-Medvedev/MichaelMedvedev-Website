export function capitalize(str){
    if(! typeof str === "string") throw new Error("Capitalize Function requires string as input")
    return str.charAt(0).toUpperCase() + str.slice(1)
}