import React from "react";

export default function EditableCell({
  editFormData,
  handleEditFormChange,
  onCancel,
}) {
  return (
    <tr>
      <td>
        <input
          className="form-item"
          type="text"
          name="title"
          required="required"
          placeholder="Назва книги"
          onChange={handleEditFormChange}
          value={editFormData.title}
        />
      </td>
      <td>
        <input
          className="form-item"
          type="text"
          name="author"
          required="required"
          placeholder="Автор книги"
          onChange={handleEditFormChange}
          value={editFormData.author}
        />
      </td>
      <td>
        <select
          className="form-item"
          name="category"
          required
          onChange={handleEditFormChange}
          value={editFormData.category}
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
      </td>
      <td>
        <input
          className="form-item"
          type="number"
          name="isbn"
          required="required"
          placeholder="ISBN"
          onChange={handleEditFormChange}
          value={editFormData.isbn}
        />
      </td>
      <td className="action-button-container">
        <button className="action-button" type="submit">
          Зберегти
        </button>
        <button className="action-button" onClick={onCancel}>
          Відмінити
        </button>
      </td>
    </tr>
  );
}
