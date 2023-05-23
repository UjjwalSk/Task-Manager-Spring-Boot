package com.example.backend.repository;

import com.example.backend.model.Todo;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Transactional
public interface TodoRepo extends JpaRepository<Todo,Long> {

    @Query("select t from todos t where t.category.id = :catId")
    List<Todo> findByCatId(@Param("catId") Long catId);

    @Modifying
    @Query("delete from todos t where t.category.id = :catId and t.status = :status")
    void deleteByCatIdAndStatus(@Param("catId") Long catId, @Param("status") boolean status);

}
