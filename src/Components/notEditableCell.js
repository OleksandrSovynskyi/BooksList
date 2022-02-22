import React from "react";

export default function NotEditableCell({ book, getData, handleEditClick }) {
  const deleteData = (id) => {
    fetch(`http://localhost:3000/books/${id}`, { method: "DELETE" })
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
        getData();
      });
  };

  return (
    <tr key={book.id}>
      <td name="title">{book.title}</td>
      <td name="author">{book.author}</td>
      <td name="category">{book.category}</td>
      <td name="isbn">{book.isbn}</td>
      <td className="action-button-container">
        <button
          className="action-button"
          onClick={(event) => handleEditClick(event, book)}
        >
          Редагувати
        </button>
        <button className="action-button" onClick={() => deleteData(book.id)}>
          Видалити
        </button>
      </td>
    </tr>
  );
}
