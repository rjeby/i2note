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

export interface RequestState {
  status: RequestStatus;
  error: string | null;
}

export type NoteType = "all-notes" | "archived-notes";
export type RequestStatus = "idle" | "pending" | "succeeded" | "failed";
export type ResponseSuccess = { message: string };
export type ResponseError = { message: string };
