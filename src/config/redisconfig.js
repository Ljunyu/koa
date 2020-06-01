import redis from 'redis'
const option={
    host:'106.13.53.240',
    port:'15002',
    password:'123456',
    detect_buffers:true,
    retry_strategy: function(options) {
        if (options.error && options.error.code === "ECONNREFUSED") {
          // End reconnecting on a specific error and flush all commands with
          // a individual error
          return new Error("The server refused the connection");
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
          // End reconnecting after a specific timeout and flush all commands
          // with a individual error
          return new Error("Retry time exhausted");
        }
        if (options.attempt > 10) {
          // End reconnecting with built in error
          return undefined;
        }
        // reconnect after
        return Math.min(options.attempt * 100, 3000);
      },
}
const client = redis.createClient(option);
    const { promisify } = require("util");
    const getAsync = promisify(client.get).bind(client);
    const gethvalue = (key) =>{
        return promisify(client.hgetall).bind(client)(key)
    }
    const getvalue=(key)=>{
        return getAsync(key)
    }
    const setvalue=(key,value,time)=>{
        // eslint-disable-next-line valid-typeof
        if(typeof value==='undefined'||typeof value=== '' ||typeof value=== null ){
            return
        }
        if(typeof value==='string'){
            if(time!='undefined'){
                return client.set(key,value,'EX',time)
            }
            else{
                return client.set(key,value)
            }
        }
        // eslint-disable-next-line valid-typeof
        if(typeof value === 'json') {
           Object.keys(value).forEach((item)=>{
               client.hset(key,value,item[value],redis.print)
           })
        }
    }
  export {
    client,
    gethvalue,
    getvalue,
    setvalue
  }