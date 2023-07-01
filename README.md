# fast-autocomplete

A simple **Create React App** frontend that connects with a backend **Django** server to provide an efficient Autocomplete Suggestion System.
This is similar to ones we have on our phones.

Note: Extensive input validation has not been implemented yet.

A **demo** is available [**here**](https://fast-autocomplete.vercel.app)

## Running locally

### Server

- Git clone the repository from terminal
````
git clone https://github.com/SilverMarcs/fast-autocomplete.git
````

- Move to the cloned folder and move to server folder

````
cd fast-autocomplete && cd server
````

- Install django using pip

````
pip install django
````

- Start the server. If it complains about missing package/dependency, simply install via pip

````
python manage.py runserver
````


### Client

- Return to parent directory and move to client folder
  
````
cd .. && cd client
````

- Install node dependencies and wait until they get installed 
  
````
npm install
````

- Start the server for frontend. A browser window should automatically open at http://localhost:3000
  
````
npm run start
````
<br>

**use ```python3``` instead of ```python``` if that's how its set in your system's PATH*<br>
**add ```python -m``` prefix before pip command if you system is set up like that*

