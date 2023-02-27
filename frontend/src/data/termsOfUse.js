import termsOfUseFile from 'assets/html/TermsOfUse.txt'

export const termsOfUse = () => {
    return new Promise((resolve, reject)=>{
        fetch(termsOfUseFile).then(r => r.text()).then(detail => {
            resolve(detail)
        })
    })
}