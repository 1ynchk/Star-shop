
export const GetUID = () => {
    const cookies = document.cookie.split('; ')
    for (let i in cookies) {
        let [key, value] = cookies[i].split('=')
        
        if (key == 'UID') {
            return +value
        }
    }
}