import mongoose from '../config/DB_URL'
 const schmon=mongoose.Schema({
     'username':{type:String},
     'name':{type:String},
     'emali':{type:String},
     'password':{type:String},
     'ages':{type:Number},
     'created':{type:Date}
 })
 const testmodel=mongoose.model('users',schmon)
 export default testmodel