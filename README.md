# fast-autocomplete

A **demo** is available [**here**](https://fast-autocomplete.vercel.app)

<img width="1240" alt="Screenshot 2023-07-03 at 1 13 32 PM" src="https://github.com/SilverMarcs/fast-autocomplete/assets/77480421/0f1abdb9-b327-4a44-aa66-4c42aac05651">

A simple frontend that connects with a backend server to provide an efficient Autocomplete Suggestion service, similar to ones we have on our phones.<br>

Stack used:
- **Django** for backend server
- **Create React App** for frontend
- **ChakraUI** for styling

Note: Extensive input validation has not been implemented yet.

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

- In the client folder,r ename .env.example file to .env and paste the following: 
  
````
REACT_APP_API_URL = http://127.0.0.1:8000
````

- Start the server for frontend. A browser window should automatically open at http://localhost:3000
  
````
npm run start
````
<br>

**use ```python3``` instead of ```python``` if that's how its set in your system's PATH*<br>
**add ```python -m``` prefix before pip command if you system is set up like that*

