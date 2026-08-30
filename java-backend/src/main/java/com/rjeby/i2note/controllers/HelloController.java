package com.rjeby.i2note.controllers;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@RestController 
public class HelloController {

    @GetMapping("/hello/{username}")
    public String sayHello(@PathVariable String username, @RequestParam(required = false) String points) {
        String capitalized = username.substring(0, 1).toUpperCase() + username.substring(1).toLowerCase();
        return "Hello " + capitalized + ", you got " + points + " points!";
    }

}