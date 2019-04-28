let production = {
  runtime: 'production',
  url: process.env.DATABASE_URL,
  cache: {
      type: "redis",
      options: {
          url: process.env.REDISCLOUD_URL
      }
  }
}
let development =  {
    runtime:'development',
    host: "localhost",
    port: 5432,
    username: "lambda",
    password: "lambda",
    database: "lambda"
};
let out;
if(process.env.HEROKU === "true"){
  out = production;
}else{
  out = development;
}
console.log(out);
export const DB_CONN = out;
