'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import Button from '../common/button/Button';
import FormTitle from './FormTitle';
import { SettingSchema, SettingSchemaType } from '@/lib/validation';
import TextField from '../auth/TextField';
import { updateUser } from '@/services/setting';
import ProfileField from './ProfileField';

interface Props {
  name: string;
  profile?: File;
}

export default function SettingForm() {
  const { data, status, update } = useSession();
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

  const {
    reset,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SettingSchemaType>({
    resolver: zodResolver(SettingSchema),
    mode: 'onChange',
  });

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
            <div className="min-h-11 overflow-x-auto rounded-xl bg-gs200 px-4 py-3 text-14R 2xl:h-12 2xl:text-16R">
              {data?.user?.email}
            </div>
          </div>
          <TextField
            label="닉네임"
            name="name"
            placeholder="변경할 닉네임을 입력해주세요"
            register={register}
            errors={errors}
          />
        </div>
      </FormTitle>

      <Button
        type="submit"
        className="my-3 ml-auto flex-none 2xl:my-4"
        size="medium"
      >
        변경
      </Button>
    </form>
  );
}
