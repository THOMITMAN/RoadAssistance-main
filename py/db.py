from entities import User, MySql
import pymysql


def signup(user):
    """
    usertype: rescuer, driver
    """
    with MySql() as cursor:
        if cursor is not None:
            sql = 'insert into user(firstname, lastname, email, password, phoneno, platenumber, usertype, membership) ' \
                  'values("%s", "%s", "%s", "%s", "%s", "%s", "%s", %d) ' % (user.firstname, user.lastname, user.email, user.password, user.phoneno, user.platenumber, user.usertype, user.membership)

            row_count = cursor.execute(sql)

            if row_count >= 1:
                return cursor.lastrowid
            else:
                return False


def login(user):
    with MySql() as cursor:
        if cursor is not None:
            sql = 'select usertype from user where userid=%d and password="%s"' % (user.userid, user.password)
            rowcount = cursor.execute(sql)
            usertype = cursor.fetchone()[0]
            if rowcount >= 1:
                return usertype
            else:
                return False

def login_by_phoneno(user):
    with MySql() as cursor:
        if cursor is not None:
            sql = 'select usertype from user where phoneno="%s"' % (user.phoneno)
            rowcount = cursor.execute(sql)
            usertype = cursor.fetchone()[0]
            if rowcount >= 1:
                return usertype
            else:
                return False


def reset_password(user):
    with MySql() as cursor:
        if cursor is not None:
            sql = 'update user set password="%s" where phoneno="%s"' % (user.password, user.phoneno)
            rowcount = cursor.execute(sql)
            if rowcount >= 1:
                return True
            else:
                return False


def update_profile(user):
    with MySql() as cursor:
        if cursor is not None:
            sql = 'update user set firstname="%s", lastname="%s", email="%s", phoneno="%s", platenumber="%s"' \
                  ' where userid=%d' % (user.firstname, user.lastname, user.email, user.phoneno, user.platenumber, user.userid)
            rowcount = cursor.execute(sql)
            if rowcount >= 1:
                return True
            else:
                return False


def register_membership(user):
    with MySql() as cursor:
        if cursor is not None:
            sql = 'update user set membership=%d where userid=%d' % (user.membership, user.userid)
            rowcount = cursor.execute(sql)
            if rowcount >= 1:
                return True
            else:
                return False


def get_profile(user):
    with MySql() as cursor:
        if cursor is not None:
            sql = 'select * from user where userid=%d' % user.userid
            rowcount = cursor.execute(sql)
            row = cursor.fetchone()
            if rowcount >= 1:
                return row
            else:
                return False


def submit_order(o):
    with MySql() as cursor:
        if cursor is not None:
            sql = 'insert into orders(phoneno, drivername, location, longitude, ' \
                  'latitude, problems, otherproblem, regonumber, otherinfo) ' \
                  'values("%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s")' % (o.phoneno,
                   o.drivername, o.location, o.longitude, o.latitude, o.problems, o.otherproblem,
                   o.regonumber, o.otherinfo)

            row_count = cursor.execute(sql)

            if row_count >= 1:
                return cursor.lastrowid
            else:
                return False


def get_orderinfo():
    with MySql() as cursor:
        if cursor is not None:
            sql = 'select * from orders order by orderid DESC'
            rowcount = cursor.execute(sql)
            row = cursor.fetchone()
            if rowcount >= 1:
                return row
            else:
                return False


def change_order_status(o, with_price=False):
    with MySql() as cursor:
        if cursor is not None:
            if with_price:
                sql = 'update orders set status=%d, price=%d where orderid=%d' % (o.status, o.price, o.orderid)
            else:
                sql = 'update orders set status=%d where orderid=%d' % (o.status, o.orderid)

            rowcount = cursor.execute(sql)
            if rowcount >= 1:
                return True
            else:
                return False


def select_user_by_phone(phoneno):
    with MySql() as cursor:
        if cursor is not None:
            sql = 'select userid from user where phoneno="%s"' % (phoneno)
            rowcount = cursor.execute(sql)
            row = cursor.fetchone()
            if rowcount >= 1:
                return row[0]
            else:
                return False


if __name__ == '__main__':
    # u = User('xin', 'yang', 'yangxin@gmail.com', '+61111111111', '123', 'A111', 'rescuer')
    # signup(u)

    u = User()
    u.userid = 100000
    u.password = '123'

    print(login(u))

