package com.example.backend.controller;

import com.example.backend.model.Todo;
import com.example.backend.repository.TodoRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/todo")
@CrossOrigin(origins = {"http://localhost:5173"})
public class TodoController{

    @Autowired
    private TodoRepo todoRepo;

    @GetMapping
    public List<Todo> getAllTodos(){
        return todoRepo.findAll();
    }

    @GetMapping("/c/{catId}")
    public List<Todo> getTodosByCategoryId(@PathVariable(required = false) Long catId){
        return todoRepo.findByCatId(catId).stream().sorted(Comparator.comparingLong(Todo::getId)).toList();
    }

    @PostMapping
    public ResponseEntity<Todo> createTodo(@RequestBody Todo todo){
        System.out.println("todo = " + todo);
        Todo savedTodo = todoRepo.save(todo);
        return ResponseEntity.ok(savedTodo);
    }

    @PutMapping(value = {"/{id}", "/{id}/{status}"})
    public Optional<Todo> updateTodoById(@PathVariable Long id, @PathVariable(required = false) Boolean status, @RequestBody Todo todo) {
        if (status != null) {
            System.out.println("Status is not null!!");
            // Update the status
            return todoRepo.findById(id).map(t -> {
                t.setStatus(status);
                return todoRepo.save(t);
            });
        } else {
            // Perform other updates
            return todoRepo.findById(id).map(t -> {
                t.setTitle(todo.getTitle());
                t.setDescription(todo.getDescription());
                t.setTime(todo.getTime());
                t.setStatus(todo.isStatus());
                t.setCategory(todo.getCategory());
                return todoRepo.save(t);
            });
        }
    }

    @DeleteMapping(value= {"/{id}","/{id}/{catId}","/{id}/{catId}/{status}" })
    public ResponseEntity<String> deleteTodoById(@PathVariable Long id,@PathVariable(required = false) Long catId,@PathVariable(required = false) Boolean status){
        System.out.println("id = " + id);
        System.out.println("catId = " + catId);
        System.out.println("status = " + status);
        if(status!=null){
            todoRepo.deleteByCatIdAndStatus(catId, status);
        } else if(catId!=null){
            todoRepo.deleteByCatIdAndStatus(catId, false);
            todoRepo.deleteByCatIdAndStatus(catId, true);
        }else{
            todoRepo.deleteById(id);
        }
        return ResponseEntity.ok("deleted !");
    }



}
