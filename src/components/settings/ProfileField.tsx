'use client';

import Image from 'next/image';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from 'react';
import FormTitle from './FormTitle';
import Icon from '@/components/common/icon/Icon';
import NonProfile from '../common/NonProfile';

interface Props {
  url: string;
  onChange: (file?: File) => void;
}

export default function ProfileForm({ url, onChange }: Props) {
  const [imageUrl, setImageUrl] = useState<string>(url);

  /**
   * 사진 삭제 눌렀을 때, 미리보기 이미지 없애주는 함수
   */
  const deleteImage = () => {
    setImageUrl(url);
    onChange();
  };

  /**
   * @param e 파일 선택했을 때 이벤트
   * 파일 크기 확인 & 미리보기 url생성해서 imageUrl에 할당하는 함수
   */
  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file && file.size > 5 * 1024 * 1024) {
      alert('파일 크기가 5MB를 초과합니다. 다른 파일을 선택해주세요.');
      e.target.value = ''; // 선택된 파일 초기화
      return;
    }

    if (file) {
      const fileUrl = URL.createObjectURL(file); // 로컬 URL 생성
      setImageUrl(fileUrl);
      onChange(file);
    }
  };

  /**
   * 새로 업로드한 url에 한해서 url메모리 해제
   */
  useEffect(() => {
    return () => {
      if (imageUrl && imageUrl !== url) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl, url]);

  return (
    <FormTitle title="프로필 사진">
      <div className="flex size-full flex-col gap-3">
        <div className="flex flex-col items-center gap-3 md:flex-row">
          {imageUrl ? (
            <Image
              className="size-20 flex-none rounded-full object-cover"
              src={imageUrl}
              alt="profileImage"
              width="80"
              height="80"
            />
          ) : (
            <NonProfile className="size-20 flex-none rounded-full object-cover" />
          )}
          <label
            className="flex cursor-pointer flex-row items-center gap-2 rounded-full border border-gs300 px-6 py-2 hover:border-slate500 hover:text-slate500"
            htmlFor="uploadImage"
          >
            <Icon icon={faPenToSquare} />
            <span className="text-14M md:hidden lg:inline">사진 변경</span>
            <input
              className="hidden"
              type="file"
              accept="image/jpeg, image/png"
              id="uploadImage"
              onChange={uploadImage}
            />
          </label>
          <button
            type="button"
            className="text-14R text-warn500 underline"
            onClick={deleteImage}
          >
            사진 삭제
          </button>
        </div>
        <span className="text-14M text-gs500 2xl:text-16M">
          5mb 이하의 JPG, JPEG, PNG 파일만 가능합니다.
        </span>
      </div>
    </FormTitle>
  );
}
