import React from "react";
import Button from "react-bootstrap/Button";

function Upload() {
  function handleUpload() {
    console.log("Hello");
  }
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <Button onClick={handleUpload}>Upload</Button>
      </div>
      <div className="custom-file">
        <input type="file" className="custom-file-input" />
        <label className="custom-file-label" for="inputGroupFile01">
          Choose file
        </label>
      </div>
    </div>
  );
}

export default Upload;
