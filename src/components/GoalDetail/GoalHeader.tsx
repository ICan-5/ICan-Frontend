import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faEllipsisV } from '@fortawesome/free-solid-svg-icons';

interface GoalHeaderProps {
  toggleMenu: () => void;
  isMenuOpen: boolean;
  menuRef: React.RefObject<HTMLDivElement>;
}

export default function GoalHeader({
  toggleMenu,
  isMenuOpen, //메뉴바 열림 유무
  menuRef, //외부 영역 클릭 시 메뉴바 닫힘
}: GoalHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="flex items-center text-xl font-bold">
        <FontAwesomeIcon icon={faFlag} className="mr-2 text-blue-500" />
        자바스크립트로 웹 서비스 만들기
      </h1>
      <div ref={menuRef}>
        <FontAwesomeIcon
          icon={faEllipsisV}
          className="cursor-pointer text-gray-500"
          onClick={toggleMenu}
        />
        {isMenuOpen && (
          <div className="absolute right-12 mt-2 rounded bg-white shadow-md">
            <button className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-200">
              목표 색상 변경
            </button>
            <button className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-200">
              수정하기
            </button>
            <button className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-200">
              삭제하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
