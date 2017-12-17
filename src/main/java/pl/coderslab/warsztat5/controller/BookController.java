package pl.coderslab.warsztat5.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import pl.coderslab.warsztat5.bean.MemoryBookService;
import pl.coderslab.warsztat5.model.Book;

@RestController
@RequestMapping("/books")
public class BookController {
	@Autowired
	MemoryBookService mbs;
	
	@RequestMapping("/hello")
	public String hello() {
		return "{hello: World}";
	}

	@RequestMapping("/helloBook")
	public Book helloBook() {
		return new Book(1L, "9788324631766", "Thiniking in Java", "Bruce Eckel", "Helion", "programming");
	}
	
	@GetMapping("")
	public List<Book> getBooks() {
		return this.mbs.getList();
	}
	
	@PostMapping("/add")
	public String postBooks(@RequestBody Book b) {
		if(true) { // validate book (b) here
			if(this.mbs.getList().add(b)) {
				return "{\"result\": \"success\"}";
			}
		}
		
		return "{\"result\": \"error\"}";
	}
}