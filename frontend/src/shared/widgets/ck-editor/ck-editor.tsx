import { CKEditor } from '@ckeditor/ckeditor5-react'
import {
  BlockQuote,
  Bold,
  ClassicEditor,
  Code,
  CodeBlock,
  Essentials,
  Heading,
  Italic,
  Link,
  List,
  Paragraph,
  SourceEditing,
  Strikethrough,
  Subscript,
  Superscript
} from 'ckeditor5'
import coreTranslations from 'ckeditor5/translations/ru.js'

const CkEditor = () => {
  console.log(`CkeEditor component is working`)

  return (
    <CKEditor
      editor={ClassicEditor}
      config={{
        licenseKey: 'GPL',
        translations: [coreTranslations],
        plugins: [
          Essentials,
          Paragraph,
          Bold,
          Italic,
          Heading,
          BlockQuote,
          Strikethrough,
          Subscript,
          Superscript,
          Code,
          Link,
          CodeBlock,
          List,
          SourceEditing
        ],
        toolbar: [
          'undo',
          'redo',
          '|',
          'heading',
          '|',
          'bold',
          'italic',
          'strikethrough',
          'code',
          '|',
          'link',
          'blockQuote',
          'codeBlock',
          '|',
          'bulletedList',
          'numberedList',
          '|',
          'sourceEditing'
        ]
      }}
    />
  )
}

export default CkEditor
