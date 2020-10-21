import React, { useState } from 'react';

const Upload = () => {
  // eslint-disable-next-line no-unused-vars
  const [file, setFile] = useState(null);

  const handleUpload = e => {
    const { files } = e.target;
    setFile(files[0]);
  };
  return (
    <div id="upload-box">
      <input
        type="file"
        name="file"
        accept="image/*"
        multiple={false}
        onChange={handleUpload}
      />
    </div>
  );
};

export default Upload;
