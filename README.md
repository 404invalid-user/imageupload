# setup

first you need to install the things with 
```
npm install
```

now you want to set up your password you do this py typing in this command replacing yourPassword1 with your password (make it long)
```
node set-password.js yourPassword1
```

now you want to change the domain so it will show the correct domain instead of http://localhost/

open ./conf.json with your prefered text editor and replace http://localhost/ with your domain eg for me i would do https://invaliduser.tk/ remember to include the http:// or https:// andd the / at the end

now you are done type node . and it will run on port 8000 you can change the port in ./conf.json