import React, { useState, useEffect, Fragment } from "react";
import AddBook from "./addBook";
import NotEditableCell from "./notEditableCell";
import EditableCell from "./editableCell";
import "./bookList.scss";

export default function BookList() {
  const [booksList, setBooksList] = useState([]);
  const [editBookById, setEditBookById] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    author: "",
    category: null,
    isbn: "",
  });

  const getData = () => {
    fetch("http://localhost:3000/books")
      .then((response) => response.json())
      .then((books) =>
        setBooksList(
          books.map((book) => {
            let obj = {
              id: book.id,
              title: book.title,
              author: book.author,
              category: book.category,
              isbn: book.isbn,
            };
            return obj;
          })
        )
      );
  };
  const handleEditFormChange = (event) => {
    const fieldName = event.target.getAttribute("name");
    const fiedValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fiedValue;

    setEditFormData(newFormData);
  };

  const handleEditClick = (event, book) => {
    event.preventDefault();
    setEditBookById(book.id);

    const formValues = {
      id: book.id,
      title: book.title,
      author: book.author,
      category: book.category,
      isbn: book.isbn,
    };

    setEditFormData(formValues);
  };

  const onSubmiteditedBook = (event) => {
    event.preventDefault();

    const editedBook = {
      id: editFormData.id,
      title: editFormData.title,
      author: editFormData.author,
      category: editFormData.category,
      isbn: editFormData.isbn,
    };

    const newBooks = [...booksList];
    const index = booksList.findIndex((book) => book.id === editedBook.id);

    newBooks[index] = editedBook;
    setBooksList(newBooks);
    setEditBookById(null);

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: editFormData.title,
        author: editFormData.author,
        category: editFormData.category,
        isbn: editFormData.isbn,
      }),
    };
    fetch(`http://localhost:3000/books/${editedBook.id}`, requestOptions).then(
      (response) => response.json()
    );
    alert("Дані успішно змінено");
  };

  const onCancel = () => {
    setEditBookById(null);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="main-container">
      <form onSubmit={onSubmiteditedBook} className="main-form">
        <table className="main-table">
          <tbody className="main-tbody">
            <tr>
              <th>Назва книги</th>
              <th>Автор</th>
              <th>Категорія</th>
              <th>ISBN</th>
              <th>Дія</th>
            </tr>
            {booksList.map((book) => (
              <Fragment>
                {editBookById === book.id ? (
                  <EditableCell
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    onCancel={onCancel}
                  />
                ) : (
                  <NotEditableCell
                    book={book}
                    getData={getData}
                    handleEditClick={handleEditClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>
      <AddBook booksList={booksList} setBooksList={setBooksList} />
    </div>
  );
}
