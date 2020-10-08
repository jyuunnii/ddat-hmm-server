import { Request, Response } from "express";
import { JsonController, Param, Body, Get, Post, Put, Delete, Controller, Req, Res } from "routing-controllers";

@Controller()
export class UserController {

   @Get("/users")
    getAll(@Req() request: Request, @Res() response: Response) {
        return response.send("Hello response!");
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