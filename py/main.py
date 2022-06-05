from flask import Flask, jsonify, request
import db
from entities import User, Order
import json


app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False


@app.route("/", methods=["GET"])
def test():
    response = jsonify({"test": "Hello World"})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route("/api/signup", methods=["POST"])
def signup():
    firstname = request.form.get('firstname')
    lastname = request.form.get('lastname')
    email = request.form.get('email')
    password = request.form.get('password')
    phoneno = request.form.get('phoneno')
    platenumber = request.form.get('platenumber')
    usertype = request.form.get('usertype')

    # if phonenumber
    phoneno_exist = db.select_user_by_phone(phoneno)

    res_d = {}
    if phoneno_exist:
        res_d['code'] = 200
        res_d['data'] = []
        res_d['success'] = False
        res_d['msg'] = 'Phone number exists.'
    else:
        user = User(firstname=firstname, lastname=lastname, email=email,
                    password=password, phoneno=phoneno, platenumber=platenumber, usertype=usertype)
        res = db.signup(user)

        if res:
            res_d['code'] = 200
            res_d['data'] = {"userid": res}
            res_d['success'] = True
            res_d['msg'] = ''
        else:
            res_d['code'] = 200
            res_d['data'] = []
            res_d['success'] = False
            res_d['msg'] = 'Database connection error'

    response = jsonify(res_d)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route("/api/updateprofile", methods=["POST"])
def update_profile():
    userid = int(request.form.get('userid'))
    firstname = request.form.get('firstname')
    lastname = request.form.get('lastname')
    email = request.form.get('email')
    phoneno = request.form.get('phoneno')
    platenumber = request.form.get('platenumber')

    # if phonenumber

    user_id = db.select_user_by_phone(phoneno)

    print('userid', userid)
    print('user_id', user_id)
    print('userid != user_id', bool(userid != user_id))
    print('user_id boolean:', bool(user_id))

    res_d = {}
    if user_id and userid != user_id:
        res_d['code'] = 200
        res_d['data'] = []
        res_d['success'] = False
        res_d['msg'] = 'Phone number exists.'
    else:
        user = User(userid=userid, firstname=firstname, lastname=lastname, email=email,
                     phoneno=phoneno, platenumber=platenumber)
        print(111)
        res = db.update_profile(user)
        print(22)
        if res:
            res_d['code'] = 200
            res_d['data'] = {}
            res_d['success'] = True
            res_d['msg'] = ''
        else:
            res_d['code'] = 200
            res_d['data'] = []
            res_d['success'] = False
            res_d['msg'] = 'You have not updated any thing.'

    response = jsonify(res_d)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route("/api/login", methods=["POST"])
def login():
    userid = request.form.get('userid')
    pwd = request.form.get('password')

    phoneno = request.form.get('phoneno')
    if not phoneno:
        user = User(userid=int(userid), password=pwd)
        res = db.login(user)
    else:
        user = User(phoneno=phoneno)
        res = db.login_by_phoneno(user)

    res_d = {}
    if res:
        res_d['code'] = 200
        res_d['data'] = {"usertype": res}
        res_d['success'] = True
        res_d['msg'] = ''
    else:
        res_d['code'] = 200
        res_d['data'] = []
        res_d['success'] = False
        res_d['msg'] = 'No such user'

    response = jsonify(res_d)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route("/api/resetpassword", methods=["POST"])
def reset_password():
    phoneno = request.form.get('phoneno')
    new_pwd = request.form.get('new_password')

    user = User(phoneno=phoneno, password=new_pwd)
    res = db.reset_password(user)

    res_d = {}
    if res:
        res_d['code'] = 200
        res_d['data'] = {}
        res_d['success'] = True
        res_d['msg'] = ''
    else:
        res_d['code'] = 200
        res_d['data'] = []
        res_d['success'] = False
        res_d['msg'] = 'Phone number does not exist.'

    response = jsonify(res_d)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route("/api/registermembership", methods=["POST"])
def registermembership():
    userid = request.form.get('userid')

    user = User(userid=int(userid), membership=1)
    res = db.register_membership(user)

    res_d = {}
    if res:
        res_d['code'] = 200
        res_d['data'] = {}
        res_d['success'] = True
        res_d['msg'] = ''
    else:
        res_d['code'] = 200
        res_d['data'] = []
        res_d['success'] = False
        res_d['msg'] = 'UserID does not exit or the user is already a member.'

    response = jsonify(res_d)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response



@app.route("/api/getprofile", methods=["POST"])
def get_profile():
    userid = request.form.get('userid')

    user = User(userid=int(userid))
    row = db.get_profile(user)

    res_d = {}
    if row:
        res_user = {'userid': row[0], 'firstname': row[1], 'lastname': row[2], 'email': row[3],
                    'password': row[4], 'phoneno': row[5], 'platenumber': row[6], 'usertype': row[7],
                     'membership': row[8]}


        res_d['code'] = 200
        res_d['data'] = res_user
        res_d['success'] = True
        res_d['msg'] = ''
    else:
        res_d['code'] = 200
        res_d['data'] = []
        res_d['success'] = False
        res_d['msg'] = 'UserID does not exit.'

    response = jsonify(res_d)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route("/api/submitorder", methods=["POST"])
def submit_order():
    phoneno = request.form.get('phoneno')
    drivername = request.form.get('drivername')
    location = request.form.get('location')
    longitude = request.form.get('longitude')
    latitude = request.form.get('latitude')
    problems = request.form.get('problems')
    otherproblem = request.form.get('otherproblem')
    regonumber = request.form.get('regonumber')
    otherinfo = request.form.get('otherinfo')

    otherproblem = otherproblem if otherproblem is not None else ''
    regonumber = regonumber if regonumber is not None else ''
    otherinfo = otherinfo if otherinfo is not None else ''

    o = Order(phoneno=phoneno, drivername=drivername, location=location, longitude=longitude,
              latitude=latitude, problems=problems, otherproblem=otherproblem, regonumber=regonumber,
              otherinfo= otherinfo)

    res = db.submit_order(o)

    res_d = {}

    if res:
        res_d['code'] = 200
        res_d['data'] = {"orderid": res}
        res_d['success'] = True
        res_d['msg'] = ''
    else:
        res_d['code'] = 200
        res_d['data'] = []
        res_d['success'] = False
        res_d['msg'] = 'Database connection error'

    response = jsonify(res_d)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route("/api/getorderinfo", methods=["POST"])
def get_orderinfo():
    row = db.get_orderinfo()

    res_d = {}
    if row:
        res_o = {'orderid': row[0], 'phoneno': row[1], 'status': row[2], 'drivername': row[3],
                    'location': row[4], 'longitude': row[5], 'latitude': row[6], 'price': row[7],
                    'problems': row[8]}

        res_d['code'] = 200
        res_d['data'] = res_o
        res_d['success'] = True
        res_d['msg'] = ''
    else:
        res_d['code'] = 200
        res_d['data'] = []
        res_d['success'] = False
        res_d['msg'] = 'No available order.'

    response = jsonify(res_d)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route("/api/changeorderstatus", methods=["POST"])
def change_order_status():
    orderid = request.form.get('orderid')
    status = request.form.get('status')
    price = request.form.get('price')

    if price:
        o = Order(orderid=int(orderid), status=int(status), price=float(price))
        res = db.change_order_status(o, True)
    else:
        o = Order(orderid=int(orderid), status=int(status))
        res = db.change_order_status(o, False)

    res_d = {}
    if res:
        res_d['code'] = 200
        res_d['data'] = {}
        res_d['success'] = True
        res_d['msg'] = ''
    else:
        res_d['code'] = 200
        res_d['data'] = []
        res_d['success'] = False
        res_d['msg'] = 'Database connection error'

    response = jsonify(res_d)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if __name__ == '__main__':
    print("Hello World")

    app.run()