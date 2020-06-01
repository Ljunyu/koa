import svgCaptcha from 'svg-captcha'
import {
        // getvalue,
        setvalue
}from '../config/redisconfig'
class PublicController{
   constructor(){ }
   async getCaptcha(ctx){
     const bodys=ctx.request.query
     console.log(bodys)
    const  newCaptcha = svgCaptcha.create({
      size:6,
      noise:2,
      width:150,
      height:50
    });
    console.log(321,bodys.sid,newCaptcha.text)
    //redis保存验证码和超时
    setvalue(bodys.sid,newCaptcha.text,10*60)
    ctx.body={
        code:200,
        data:newCaptcha.data
    }
  }

}
export default new PublicController()