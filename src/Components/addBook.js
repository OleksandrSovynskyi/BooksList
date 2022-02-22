import React, { useState } from "react";

export default function AddBook({ booksList, setBooksList }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState(null);
  const [isbn, setIsbn] = useState("");

  const handleTitle = (value) => {
    setTitle(value);
  };

  const handleAuthor = (value) => {
    setAuthor(value);
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleIsbn = (value) => {
    setIsbn(value);
  };

  const addToTable = (currentData, addingData) => {
    return currentData.concat(addingData);
  };

  const onSubmit = (event) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        author: author,
        category: category,
        isbn: isbn,
      }),
    };
    event.preventDefault();
    fetch("http://localhost:3000/books", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setBooksList(addToTable(booksList, data));
        alert(`Книга ${data.title} успішно додана до списку`);
      });
  };

  return (
    <div className="add-book-container">
      <form onSubmit={onSubmit} className="add-book-form">
        <input
          className="form-item"
          type="text"
          name="title"
          required="required"
          placeholder="Назва книги"
          onChange={(e) => handleTitle(e.target.value)}
        />
        <input
          className="form-item"
          type="text"
          name="author"
          required="required"
          placeholder="Автор книги"
          onChange={(e) => handleAuthor(e.target.value)}
        />
        <select
          className="form-item"
          required
          onChange={handleCategory}
          style={{ height: "32px" }}
        >
          <option value="" disabled selected>
            Категорія
          </option>
          <option value="Художня література">Художня література</option>
          <option value="Нехудожня література">Нехудожня література</option>
          <option value="Дитяча література">Дитяча література</option>
          <option value="Література іноземними мовами">
            Література іноземними мовами
          </option>
          <option value="Довідникова література">Довідникова література</option>
        </select>
        <input
          className="form-item"
          type="number"
          name="isbn"
          required="required"
          placeholder="ISBN"
          onChange={(e) => handleIsbn(e.target.value)}
        />
        <button className="action-button" type="submit">
          Додати нову книгу до списку
        </button>
      </form>
    </div>
  );
}
