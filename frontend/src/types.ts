export interface Note {
  id: number;
  title: string;
  content: string;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Tag {
  id: number;
  content: string;
}

export interface NoteTag {
  noteId: number;
  tagId: number;
}

export interface Message {
  uuid: string;
  content: string;
  type: "error" | "success";
}

export interface ShowNotesProps {
  type: NoteType;
}
export interface NoteInfoCardProps {
  note: Note;
}

export interface TagCardProps {
  tag: string;
}

export interface MessageProps {
  message: Message;
}

export type NoteType = "all-notes" | "archived-notes";
