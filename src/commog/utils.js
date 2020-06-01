import {getvalue}from '../config/redisconfig'
const iscode= async (sid,code)=>{
    const redissid=await getvalue(sid)
    if(redissid!=null){
        if(redissid.toLowerCase()===code.toLowerCase()){
            return true
        }
        else{
            console.log(22)
            return false
        }
    }else{
        return false
    }
}
export {
    iscode
}