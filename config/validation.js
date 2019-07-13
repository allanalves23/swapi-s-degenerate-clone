module.exports = app => {
    
    const exists = (word, msg) => {

        const _DEFAULTMSG = msg || 'Campo inválido'

        if(typeof word === 'string' && word.trim().length === 0) throw _DEFAULTMSG
        if(Array.isArray(word) && word.length === 0) throw _DEFAULTMSG
        if(!word) throw _DEFAULTMSG
    }

    return {exists}
}