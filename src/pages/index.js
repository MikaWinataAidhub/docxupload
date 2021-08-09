import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import mammoth from "mammoth";


// markup
const IndexPage = () => {

  const [state, setState] = useState({ selectedFile: null });

  const onFileChange = (event) => {
    setState({ selectedFile: event.target.files[0] });
  };

  const onFileUpload = () => {
    const file = state.selectedFile;

    console.log(file);

    console.time();

    var reader = new FileReader();

    reader.onloadend = function (event) {
      var arrayBuffer = reader.result;

      window.Buffer = window.Buffer || require('buffer').Buffer;
      
      console.log("progress reader");

      mammoth
        .convertToHtml({ arrayBuffer: arrayBuffer })
        .then(function (resultObject) {
          document.getElementById("result1").innerHTML = resultObject.value;
          console.log(resultObject.value);
        });

     
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <Container component="main" maxWidth="xs">
      <main>
        <div>
          <input type="file" onChange={onFileChange} />
          <button onClick={onFileUpload}>Upload!</button>

          <p>HTML tag</p>
          <div id="result1"> </div>

          <p>Raw </p>
          <div id="result2"> </div>

          <p>Markdown </p>
          <div id="result3"> </div>
        </div>{" "}
      </main>
    </Container>
  );
};

export default IndexPage;
