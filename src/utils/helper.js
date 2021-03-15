function checknull(avg){
    if (avg !== null){
        const a = avg.toString().slice(0,4) 
        return a + "/ 5.00"
    }
    return "not rated"
}

function updatePage(str,i){
    const arr = str.split('&')
    arr.pop()
    arr.push(`page=${i}`)
    const returnq = arr.join('&')
    return returnq
}

module.exports ={ 
    checknull,
    updatePage,
}