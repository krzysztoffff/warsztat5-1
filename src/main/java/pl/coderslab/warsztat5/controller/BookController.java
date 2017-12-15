package pl.coderslab.warsztat5.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pl.coderslab.warsztat5.model.Book;

@RestController
@RequestMapping("/books")
public class BookController {
	@RequestMapping("/hello")
	public String hello() {
		return "{hello: World}";
	}

	@RequestMapping("/helloBook")
	public Book helloBook() {
		return new Book(1L, "9788324631766", "Thiniking in Java", "Bruce Eckel", "Helion", "programming");
	}
}