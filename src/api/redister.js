import { setvalue,gethvalue } from "../config/redisconfig"
setvalue('imooic',{
    value:'1',
    keys:'2'
})
gethvalue('imooic').then((res)=>{
    console.log(res)
})