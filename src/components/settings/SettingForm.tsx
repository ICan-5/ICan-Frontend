'use client';

/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import Button from '../common/button/Button';
import FormTitle from './FormTitle';
import { SettingSchema, SettingSchemaType } from '@/lib/validation';
import { updateUser } from '@/services/setting';
import ProfileField from './ProfileField';
import ErrorMessage from '../auth/ErrorMessage';
import cn from '@/utils/cn';

interface Props {
  name: string;
  profile?: File;
}

export default function SettingForm() {
  const { data, status, update } = useSession();

  /** use-hook-form관련 함수 */
  const {
    reset,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<SettingSchemaType>({
    resolver: zodResolver(SettingSchema),
    mode: 'onChange',
  });
  /**
   * updateUser에서 오류나면 error message string 리턴
   * updateUser가 성공하면 session data 업데이트
   */
  const onSubmit = async (formData: Props) => {
    const { name, profile } = formData;
    const formDataInstance = new FormData();
    formDataInstance.append(
      'user',
      new Blob([JSON.stringify({ name })], { type: 'application/json' }),
    );
    if (profile) formDataInstance.append('image', profile);

    const res = await updateUser(formDataInstance);
    if (typeof res === 'string') {
      toast.error(res);
      return;
    }

    const picture = `${res.profile}?v=${Date.now()}`;
    update({ name: res.name, picture });
    toast.success('프로필 수정에 성공하였습니다.');
  };

  const isSameName = watch('profile')
    ? !isValid
    : !data?.user?.name || watch('name') === data?.user?.name || !isValid;

  useEffect(() => {
    if (status === 'authenticated' && data?.user?.name) {
      reset({ name: data.user.name }); // 세션이 로딩된 후 기본값 설정
    }
  }, [status, data, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col rounded-b-2xl border-x-2 border-b-2 border-gs200 bg-gs00 px-4 2xl:rounded-b-3xl"
    >
      <ProfileField onChange={(file?: File) => setValue('profile', file)} />
      <hr className="border border-gs200" />
      <FormTitle title="사용자 정보">
        <div className="flex w-full flex-col">
          <div className="mb-6 flex w-full flex-col gap-2 text-14M text-gs400 2xl:gap-3 2xl:text-16M">
            <p>이메일</p>
            <div className="h-11 overflow-x-auto overflow-y-hidden rounded-xl bg-gs200 px-4 py-3 text-14R 2xl:h-12 2xl:text-16R">
              {data?.user?.email}
            </div>
          </div>
          <label
            className="mb-6 flex w-full flex-col gap-2 text-14M text-gs400 2xl:gap-3 2xl:text-16M"
            htmlFor="name"
          >
            <p>닉네임</p>
            <input
              className={cn(
                'overflow-x-auto overflow-y-hidden rounded-xl border bg-slate50 px-4 py-3 text-14R text-gsBk 2xl:h-12 2xl:text-16R',
                'border-transparent focus:border-slate500 focus:outline-none',
                errors.name && 'bg-warn50 focus:border-warn500',
              )}
              id="name"
              type="text"
              placeholder="변경할 닉네임을 입력해주세요"
              {...register('name')}
            />
            {errors.name && (
              <ErrorMessage message={String(errors.name?.message || '')} />
            )}
          </label>
        </div>
      </FormTitle>

      <Button
        type="submit"
        className="my-3 ml-auto flex-none 2xl:my-4"
        size="medium"
        disabled={isSameName}
      >
        변경
      </Button>
    </form>
  );
}
