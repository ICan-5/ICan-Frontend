export interface NoteFormControlProps {
  control?: Control<{
    title: string;
    content: string;
    linkUrl?: string;
  }>;
  errors?: FieldErrors<{
    title: string;
    content: string;
    linkUrl?: string;
  }>;
  isValid?: boolean;
  getValues?: UseFormGetValues<{
    title: string;
    content: string;
    linkUrl?: string;
  }>;
  setError?: UseFormSetError<{
    title: string;
    content: string;
    linkUrl?: string;
  }>;
  clearErrors?: UseFormClearErrors<{
    title: string;
    content: string;
    linkUrl?: string;
  }>;
  watch?: UseFormWatch<{
    title: string;
    content: string;
    linkUrl?: string;
  }>;
  trigger?: UseFormTrigger<{
    title: string;
    content: string;
    linkUrl?: string;
  }>;
  setValue?: UseFormSetValue<{
    title: string;
    content: string;
    linkUrl?: string;
  }>;
  setEmbedVisible?: (val: boolean) => void;
}

export interface NoteDetail {
  goalTitle?: string | null;
  todoTitle: string;
  title: string;
  content: string;
  linkUrl?: string | null;
  updatedAt: string;
}
