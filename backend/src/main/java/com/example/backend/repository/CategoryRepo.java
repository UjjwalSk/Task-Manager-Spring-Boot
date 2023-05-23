package com.example.backend.repository;


import com.example.backend.model.Category;
import com.example.backend.model.Todo;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Transactional
public interface CategoryRepo extends JpaRepository<Category,Long> {

    @Modifying
    @Query("DELETE FROM categories c WHERE c.id NOT IN (SELECT DISTINCT t.category.id FROM todos t)")
    void deleteUnusedCategories();

}
