import React from 'react';
import { Button } from 'reactstrap';

const Upload = () => {
  const handleUpload = () => {
    //
  };
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <Button onClick={handleUpload}>Upload</Button>
      </div>
      <div className="custom-file">
        <input type="file" className="custom-file-input" />
        <label className="custom-file-label" htmlFor="inputGroupFile01">
          Choose file
        </label>
      </div>
    </div>
  );
};

export default Upload;
