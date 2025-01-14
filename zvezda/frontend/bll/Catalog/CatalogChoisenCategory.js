
export const ChoisenCategory = (param, categories) => {
    for (let i in categories) {
        if (categories[i].slug == param) {
            let obj = categories[i]
            return obj 
        }
    }
}