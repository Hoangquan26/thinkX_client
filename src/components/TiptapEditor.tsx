import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Undo2,
  Redo2,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TiptapEditor({
  description,
  onChange,
}: {
  description: string
  onChange: (value: string) => void
}) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: description,
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    },
  })

  if (!editor) return null

  return (
    <div className="border rounded-md">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 p-2 border-b bg-gray-50">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "bg-gray-200" : ""}
        >
          <Bold className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "bg-gray-200" : ""}
        >
          <Italic className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "bg-gray-200" : ""}
        >
          <List className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "bg-gray-200" : ""}
        >
          <ListOrdered className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().undo().run()}
        >
          <Undo2 className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().redo().run()}
        >
          <Redo2 className="w-4 h-4" />
        </Button>
      </div>

      <div className="p-3 min-h-[200px] prose max-w-full">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
