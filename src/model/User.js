import statement from './moogo'
const inserton=async (option)=>{
    if(option!=''){
        const data = new statement(option)
        const reslut=await data.save().then(()=>{
            console.log('成功')
        })
        return reslut
    }
  
}
const findon=(option)=>{
    return statement.findOne(option)
}
const updataon=async (opton)=>{
    const reslut=await statement.updateOne(opton)
    return reslut
}
const deliton=async (opton)=>{
    const reslut=await statement.deleteOne(opton)
    return reslut
}
export default{
    inserton,
    findon,
    updataon,
    deliton
}