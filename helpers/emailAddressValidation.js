const emailcheck = (email)=>{
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
        return emailcheck
}
module.exports = emailcheck