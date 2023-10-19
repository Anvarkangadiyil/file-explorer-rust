function FileList() {
  let fileList = [
    ["a item", "JPG file", "10 KB"],
    ["second file", "PDF", "11 MB"],
    ["third file", "file/folder", "20 MB"],
    ["fourth", "GIF", "200 KB"],
    ["a item", "JPG file", "10 KB"],
    ["second file", "PDF", "11 MB"],
    ["third file", "file/folder", "20 MB"],
    ["fourth", "GIF", "200 KB"],
    ["a item", "JPG file", "10 KB"],
    ["second file", "PDF", "11 MB"],
    ["third file", "file/folder", "20 MB"],
    ["fourth", "GIF", "200 KB"],
    ["a item", "JPG file", "10 KB"],
    ["second file", "PDF", "11 MB"],
    ["third file", "file/folder", "20 MB"],
    ["fourth", "GIF", "200 KB"],
    ["second file", "PDF", "11 MB"],
    ["third file", "file/folder", "20 MB"],
    ["fourth", "GIF", "200 KB"],
    ["a item", "JPG file", "10 KB"],
    ["second file", "PDF", "11 MB"],
    ["third file", "file/folder", "20 MB"],
    ["fourth", "GIF", "200 KB"],
  ];

  return (
    <>
      <table className="table table-success table-striped">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Size</th>
          </tr>
        </thead>
        {fileList.map((item) => (
          <tbody>
            <tr>
              <td>{item[0]}</td>
              <td>{item[1]}</td>
              <td>{item[2]}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </>
  );
}

export default FileList;
