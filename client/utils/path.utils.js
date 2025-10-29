export function getCurrentPathname(){
    return URL.parse(window.location.href)?.pathname.slice(1)
}