import { Request, Response } from "express";
import { JsonController, Param, Body, Get, Post, Put, Delete, Controller, Req, Res } from "routing-controllers";
import { User } from "../entity/User";

let connection = require('../index')

@Controller()
export class UserController {

   @Get("/signin")
    getAll(@Req() request: Request, @Res() response: Response) {
       return response.json({msg: "sign-in response"});
    }

    @Post("/signup")
    postSignUpValues(@Body() user: User){
      console.log("Inserting a new user into the database :");
      const createdUser = new User();
      createdUser.name = user.name;
      createdUser.email = user.email;
      createdUser.password = user.password;
      createdUser.createdAt = new Date();

    // TODO: connection.manager.save(user);
      console.log("Saved a new user with email: " + user.email);

      return "Saving a user...";
    }

    @Get("/users/:id")
    getOne(@Param("id") id: number) {
       return "This action returns user #" + id;
    }

    @Post("/users")
    post(@Body() user: any) {
       return "Saving user...";
    }

    @Put("/users/:id")
    put(@Param("id") id: number, @Body() user: any) {
       return "Updating a user...";
    }

    @Delete("/users/:id")
    remove(@Param("id") id: number) {
       return "Removing user...";
    }
}