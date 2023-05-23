package com.example.backend.controller;

import com.example.backend.model.Category;
import com.example.backend.repository.CategoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
@CrossOrigin(origins = "http://localhost:5173")
public class CategoryController{

    @Autowired
    private CategoryRepo catRepo;

    @GetMapping
    public List<Category> getAllCategories(){
        return catRepo.findAll();
    }

    @PostMapping
    public ResponseEntity<Category> createCategory(@RequestBody Category category){
        Category savedCategory = catRepo.save(category);
        return ResponseEntity.ok(savedCategory);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable Long id){
        catRepo.deleteById(id);
        return ResponseEntity.ok("Category with id "+id+" deleted successfully");
    }

    @DeleteMapping("/deleteUnused")
    public ResponseEntity<String> deleteAllCategories(){
        System.out.println("Deleting all categories-------------");
        catRepo.deleteUnusedCategories();
        return ResponseEntity.ok("All categories deleted successfully");
    }

}
