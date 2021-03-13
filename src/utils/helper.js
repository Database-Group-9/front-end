function checknull(avg){
    if (avg !== null){
        const a = avg.slice(0,4) 
        return a + "/ 5.00"
    }
    return "not rated"
}

module.exports ={ 
    checknull,
}