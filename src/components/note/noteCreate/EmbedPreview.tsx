import { useEffect, useRef, useState } from 'react';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import Icon from '../../common/icon/Icon';

type Props = {
  embedUrl: string;
  embedVisible: boolean;
  onClose: () => void;
};

export default function EmbedPreview({
  embedUrl,
  embedVisible,
  onClose,
}: Props) {
  // 오브젝트 대체
  const [fallback, setFallback] = useState(false);
  const objectRef = useRef<HTMLObjectElement | null>(null);

  useEffect(() => {
    if (!embedUrl || !embedVisible) return undefined;

    const objectEl = objectRef.current;
    if (!objectEl) return undefined;

    const timer = setTimeout(() => {
      if (
        objectEl &&
        (objectEl.clientWidth === 0 || objectEl.clientHeight === 0)
      ) {
        // iframe 대체
        setFallback(true);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [embedUrl, embedVisible]);

  if (!embedVisible || !embedUrl) return null;

  return (
    <section className="relative h-auto flex-1 md:min-w-52 lg:h-full">
      {fallback ? (
        <iframe
          src={embedUrl}
          key={embedUrl}
          className="size-full min-h-80 rounded-2xl"
          title="EmbeddedContent"
          sandbox="allow-scripts allow-same-origin allow-popups allow-presentation"
          referrerPolicy="no-referrer"
        />
      ) : (
        <object
          ref={objectRef}
          data={embedUrl}
          key={embedUrl}
          className="flex size-full min-h-80 items-center justify-center break-keep rounded-2xl bg-gs200 px-4 text-center"
        >
          <p>
            <a
              href={embedUrl}
              target="_blank"
              rel="noreferrer"
              className="text-slate500 underline underline-offset-4 transition-colors hover:text-slate700 focus:text-slate700 active:text-slate700"
            >
              링크 열기
            </a>
            <br />
            <span className="mt-3 inline-block text-14R text-gs600">
              이 콘텐츠는 미리보기를 제공하지 않습니다
              <br />
              링크로 이동하여 콘텐츠를 확인하세요
            </span>
          </p>
        </object>
      )}

      <button type="button" onClick={onClose}>
        <Icon
          icon={faClose}
          className="absolute right-4 top-4 rounded-full bg-gs600 text-gs00 transition-colors hover:bg-gs700 focus:bg-gs700 active:bg-gs700"
        />
      </button>
    </section>
  );
}
