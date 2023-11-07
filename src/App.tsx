import React from "react";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Button, message, Upload, type UploadProps } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadRequestOption } from "rc-upload/lib/interface";
import { RcFile } from "antd/es/upload";

const extractAudio = require("ffmpeg-extract-audio");

function App() {
  const onUploadFile = async (options: UploadRequestOption) => {
    const { onSuccess, file, onError } = options;
    // @ts-ignore
    if (file.type !== "text/csv") {
      return "lol";
    }

    await extractAudio({
      input: "media/1.mp4",
      output: "test.mp3"
    });
  };

  const props: UploadProps = {
    name: "file",
    customRequest: onUploadFile,
    headers: {
      authorization: "authorization-text"
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </header>
    </div>
  );
}

export default App;
