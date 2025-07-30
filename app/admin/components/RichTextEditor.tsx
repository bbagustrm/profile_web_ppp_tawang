'use client'

import React, { useCallback, useRef } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import { TextStyle } from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import ListItem from '@tiptap/extension-list-item'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import Blockquote from '@tiptap/extension-blockquote'
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    Strikethrough,
    Code,
    Heading1,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    Quote,
    Undo,
    Redo,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    Image as ImageIcon,
    Link as LinkIcon,
    Highlighter
} from 'lucide-react'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

interface RichTextEditorProps {
    content: string
    onChange: (content: string) => void
    placeholder?: string
}

export default function RichTextEditor({ content, onChange, placeholder }: RichTextEditorProps) {
    const supabase = createClientComponentClient()
    const fileInputRef = useRef<HTMLInputElement>(null)

    const uploadImage = async (file: File): Promise<string> => {
        try {
            const fileExt = file.name.split('.').pop()
            const fileName = `editor-${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`

            const { error } = await supabase.storage
                .from('news-images')
                .upload(fileName, file, {
                    cacheControl: '3600',
                    upsert: false
                })

            if (error) throw new Error('Gagal mengupload gambar')

            const { data: { publicUrl } } = supabase.storage
                .from('news-images')
                .getPublicUrl(fileName)

            return publicUrl
        } catch (error) {
            console.error('Upload error:', error)
            throw error
        }
    }

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                // Disable default list extensions from StarterKit
                bulletList: false,
                orderedList: false,
                listItem: false,
                blockquote: false,
            }),
            // Add specific list extensions
            ListItem.configure({
                HTMLAttributes: {
                    class: 'my-1',
                },
            }),
            BulletList.configure({
                keepMarks: true,
                keepAttributes: false,
                HTMLAttributes: {
                    class: 'list-disc list-outside my-2 ml-6',
                },
            }),
            OrderedList.configure({
                keepMarks: true,
                keepAttributes: false,
                HTMLAttributes: {
                    class: 'list-decimal list-outside my-2 ml-6',
                },
            }),
            Blockquote.configure({
                HTMLAttributes: {
                    class: 'border-l-4 border-gray-300 pl-4 italic my-4 text-gray-600',
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'rounded-lg max-w-full h-auto my-4',
                },
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-blue-600 underline cursor-pointer',
                },
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Underline,
            TextStyle,
            Color,
            Highlight.configure({
                multicolor: true,
            }),
        ],
        immediatelyRender: false,
        content: content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] p-4',
            },
        },
    })

    const handleImageUpload = useCallback(() => {
        fileInputRef.current?.click()
    }, [])

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file || !editor) return

        if (!file.type.startsWith('image/')) {
            toast('File harus berupa gambar')
            return
        }

        if (file.size > 2 * 1024 * 1024) {
            toast('Ukuran file maksimal 2MB')
            return
        }

        try {
            const imageUrl = await uploadImage(file)
            editor.chain().focus().setImage({ src: imageUrl }).run()
        } catch (error) {
            console.error(error)
            toast('Gagal mengupload gambar')
        }

        // Reset input
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    const addLink = useCallback(() => {
        const previousUrl = editor?.getAttributes('link').href
        const url = window.prompt('URL', previousUrl)

        if (url === null) return

        if (url === '') {
            editor?.chain().focus().extendMarkRange('link').unsetLink().run()
            return
        }

        editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    }, [editor])

    if (!editor) {
        return (
            <div className="border border-gray-300 rounded-lg p-4">
                <p className="text-slate-500 text-sm">Memuat editor...</p>
            </div>
        )
    }

    return (
        <div className="border border-gray-300 rounded-lg overflow-hidden">
            {/* Toolbar */}
            <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-1">
                {/* Text Formatting */}
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={editor.isActive('bold') ? 'bg-gray-200' : ''}
                    title="Bold"
                >
                    <Bold className="h-4 w-4" />
                </Button>

                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive('italic') ? 'bg-gray-200' : ''}
                    title="Italic"
                >
                    <Italic className="h-4 w-4" />
                </Button>

                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={editor.isActive('underline') ? 'bg-gray-200' : ''}
                    title="Underline"
                >
                    <UnderlineIcon className="h-4 w-4" />
                </Button>

                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={editor.isActive('strike') ? 'bg-gray-200' : ''}
                    title="Strikethrough"
                >
                    <Strikethrough className="h-4 w-4" />
                </Button>

                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    className={editor.isActive('code') ? 'bg-gray-200' : ''}
                    title="Inline Code"
                >
                    <Code className="h-4 w-4" />
                </Button>

                <Separator orientation="vertical" className="h-6" />

                {/* Headings */}
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : ''}
                    title="Heading 1"
                >
                    <Heading1 className="h-4 w-4" />
                </Button>

                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''}
                    title="Heading 2"
                >
                    <Heading2 className="h-4 w-4" />
                </Button>

                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={editor.isActive('heading', { level: 3 }) ? 'bg-gray-200' : ''}
                    title="Heading 3"
                >
                    <Heading3 className="h-4 w-4" />
                </Button>

                <Separator orientation="vertical" className="h-6" />

                {/* Lists and Quote - Fixed buttons */}
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive('bulletList') ? 'bg-gray-200' : ''}
                    title="Bullet List"
                >
                    <List className="h-4 w-4" />
                </Button>

                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={editor.isActive('orderedList') ? 'bg-gray-200' : ''}
                    title="Numbered List"
                >
                    <ListOrdered className="h-4 w-4" />
                </Button>

                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={editor.isActive('blockquote') ? 'bg-gray-200' : ''}
                    title="Quote"
                >
                    <Quote className="h-4 w-4" />
                </Button>

                <Separator orientation="vertical" className="h-6" />

                {/* Alignment */}
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    className={editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200' : ''}
                    title="Align Left"
                >
                    <AlignLeft className="h-4 w-4" />
                </Button>

                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    className={editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200' : ''}
                    title="Align Center"
                >
                    <AlignCenter className="h-4 w-4" />
                </Button>

                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    className={editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200' : ''}
                    title="Align Right"
                >
                    <AlignRight className="h-4 w-4" />
                </Button>

                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                    className={editor.isActive({ textAlign: 'justify' }) ? 'bg-gray-200' : ''}
                    title="Justify"
                >
                    <AlignJustify className="h-4 w-4" />
                </Button>

                <Separator orientation="vertical" className="h-6" />

                {/* Media & Links */}
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleImageUpload}
                    title="Insert Image"
                >
                    <ImageIcon className="h-4 w-4" />
                </Button>

                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={addLink}
                    className={editor.isActive('link') ? 'bg-gray-200' : ''}
                    title="Add/Remove Link"
                >
                    <LinkIcon className="h-4 w-4" />
                </Button>

                <Separator orientation="vertical" className="h-6" />

                {/* Highlight */}
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleHighlight().run()}
                    className={editor.isActive('highlight') ? 'bg-gray-200' : ''}
                    title="Highlight"
                >
                    <Highlighter className="h-4 w-4" />
                </Button>

                <Separator orientation="vertical" className="h-6" />

                {/* Undo/Redo */}
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().chain().focus().undo().run()}
                    title="Undo"
                >
                    <Undo className="h-4 w-4" />
                </Button>

                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().chain().focus().redo().run()}
                    title="Redo"
                >
                    <Redo className="h-4 w-4" />
                </Button>
            </div>

            {/* Editor Content */}
            <div className="min-h-[200px] max-h-[400px] overflow-y-auto">
                <EditorContent
                    editor={editor}
                    placeholder={placeholder}
                    className="focus-within:outline-none"
                />
                {editor.isEmpty && placeholder && (
                    <div className="absolute top-16 left-4 text-gray-400 pointer-events-none">
                        {placeholder}
                    </div>
                )}
            </div>

            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
            />
        </div>
    )
}