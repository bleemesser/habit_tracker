import requests
import json
import datetime

"""Currently tested: signup, login, csv download, all 3 forms
Need to test: teacher dashboard, student dashboard, teacher routes: edit-student, delete-student
RUN THE BACKEND BEFORE RUNNING THIS SCRIPT"""


def test_signup():
    url = 'http://localhost:5000/auth/signup'
    r = requests.post(url, json={
        'email':'testacc1@test1',
        'password':'testacc1',
        'teacher':'testacc1',
        'blocknum':'1',
        'name':'testacc1'
    })
    # print(json.loads(r.text))
    rdata = json.loads(r.text)
    if rdata['status'] == 'success':
        print('\033[1;32m Signup Test: Success')
    else:
        print('\033[1;31m Signup Test: Failed')
    r = requests.post(url, json={
        'email':'testacc1@test1',
        'password':'testacc1',
        'teacher':'testacc1',
        'blocknum':'1',
        'name':'testacc1'
    })
    # print(json.loads(r.text))
    rdata = json.loads(r.text)
    if rdata['status'] == 'error':
        print('\033[1;32m Signup Test Catches Duplicate: Success')
    else:
        print('\033[1;31m Signup Test Catches Duplicate: Failed')
    
    # test with invalid data
    r = requests.post(url, json={
        'email':'testacc2@test2',
        'password':'testacc2',
        'teacher':'testacc2',
        'blocknum':'1',
        'name':1
    })
    # print(json.loads(r.text))
    rdata = json.loads(r.text)
    if rdata['status'] == 'error':
        print('\033[1;32m Signup Test Catches Invalid Data: Success')
    else:
        print('\033[1;31m Signup Test Catches Invalid Data: Failed')

    # test with missing data
    r = requests.post(url, json={
        'email':'testacc3@test3',
        'password':'testacc3',
        'teacher':'testacc3',
        'blocknum':'1',
    })
    # print(json.loads(r.text))
    rdata = json.loads(r.text)
    if rdata['status'] == 'error':
        print('\033[1;32m Signup Test Catches Missing Data: Success')
    else:
        print('\033[1;31m Signup Test Catches Missing Data: Failed')


def test_login():
    url = 'http://localhost:5000/auth/login'
    r = requests.post(url, json={
        'email':'testacc1@test1',
        'password':'testacc1'
    })
    # print(json.loads(r.text))
    rdata = json.loads(r.text)
    if rdata['status'] == 'success':
        print('\033[1;32m Login Test: Success')
    else:
        print('\033[1;31m Login Test: Failed')

    # test with invalid data
    r = requests.post(url, json={
        'email':'testacc1@test1',
        'password':1
    })
    # print(json.loads(r.text))
    rdata = json.loads(r.text)
    if rdata['status'] == 'error':
        print('\033[1;32m Login Test Catches Invalid Data: Success')
    else:
        print('\033[1;31m Login Test Catches Invalid Data: Failed')

    # test with missing data
    r = requests.post(url, json={
        'email':'testacc1@test1'
    })
    # print(json.loads(r.text))
    rdata = json.loads(r.text)
    if rdata['status'] == 'error':
        print('\033[1;32m Login Test Catches Missing Data: Success')
    else:
        print('\033[1;31m Login Test Catches Missing Data: Failed')

    # test with invalid password
    r = requests.post(url, json={
        'email':'testacc1@test1',
        'password':'testacc2'
    })
    # print(json.loads(r.text))
    rdata = json.loads(r.text)
    if rdata['status'] == 'error':
        print('\033[1;32m Login Test Catches Invalid Password: Success')
    else:
        print('\033[1;31m Login Test Catches Invalid Password: Failed')

    # test with invalid email
    r = requests.post(url, json={
        'email':'random gibberish',
        'password':'testacc2'
    })
    # print(json.loads(r.text))
    rdata = json.loads(r.text)
    if rdata['status'] == 'error':
        print('\033[1;32m Login Test Catches Invalid Email: Success')
    else:
        print('\033[1;31m Login Test Catches Invalid Email: Failed')

def test_download():
    url = 'http://localhost:5000/auth/login'
    url2 = 'http://localhost:5000/student/download'
    r = requests.post(url, json={
        'email':'testacc1@test1',
        'password':'testacc1'
    })
    token= json.loads(r.text)['token']

    g = requests.get(url2,headers={'token':token})
    if g.status_code == 200:
        print('\033[1;32m Download Test: Success')
    else:
        print('\033[1;31m Download Test: Failed')

def test_form_submit():
    # log in, create a list of procrastination, sleep, and feelings form names, submit to each url, print output
    eventdatestr = "?eventdate=" + datetime.datetime.now().strftime('%Y-%m-%d')
    url1 = 'http://localhost:5000/auth/login'
    url2 = 'http://localhost:5000/submit/procrastination'
    url3 = 'http://localhost:5000/submit/sleep'
    url4 = 'http://localhost:5000/submit/feelings'
    # GET request to the forms url
    r = requests.post(url1, json={
        'email':'testacc1@test1',
        'password':'testacc1'
    })
    token= json.loads(r.text)['token']
    # post to each url
    r1 = requests.post(url2+eventdatestr, headers={'token':token}, json={
        'q1':" \" ",
        'q2':" \' ",
        'q3':" \n\t"
    })
    r2 = requests.post(url3+eventdatestr, headers={'token':token}, json={
        'q1':"\" ",
        'q2':" \' ",
        'q3':" \n\t"
    })
    r3 = requests.post(url4+eventdatestr, headers={'token':token}, json={
        'q1':" \" ",
        'q2':" \' ",
        'q3':" \n\t"
    })
    # check status and print output on success and failure
    if json.loads(r1.text)['status'] == 'success':
        print('\033[1;32m Procrastination Form Test: Success')
    else:
        print('\033[1;31m Procrastination Form Test: Failed')
    if json.loads(r2.text)['status'] == 'success':
        print('\033[1;32m Sleep Form Test: Success')
    else:
        print('\033[1;31m Sleep Form Test: Failed')
    if json.loads(r3.text)['status'] == 'success':
        print('\033[1;32m Feelings Form Test: Success')
    else:
        print('\033[1;31m Feelings Form Test: Failed')

    
test_signup()
test_login()
test_download()
test_form_submit()