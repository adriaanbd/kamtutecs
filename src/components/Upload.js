import React from 'react'

const Upload = handler => {
	return (
		<div className="input-group mb-3">
			<div className="input-group-prepend">
				<span className="input-group-text">Upload</span>
			</div>
			<div className="custom-file">
				<input
					type="file"
					className="custom-file-input"
					id="inputGroupFile01"
					multiple={false}
					onChange={handler}
				/>
				<label className="custom-file-label" htmlFor="inputGroupFile01">Choose file</label>
			</div>
		</div>
	)
}

export default Upload;
