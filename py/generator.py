import unittest

import db

from entities import User

class TestDBMethods(unittest.TestCase):

    def test_insert(self):
        # userid=None, firstname=None, lastname=None, email=None, password=None,
        #                  phoneno=None, platenumber=None, usertype=None, membership=0
        u = User(firstname='xin', lastname='yang',
                 email='yangxin@gmail.com', phoneno='1111111111', password='123', platenumber='A111', usertype='rescuer')
        self.assertTrue(db.signup(u), 'Insertion error')

if __name__ == '__main__':
    unittest.main()

