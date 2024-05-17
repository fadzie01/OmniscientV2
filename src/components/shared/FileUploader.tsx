import React, { useCallback, useState } from "react"
import { FileWithPath, useDropzone } from "react-dropzone"
import { Button } from "../ui/button"

type FileUploaderProps = {
  fieldChange: (FILES: File[]) => void;
  mediaUrl: string;
}

function FileUploader({ fieldChange, mediaUrl }: FileUploaderProps) {
const [fileUrl, setFileUrl] = useState(mediaUrl);
const [file, setFile] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]))
}, [file])

const {getRootProps, getInputProps } = useDropzone
({onDrop,
accept: {
  'image/*': ['.png', '.jpeg', '.jpg', '.svg']
}
})

  return (
    <div {...getRootProps()} className="flex flex-center flex-col bg-dark-3 round-xl cursor-pointer">
      <input {...getInputProps()} className="cursor-pointer"/>
      {
        fileUrl ? (
          <>
          <div className="flex flex-1 justify-container w-full p-5 lg:10"> 
            < img src= {fileUrl} alt="image" className="file_uploader-img"/>
          </div>
          <p className="file_uploader-label"> Click or drag photo to replace</p>
          </>
        ) : (
          <div className="file_uploader-box"> 
            <img src="assets/icons/file-upload.svg"
            width={98}
            height={79}
            alt="file-upload"/>
            <h2 className="text-light-4 small-regular mb-6">PNG, SVG, JPG</h2>
          
          <Button className="shad-button_dark_4">
            browse
          </Button>
          
          </div>
        )

      }
  </div>
    )
  }

export default FileUploader