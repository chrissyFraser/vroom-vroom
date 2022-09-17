# CarCar

Team:

* Marble - Service
* Chrissy - Sales

## Design
Links to all of the features are in the navigation bar of the CarCar app. There are lists and fillable forms for everything you need. Utilizes APIs and Pollers for our microservices, nestled in docker containers, making the app scalable and compartmentalized.
## Overview

CarCar: The only app you'll ever need for managing your dealership's inventory and servicing of automobiles.

Checkout this Diagram for a visual explanation of the CarCar App:

https://excalidraw.com/#json=RJpwpLwTiQfwiPXy_ZRvx,FQk1gPjBVGf_Wokcc1sM2A

Details of the diagram include the capabilities of the microservices and the CarCar app!

## Service microservice

Explain your models and integration with the inventory
microservice, here.

## Sales microservice
<!-- Explain your models and integration with the inventory
microservice, here. -->
This Microservice allows you to add and keep track of your customers, salespeople, and all of your sales records in one place! Please see our diagram for more details!

## How to Use
create a project-beta folder on your desktop
clone https://gitlab.com/ElGabbaGhoul/project-beta.git into your folder
open the terminal
cd project-beta
docker volume create beta-data
docker-compose build
docker-compose up

Go to http://localhost:3000 in your browser


Make sure your requirements.txt file includes:

appnope==0.1.3
asgiref==3.5.0
asttokens==2.0.5
autopep8==1.6.0
Babel==2.10.3
backcall==0.2.0
beautifulsoup4==4.11.1
black==22.1.0
bleach==5.0.1
certifi==2022.6.15
cffi==1.15.1
charset-normalizer==2.1.0
click==8.0.4
colorama==0.4.5
cryptography==37.0.4
cssbeautifier==1.14.6
decorator==5.1.1
dj-database-url==1.0.0
Django==4.0.3
django-address==0.2.8
django-cors-headers==3.13.0
django-markdownify==0.9.2
djlint==1.12.1
djwto==0.0.3
EditorConfig==0.12.3
executing==0.8.3
flake8==4.0.1
html-tag-names==0.1.2
html-void-elements==0.1.0
idna==3.3
importlib-metadata==4.12.0
ipython==8.4.0
jedi==0.18.1
jsbeautifier==1.14.6
Markdown==3.4.1
matplotlib-inline==0.1.3
mccabe==0.6.1
mypy-extensions==0.4.3
parso==0.8.3
pathspec==0.9.0
pexpect==4.8.0
pickleshare==0.7.5
pika==1.3.0
platformdirs==2.5.1
prompt-toolkit==3.0.30
ptyprocess==0.7.0
pure-eval==0.2.2
py-moneyed==2.0
pycodestyle==2.8.0
pycparser==2.21
pyflakes==2.4.0
Pygments==2.12.0
PyJWT==2.4.0
pytz==2022.2.1
PyYAML==6.0
regex==2022.8.17
requests==2.28.1
six==1.16.0
soupsieve==2.3.2.post1
sqlparse==0.4.2
stack-data==0.3.0
tinycss2==1.1.1
toml==0.10.2
tomli==2.0.1
tqdm==4.64.0
traitlets==5.3.0
typing_extensions==4.3.0
urllib3==1.26.10
wcwidth==0.2.5
webencodings==0.5.1
wikipedia==1.4.0
zipp==3.8.1

