"use client";

import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyleKit } from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Heading2,
  Italic,
  Link2,
  List,
  ListOrdered,
  Redo2,
  Underline as UnderlineIcon,
  Undo2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type RichTextEditorProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

type ToolbarButtonProps = {
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

function ToolbarButton({ label, active, disabled, onClick, children }: ToolbarButtonProps) {
  return (
    <Button
      aria-label={label}
      aria-pressed={active}
      className={cn(active && "bg-muted text-foreground")}
      disabled={disabled}
      onClick={onClick}
      size="icon-sm"
      title={label}
      type="button"
      variant="ghost"
    >
      {children}
    </Button>
  );
}

export function RichTextEditor({ id, value, onChange, disabled }: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3, 4] } }),
      Underline,
      Link.configure({
        autolink: true,
        defaultProtocol: "https",
        HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
        openOnClick: false,
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TextStyleKit.configure({ fontSize: { types: ["heading", "paragraph"] } }),
    ],
    content: value || "<p></p>",
    editorProps: {
      attributes: {
        class:
          "min-h-72 px-4 py-3 text-sm leading-7 text-foreground outline-none [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-bold [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-bold [&_p]:my-4 [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_blockquote]:my-5 [&_blockquote]:border-l-4 [&_blockquote]:border-primary/30 [&_blockquote]:pl-4",
      },
    },
    onUpdate: ({ editor: updatedEditor }) => onChange(updatedEditor.getHTML()),
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "<p></p>", { emitUpdate: false });
    }
  }, [editor, value]);

  if (!editor) {
    return <div className="min-h-72 animate-pulse rounded-lg border border-input bg-muted/40" />;
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Masukkan URL", previousUrl || "https://");

    if (url === null) {
      return;
    }

    if (!url.trim()) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url.trim() }).run();
  };

  return (
    <div className="overflow-hidden rounded-lg border border-input bg-background focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50">
      <div className="flex flex-wrap items-center gap-1 border-b border-border bg-muted/40 p-2">
        <ToolbarButton active={editor.isActive("bold")} disabled={disabled} label="Tebal" onClick={() => editor.chain().focus().toggleBold().run()}>
          <Bold />
        </ToolbarButton>
        <ToolbarButton active={editor.isActive("italic")} disabled={disabled} label="Miring" onClick={() => editor.chain().focus().toggleItalic().run()}>
          <Italic />
        </ToolbarButton>
        <ToolbarButton active={editor.isActive("underline")} disabled={disabled} label="Garis bawah" onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <UnderlineIcon />
        </ToolbarButton>
        <ToolbarButton active={editor.isActive("heading", { level: 2 })} disabled={disabled} label="Heading" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          <Heading2 />
        </ToolbarButton>
        <ToolbarButton active={editor.isActive("bulletList")} disabled={disabled} label="Daftar poin" onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <List />
        </ToolbarButton>
        <ToolbarButton active={editor.isActive("orderedList")} disabled={disabled} label="Daftar angka" onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <ListOrdered />
        </ToolbarButton>
        <ToolbarButton active={editor.isActive("link")} disabled={disabled} label="Tautan" onClick={setLink}>
          <Link2 />
        </ToolbarButton>
        <ToolbarButton active={editor.isActive({ textAlign: "left" })} disabled={disabled} label="Rata kiri" onClick={() => editor.chain().focus().setTextAlign("left").run()}>
          <AlignLeft />
        </ToolbarButton>
        <ToolbarButton active={editor.isActive({ textAlign: "center" })} disabled={disabled} label="Rata tengah" onClick={() => editor.chain().focus().setTextAlign("center").run()}>
          <AlignCenter />
        </ToolbarButton>
        <ToolbarButton active={editor.isActive({ textAlign: "right" })} disabled={disabled} label="Rata kanan" onClick={() => editor.chain().focus().setTextAlign("right").run()}>
          <AlignRight />
        </ToolbarButton>
        <select
          aria-label="Ukuran teks"
          className="h-7 rounded-md border border-input bg-background px-2 text-xs"
          disabled={disabled}
          onChange={(event) => {
            const size = event.target.value;
            if (size) {
              editor.chain().focus().setFontSize(size).run();
            } else {
              editor.chain().focus().unsetFontSize().run();
            }
          }}
          value={(editor.getAttributes("textStyle").fontSize as string | undefined) || ""}
        >
          <option value="">Ukuran</option>
          <option value="14px">Kecil</option>
          <option value="16px">Normal</option>
          <option value="18px">Besar</option>
          <option value="20px">Sangat besar</option>
        </select>
        <ToolbarButton disabled={disabled || !editor.can().undo()} label="Urungkan" onClick={() => editor.chain().focus().undo().run()}>
          <Undo2 />
        </ToolbarButton>
        <ToolbarButton disabled={disabled || !editor.can().redo()} label="Ulangi" onClick={() => editor.chain().focus().redo().run()}>
          <Redo2 />
        </ToolbarButton>
      </div>
      <EditorContent editor={editor} id={id} />
    </div>
  );
}
