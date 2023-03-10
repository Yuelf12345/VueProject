export default function cloneDeep(obj){
    let newObj;
    if(Array.isArray(obj)){
        newObj = [];
        obj.forEach(item=>{
            newObj.push(obj(item));
        })
    }else if(typeof obj === 'object'){
        newObj = {};
        for(let key in obj){
            if(obj.hasOwnProperty(key)){
                if(typeof key === 'object'){
                    newObj = cloneDeep(obj[key])
                }else{
                    newObj[key] = obj[key]
                }
            }
        }
    }
    else if((typeof obj).match(/^(string|number|boolean)/)){    
        return newObj
    }
    return newObj;
}