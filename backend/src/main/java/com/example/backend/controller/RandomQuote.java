package com.example.backend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@RestController
@RequestMapping("/random")
@CrossOrigin(origins = {"http://localhost:5173/"})
public class RandomQuote {
    @GetMapping("/")
    public List<Object> getRandomQuote(){
        String url = "https://api.quotable.io/quotes/random?maxLength=40";
        RestTemplate rt = new RestTemplate();
        List quote = rt.getForObject(url, List.class);
        return quote;
    }
}
