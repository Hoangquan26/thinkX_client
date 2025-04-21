import React, { useEffect, useRef } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

interface CustomQuillProps {
  value: string
  onChange: (val: string) => void
}

const CustomQuill: React.FC<CustomQuillProps> = ({ value, onChange }) => {
  const quillRef = useRef<ReactQuill | null>(null)

  useEffect(() => {
    // Ensure quill doesn't throw when using dialog
    if (quillRef.current) {
      // do nothing, just reference safe
    }
  }, [])

  return (
    <ReactQuill
      ref={(el) => {
        // Avoid ref forwarding issue
        if (el) quillRef.current = el
      }}
      value={value}
      onChange={onChange}
      theme="snow"
    />
  )
}

export default CustomQuill
