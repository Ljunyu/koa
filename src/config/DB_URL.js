 
import mongoose from 'mongoose'
import DB_URL from '../config/index'
mongoose.connect(DB_URL.DB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
mongoose.connection.on('connected',()=>{
    console.log('mongo连接成功')
})
mongoose.connection.on('error',()=>{
    console.log('失败')
})
export default mongoose