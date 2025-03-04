export interface NoteFormControlProps {
  control?: Control<{
    title: string;
    content: string;
  }>;
  errors?: FieldErrors<{
    title: string;
    content: string;
  }>;
  isValid?: boolean;
  getValues?: UseFormGetValues<{
    title: string;
    content: string;
  }>;
  setError?: UseFormSetError<{
    title: string;
    content: string;
  }>;
  clearErrors?: UseFormClearErrors<{
    title: string;
    content: string;
  }>;
  watch?: UseFormWatch<{
    title: string;
    content: string;
  }>;
  trigger?: UseFormTrigger<{
    title: string;
    content: string;
  }>;
}
