const express=require('express');
const zod=require('zod');
const jwt=require('jsonwebtoken');
const jwt_password="123@abc"
const app=express();
app.use(express.json());
const mail_schema=zod.string().email();
const password_schema=zod.string().min(6);
function signjwt(username,password){
    const mail_res=mail_schema.safeParse(username);
    const password_res=password_schema.safeParse(password);
    if(!mail_res.success||!password_res.success)
        return null;
    var signature=jwt.sign(username,jwt_password);
    return signature;
}
const token=signjwt("dheerajm@gmail.com","123@abc");
console.log(token);
function decode(token){
    var payload=jwt.decode(token);
    if(!payload)
        return payload;
    return true;
}
console.log(decode(token));
function verifyToken(token){
    let flag=true;
    try{
        jwt.verify(token,jwt_password);
    }
    catch(err){
        flag=false;
    }
    return flag;
}
console.log(verifyToken(token));
//app.listen(3000);