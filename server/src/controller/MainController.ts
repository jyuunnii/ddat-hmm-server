import { Controller, Get, Param } from "routing-controllers";

@Controller()
export class MainController {

    @Get("/")
    getAll(){
        return "This is main page";
    }

    @Get("/menu/:id")
    getOne(@Param("id") id: number){
        return "This is menu" + id;
    }
}