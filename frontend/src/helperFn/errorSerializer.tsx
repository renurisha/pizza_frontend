export const errorSerializer = (data) => {
    let error = objectToString(data?.error?.data||data?.data)
    return error;
}

const objectToString = (obj) => {
    let returnString = 'Something went wrong'
    if(obj?.detail){
        if(Array.isArray(obj?.detail)){
            obj.detail.forEach((ele) => {
                if(!Array.isArray(ele)){
                    if(ele?.loc && ele.loc[1] && ele?.msg){
                        returnString = `${ele.loc[1].split('_').join(' ')} - ${ele?.msg}`
                    }
                }
            })
        }else {
            returnString = JSON.stringify(obj?.detail)
        }
    }
    return returnString
}

