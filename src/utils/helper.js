function checknull(avg){
    if (avg !== null){
        return avg.slice(0,4)
    }
    return 0
}

module.exports ={ 
    checknull,
}