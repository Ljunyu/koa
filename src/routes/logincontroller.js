import root from 'koa-router'
import getsend from '../api/logincontroller'
const rooter=new root()
rooter.prefix('/login')
rooter.post('/forget',getsend.forget)
rooter.post('/login',getsend.login)
rooter.post('/cs',getsend.fanhui)
rooter.post('/redylogin',getsend.redylogin)

export default rooter
