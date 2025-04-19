<p align="center">
  <h2 align="center">Heptaix - Web Based Todo App</h2>
</p>

<div align="center">
    <img src="./res/badges/node.svg"/>
    <img src="./res/badges/react.svg"/>
    <img src="./res/badges/postgresql.svg"/>
</div>

Built with PostgreSQL 16, Next.js 15 & React.js 19 and TypeScript.


## Installation

- <p>Install project source code via: <code>git clone https://github.com/yasin2dev/heptaix.git</code></p>

- <p>Open the command line within the downloaded folder, navigate to the server and client directories, and run the command <code>npm i</code>:</p>

For client-side;
```cmd
    C:\heptaix> npm i
```
For server side;
```cmd
    C:\heptaix> cd server
    C:\heptaix\server> npm i
```
- To complete the database configuration, you need to create and edit the <code>.env</code> file.

#### Database

Create a database in PostgreSQL. (via psql or any database viewer)

Run the command ``` npm run migrate ``` for run all migrations. It creates the schemas and tables for project. Database creation not provided for this version. 

You are ready to go!

## Run Project
- For running front-end:
```cmd
    C:\heptaix> npm run dev
```
- For running the server:
```cmd
    C:\heptaix> cd server
    C:\heptaix\server> npm run start
```

### Environments

Please see the `.env.sample` file in root directory and `server/` directory. Port, database name, username, password and other parameters located in this file.
