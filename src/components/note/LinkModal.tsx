import { createPortal } from 'react-dom';
// import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Button from '../common/button/Button';

interface Props {
  onClose: () => void;
}

export default function LinkModal({ onClose }: Props) {
  // const [noteLink, setNoteLink] = useState<string>('');
  const {
    control,
    formState: { isValid },
  } = useForm({
    // resolver: zodResolver(LoginSchema),
    mode: 'onChange',
  });
  return createPortal(
    // 모달 딤
    <div
      className="fixed inset-0 z-40 flex size-full cursor-pointer items-center justify-center bg-black/50"
      onClick={onClose}
    >
      {/* 모달 내용 */}
      <div
        className="mx-6 flex w-full max-w-[520px] cursor-default flex-col rounded-xl bg-gs00 p-6 sm:w-[520px]"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h4 className="mb-6 text-18M text-gsBk">링크 업로드</h4>
        <div className="">
          <label
            htmlFor="link"
            className="mb-9 flex flex-col gap-3 text-14M text-gs600"
          >
            {/* 라벨 에러 방지용 */}
            링크 주소
            <Controller
              control={control}
              name="link"
              rules={{
                required: '링크를 입력해주세요',
                pattern: {
                  value: /^(http|https):\/\/[\w]+(\.[\w]+)+[/#?]?.*$/,
                  message: '유효한 URL을 입력해주세요',
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <input
                    id="link"
                    /* eslint-disable react/jsx-props-no-spreading */
                    {...field}
                    className="rounded-xl bg-slate50 px-4 py-3 text-16R placeholder:text-gs400"
                    placeholder="링크 주소를 입력해 주세요"
                  />
                  {error && (
                    <span className="text-red-500">{error.message}</span>
                  )}
                </>
              )}
            />
          </label>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="full"
              className="border-none bg-gs100 py-4 text-gs600 transition-colors hover:bg-gs200"
              // onClick={onClose}
              onClick={onClose}
            >
              취소
            </Button>
            <Button
              disabled={!isValid}
              size="full"
              variant="default"
              className="transition-colors"
            >
              확인
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
