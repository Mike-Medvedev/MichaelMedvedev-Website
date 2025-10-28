export default class StringUtils{
    static compare(str1, str2){
        return StringUtils.clean(s1) === StringUtils.clean(s2)
    }
    static clean(str){
        return str.toLowerCase().trim()
    }
}