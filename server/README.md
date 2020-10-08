# Awesome Project Build with TypeORM

Steps to run this project:

1. `mkdir server`
2. Run `npm install typeorm -g` command
3. Run `typeorm init --name [project_name] --database [database]`    
Database list :    
mysql, mariadb, postgres, cockroachdb, sqlite, mssql, oracle, mongodb, etc.     

directory looks like :   
```
server
├── src              // place of your TypeScript code
│   ├── entity       // place where your entities (database models) are stored
│   │   └── User.ts  // sample entity
│   ├── migration    // place where your migrations are stored
│   └── index.ts     // start point of your application
├── .gitignore       // standard gitignore file
├── ormconfig.json   // ORM and database connection configuration
├── package.json     // node module dependencies
├── README.md        // simple readme file
└── tsconfig.json    // TypeScript compiler options
```
4. cd MyProject
5.  Run `npm i / npm install` command
6. Setup database settings inside `ormconfig.json` file
```
{
   "type": "postgres",
   "host": "localhost",
   "port": 3306,
   "username": "test",
   "password": "test",
   "database": "test",
   "synchronize": true,
   "logging": false,
   "entities": [
      "src/entity/**/*.ts"
   ],
   "migrations": [
      "src/migration/**/*.ts"
   ],
   "subscribers": [
      "src/subscriber/**/*.ts"
   ]
}
```
7. Run `npm start` command
