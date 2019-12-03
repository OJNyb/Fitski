import React from "react";

const FileUpload = props => {
  const { field, form, onChange, button } = props;

  const handleChange = event => {
    if (!event.target.files) return;

    const file = event.target.files[0];
    // Add code here to transform the file such as with an api call, etc

    form.setFieldValue(field.name, file);
    onChange();
  };

  return (
    <label>
      {button}
      <input
        style={{ display: "none" }}
        type="file"
        accept="image/png, image/jpeg"
        onChange={event => handleChange(event)}
      />
    </label>
  );
};

export default FileUpload;
