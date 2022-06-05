import pymysql

class Order:
    def __init__(self, orderid=None, status=0, phoneno=None, drivername=None, location=None,
                 longitude=None, latitude=None, price=0.0, problems=None, otherproblem=None,
                 regonumber=None, otherinfo=None):

        self.orderid = orderid
        self.status = status  # 0: submitted, 1:received, 2: completed
        self.phoneno = phoneno
        self.drivername = drivername
        self.location = location
        self.longitude = longitude
        self.latitude = latitude
        self.price = price
        self.problems = problems
        self.otherproblem = otherproblem
        self.regonumber = regonumber
        self.otherinfo = otherinfo


class User(object):
    def __init__(self, userid=None, firstname=None, lastname=None, email=None, password=None,
                 phoneno=None, platenumber=None, usertype=None, membership=0):
        self.userid = userid
        self.firstname = firstname
        self.lastname = lastname
        self.email = email
        self.password = password
        self.phoneno = phoneno
        self.platenumber = platenumber
        self.usertype = usertype
        self.membership = membership



class MySql:
    def __init__(self):
        self.database_name = 'roadassistance'
        self.user = 'root'
        self.password = 'root'

    def __enter__(self):
        try:
            self.conn = pymysql.connect(host='101.200.142.192', port=3306, user=self.user,
                                        password=self.password, database=self.database_name, charset='utf8')
        except Exception as e:
            self.flag = False
        else:
            self.flag = True

        return self.conn.cursor()

    def __exit__(self, exc_type, exc_val, exc_tb):
        if not self.flag:
            return

        if exc_type is not None:
            print(exc_type, exc_val)
            self.conn.rollback()
        else:
            self.conn.commit()

        self.conn.cursor().close()
        self.conn.close()

        return True




