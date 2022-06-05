
# Google Map API key
AIzaSyAfrTnaJLiQX7oUYSCysaXPRE6mq_XzCqY

# Prototype 
https://js.design/f/yix8V1?p=rE5iyjq_Pp

# Html Address
```
http://101.200.142.192:5000
```

# Notes
```
  10001 是未登录， 10002 指代其他含义，这个后面有需要再定，
  // data: 返回数据内容 对象或者数组
  // success： true表示没问题，false表示前端传值有问题或者其他问题，为false 时，要返回 msg, 我根据这个字段提示
  // msg: 表示错误提示内容
```

```
const res = {
  code: 200,
  data: [],
  success: true,
  msg: '',
}
```

# All APIs
## Sign Up
- **URL:** 101.200.142.192:5001/api/signup
- **Method:** POST
- **Parameters:** 
  ```
  name: firstname, type: string
  name: lastname, type: string
  name: email, type:string
  name: password, type:string
  name: phoneno, type:string
  name: platenumber, type:string
  name: usertype, type:string
  ```
- **Return:**
  ```json
  {
    "code": 200,
    "data": {
        "userid": 100000
    },
    "msg": "",
    "success": true
  }
  ```


## Login
- **URL:** 101.200.142.192:5001/api/login
- **Method:** POST
- **Parameters with userid and password(Option 1 ):** 
  ```
  name: userid, type: int
  name: password, type: string
  ```
- **Parameters with phoneno(Option 2 ):** 
  ```
  name: phoneno, type: string
  ```
- **Return:**
  ```json
   {
    "code": 200,
    "data": {
        "usertype": "rescuer"
    },
    "msg": "",
    "success": true
   }
  ```

## Reset Password
- **URL:** 101.200.142.192:5001/api/resetpassword
- **Method:** POST
- **Parameters:**
  ```
  name: phoneno, type: string
  name: new_password, type: string
  ```
- **Return:**
  ```json
   {
    "code": 200,
    "data": {},
    "msg": "",
    "success": true
   }
  ```
 
## Register Membership
- **URL:** 101.200.142.192:5001/api/registermembership
- **Method:** POST
- **Parameters:**
  ```
  name: userid, type: int
  ```
- **Return:**
  ```json
   {
    "code": 200,
    "data": {},
    "msg": "",
    "success": true
   }
  ```
  
## Query Profile
- **URL:** 101.200.142.192:5001/api/getprofile
- **Method:** POST
- **Parameters:**
  ```
  name: userid, type: int
  ```
- **Return:**
  ```json
   {
    "code": 200,
    "data": {
        "email": "guimin@gmail.com",
        "firstname": "min",
        "lastname": "gui",
        "membership": 1, // membership 1, non-membership:0
        "password": "123",
        "phoneno": "0298765433",
        "platenumber": "A222",
        "userid": 100004,
        "usertype": "rescuer"
    },
    "msg": "",
    "success": true
  }
  ```
  
## Update Profile
- **URL:** 101.200.142.192:5001/api/updateprofile
- **Method:** POST
- **Parameters:**
  ```
  name: userid, type: int
  name: firstname, type: string
  name: lastname, type: string
  name: email, type: string
  name: phoneno, type: string
  name: platenumber, type: string
  ```
- **Return:**
  ```json
  {
      "code": 200,
      "data": {},
      "msg": "",
      "success": true
  }
  ```
  
##  Submit Order
- **URL:** 101.200.142.192:5001/api/submitorder
- **Method:** POST
- **Parameters:** 
  ```
  name: phoneno, type: string
  name: drivername, type: string, comment: [firstname lastname]
  name: location, type:string
  name: longitude, type:string
  name: latitude, type:string
  name: problems, type:string, comment: delimiter is ',' between two problem, i.e flat tyres, towing
  name: otherproblem, type:string, comment: optional
  name: regonumber, type:string, comment: optional
  name: otherinfo, type:string, comment: optional
  ```
- **Return:**
  ```json
  {
    "code": 200,
    "data": {
        "orderid": 100000
    },
    "msg": "",
    "success": true
  }
  ```
  
 ##  Order Information
- **URL:** 101.200.142.192:5001/api/getorderinfo
- **Method:** POST
- **Parameters:** 
  ```
  
  ```
- **Return:**
```json
{
    "code": 200,
    "data": {
        "drivername": "min gui",
        "latitude": "13.1121211",
        "location": "university of wollongong",
        "longitude": "12.1222",
        "orderid": 100003,
        "phoneno": "0298765435",
        "price": null,
        "problems": "flat tyres, towing",
        "status": 0 # 0: submitted, 1:received, 2: completed
    },
    "msg": "",
    "success": true
}
```

 ##  Order Information
- **URL:** 101.200.142.192:5001/api/changeorderstatus
- **Method:** POST
- **Parameters:** 
  ```
  name: orderid, type: int
  name: status, type: int, comment: 0: submitted, 1:received, 2: completed 
  name: price, type:double, comment: optional
  ```
- **Return:**
```json
{
    "code": 200,
    "data": {},
    "msg": "",
    "success": true
}
```



