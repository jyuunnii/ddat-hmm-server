# DDAT-HMM Server

<!-- TABLE OF CONTENTS -->
## :round_pushpin: Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
  * [Features](#features)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
  * [API](#api)
* [Roadmap](#roadmap)

<!-- ABOUT THE PROJECT -->
## :mag_right: About The Project

This is REST API server for ddat-hmm project.

### Built With
* [`Node.js`](https://nodejs.org/)
* [`TypeORM`](https://typeorm.io/#/)
* [`Postgres`](https://www.postgresql.org/)
* [`brcypt`](https://github.com/kelektiv/node.bcrypt.js)

### Features
- Save ddat-hmm data of user, friend(following / follower), and message(sent / received)
- REST API for CRUD in ddat-hmm

<!-- GETTING STARTED -->
## :bulb: Getting Started

This is how you may give instructions on setting up your project locally. To get a local copy up and running follow these simple example steps.
### Prerequisites
* npm
```sh
npm install npm@latest -g
```
* Postgres Server
> Available to replace another server instead of postgres server. See [typeorm documents](https://typeorm.io/#/connection-options) for connection server. 

### Installation
1. Run Postgres
```sh
psql -U userName
```
2. Clone the repository
```sh
git clone https://github.com/jyuunnii/hmm-server.git
```
3. Change current directory to the project directory
4. Install npm packages
```sh
npm install
```
5.  Run server
```sh
npm start
```
> Success to installation writes `App Listening on PORT [port_number] DB connected !` on your terminal.

<!-- Usage -->
## :white_check_mark: Usage
### API
* [`POST /auth/login`](#post/auth/login) :small_blue_diamond:
* [`GET /user`](#get/user) :small_orange_diamond:
* [`GET /user/name?:name`](#get/user/name?:name) :small_orange_diamond:
* [`GET /user/:id`](#get/user/:id) :small_orange_diamond:
* [`POST /user`](#post/user) :small_blue_diamond:
* [`PATCH /user/:id`](#patch/user/:id) :small_blue_diamond:
* [`DELETE /user/:id`](#delete/user/:id) :small_red_triangle:
* [`GET /follow/:id`](#get/follow/:id) :small_orange_diamond:
* [`POST /follow/:id`](#post/follow/:id) :small_blue_diamond:
* [`DELETE /follow/:id`](#delete/follow/:id) :small_red_triangle:
* [`GET /message/:id`](#get/message/:id) :small_orange_diamond:
* [`POST /message/:id`](#post/message/:id) :small_blue_diamond:


<a name="post/auth/login"></a>
### :small_blue_diamond: Login authentication
URI|Method|Description
-|-|-
`/auth/login`|`POST`|Validate if email and password are correct
* Request Parameter : `Not Required`
* Request Body : 
```json
{
  "email" : "user email",
  "password" : "user password"
}
```
* Response : 
```json
{
  "id" : "user id in Postgres DB",
  "token" : "published Json Web Token to the user which expiration hour is 1 hour and issuer is hmm"
}
```

<a name="get/user"></a>
### :small_orange_diamond: Get all users
 URI|Method|Description
-|-|-
`/user`|`GET`|Get a list of all users private data in the service
* Request Parameter : `Not Required`
* Request Body : `Not Required`
* Response : 
```json
[
  {
    "id": "user id in Postgres DB",
    "name": "user name",
    "email": "user email",
    "profileImageUri": "user profile image URI and default image is /images/person.png",
    "backgroundImageUri": "user background image URI",
    "comment": "user comment",
     "createdAt": "creation date (type: timestamp)",
    "updatedAt": "update date (type : timestamp)"
  },
]
```

<a name="get/user/name?:name"></a>
### :small_orange_diamond: Get a list of user public data
URI|Method|Description
-|-|-
`/user/name?:name`|`GET`|Get a list of all users public data by user name
* Request Parameter : `user_name`
* Request Body : `Not Required`
* Response : 
```json
[
  {
    "id": "user id in Postgres DB",
    "name" : "user name",
    "email" : "user email",
    "profileImageUri" : "user profile image URI and default image is /images/person.png",
    "backgroundImageUri" : "user background image URI",
    "comment" : "user comment",
    "createdAt": "creation date (type: timestamp)",
    "updatedAt": "update date (type : timestamp)"
  },
]
```

<a name="get/user/:id"></a>
### :small_orange_diamond: Get a specific user public data
URI|Method|Description
-|-|-
`/user/:id`|`GET`|Get a specific user public data by user id
* Request Parameter : `id` : User primary key in Postgres DB
* Payload : `id, token` : User primary key and non-expired token id
```json
{
  "id" : "user id in Postgres DB",
  "token" : "published Json Web Token to the user which expiration hour is 1 hour and issuer is hmm"
}
```
* Request Body : `Not Required`
* Response : 
```json
{
  "id" : "user id in Postgres DB",
  "name" : "user name",
  "profileImageUri" : "user profile image URI and default image is /images/person.png",
  "backgroundImageUri" : "user background image URI",
  "comment": "user comment"  
}
```

<a name="post/user"></a>
### :small_blue_diamond: Post a new user
URI|Method|Description
-|-|-
`/user`|`POST`| Create a new user in the service
* Request Parameter : `Not Required`
* Request Body :
```json
{
  "name": "user name",
  "email" : "user email",
  "password" : "user password",
  "profileImageUri": "user profile image URI and default image is /images/person.png",
  "backgroundImageUri": "user background image URI",
  "comment": "user comment (optional)"
}
```
* Response : 
```json
{
  "User Created !"
}
```

<a name="patch/user/:id"></a>
### :small_blue_diamond: Patch a user data
URI|Method|Description
-|-|-
`/user/:id`|`PATCH`|Modify some of specific user data by user id
* Request Parameter : `id` : User primary key in Postgres DB
* Payload : `id, token` : User primary key and non-expired token id
```json
{
  "id" : "user id in Postgres DB",
  "token" : "published Json Web Token to the user which expiration hour is 1 hour and issuer is hmm"
}
```
* Request Body : `Not Required`
> Input need_to_be_modified fields.
* Response : 
```json
{
  "User data modified !"
}
```

<a name="delete/user/:id"></a>
### :small_red_triangle: Delete a specific user 
URI|Method|Description
-|-|-
`/user/:id`|`DELETE`|Delete a specific user in the service by user id
* Request Parameter : `id` : User primary key in Postgres DB
* Payload : `id, token` : User primary key and published non-expired token id
```json
{
  "id" : "user id in Postgres DB",
  "token" : "published Json Web Token to the user which expiration hour is 1 hour and issuer is hmm"
}
```
* Request Body : `Not Required`
> Input need_to_be_modified fields.
* Response : 
```json
{
  "User deleted !"
}
```

<a name="get/follow/:id"></a>
### :small_orange_diamond: Get a following and follower list
URI|Method|Description
-|-|-
`/follow/:id`|`GET`|Get a list of following-user and follower-user by user id
* Request Parameter : `id` : User primary key in Postgres DB
* Payload : `id, token` : User primary key and published non-expired token id
```json
{
  "id" : "user id in Postgres DB",
  "token" : "published Json Web Token to the user which expiration hour is 1 hour and issuer is hmm"
}
```
* Request Body : `Not Required`
* Response : 
```json
{
  "following":[
    {
    "id" : "user id in Postgres DB",
    "name" : "user name",
    "profileImageUri" : "user profile image URI and default image is /images/person.png",
    "backgroundImageUri" : "user background image URI",
    "comment": "user comment"
    },
  ],
  "follower": [
  {
    "id" : "user id in Postgres DB",
    "name" : "user name",
    "profileImageUri" : "user profile image URI and default image is /images/person.png",
    "backgroundImageUri" : "user background image URI",
    "comment": "user comment"
  },
  ]
}
```

<a name="post/follow/:id"></a>
### :small_blue_diamond: Post a new following
URI|Method|Description
-|-|-
`/follow/:id`|`POST`|Add a new following-user into following list
* Request Parameter : `id` : User primary key in Postgres DB
* Payload : `id, token` : User primary key and published non-expired token id
```json
{
  "id" : "user id in Postgres DB",
  "token" : "published Json Web Token to the user which expiration hour is 1 hour and issuer is hmm"
}
```
* Request Body : 
```json
{
  "followingName" : "user name who wish to follow"
}
```
* Response : 
```json
{
  "New followed !"
}
```

<a name="delete/follow/:id"></a>
### :small_red_triangle: Delete a specific following
URI|Method|Description
-|-|-
`/follow/:id`|`DELETE`|Delete a following-user from following list by user id and friend id
* Request Parameter : `id` : User primary key in Postgres DB
* Payload : `id, token` : User primary key and published non-expired token id
```json
{
  "id" : "user id in Postgres DB",
  "token" : "published Json Web Token to the user which expiration hour is 1 hour and issuer is hmm"
}
```
* Request Body : 
```json
{
  "followingName" : "user name who wish to follow"
}
```
* Response : 
```json
{
  "Unfollow"
}
```

<a name="get/message/:id"></a>
### :small_orange_diamond: Get all messages of user
URI|Method|Description
-|-|-
`/message/:id`|`GET`|GET a list of messages that a user sent or received in the service today by user id and message id
* Request Parameter : `id` : User primary key in Postgres DB
* Payload : `id, token` : User primary key and published non-expired token id
```json
{
  "id" : "user id in Postgres DB",
  "token" : "published Json Web Token to the user which expiration hour is 1 hour and issuer is hmm"
}
```
* Request Body : `Not Required`
* Response : 
```json
{
  "sent": [
  {
    "sender" : "user name who sent the message",
    "receiver" : "user name who received the message",
    "content" : "message",
    "type" : "true : message sent"
  },
  ],
"received": [
  {
    "sender" : "user name who sent the message",
    "receiver" : "user name who received the message",
    "content" : "message",
    "type" : "false : message received"
  },
]
}
```

<a name="post/message/:id"></a>
### :small_blue_diamond: Post a new message
URI|Method|Description
-|-|-
`/message/:id`|`POST`|Send a message to one of following users and the message is stored as a sent message
* Request Parameter : `Not Required`
* Payload : `id, token` : User primary key and published non-expired token id
```json
{
  "id" : "user id in Postgres DB",
  "token" : "published Json Web Token to the user which expiration hour is 1 hour and issuer is hmm"
}
```
* Request Body :
```json
{
  "targetUserId" : "user id who wish to be sent",
  "content" : "message"
}
```
* Response : 
```json
{
  "Message sent!"
}
```

<!-- ROADMAP -->
## Roadmap
See the [open issues](https://github.com/jyuunnii/hmm-server/issues) for a list of proposed features 

