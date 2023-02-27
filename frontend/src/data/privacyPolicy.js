import privacyPolicyFile from 'assets/html/PrivacyPolicy.txt'

export const privacyPolicy = () => {
    return new Promise((resolve, reject)=>{
        fetch(privacyPolicyFile).then(r => r.text()).then(detail => {
            resolve(detail)
        })
    })
}