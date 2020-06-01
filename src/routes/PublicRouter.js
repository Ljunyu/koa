import koaRouter from 'koa-router'
import PublicController from '../api/PublicController' 
import ljyController from '../api/ljyController' 
const Rourer=new koaRouter()
Rourer.get('/getCaptcha', PublicController.getCaptcha)
Rourer.get('/api/ljy', ljyController.ljy)
export default Rourer
