import { NextRequest, NextResponse } from 'next/server';
import { postConfig, CODEITURL, BACKENDURL } from '@/services/constants';
import { apiHandler } from '@/services/apiHandler';

export const POST = apiHandler(async (req: NextRequest) => {
  const requestBody = await req.json(); // 클라이언트에서 받은 데이터

  try {
    // 첫 번째 API 요청 (CODEITURL 사용)
    const codeitResponse = await fetch(
      `${CODEITURL}/todos`,
      await postConfig(requestBody), // 요청 데이터 포함
    );

    if (!codeitResponse.ok) {
      throw new Error('CODEIT 할 일 생성 실패');
    }

    const codeitData = await codeitResponse.json();
    const { id: todoId, noteId } = codeitData; // 생성된 todo ID, note ID

    // 두 번째 API 요청 (BACKENDURL 사용)
    const backendResponse = await fetch(
      `${BACKENDURL}/todos`,
      await postConfig({ ...requestBody, todoId, noteId }), // body에 추가된 todoId, noteId
    );

    if (!backendResponse.ok) {
      throw new Error('백엔드 할 일 생성 실패');
    }

    const backendData = await backendResponse.json();

    // 성공적인 응답을 클라이언트에 반환
    return NextResponse.json({
      message: '할 일 생성 완료',
      codeitTodo: codeitData,
      backendTodo: backendData,
    });
  } catch (error) {
    console.error('API 호출 중 오류 발생:', error);
    return NextResponse.json(
      { message: 'API 호출 중 오류 발생' },
      { status: 500 },
    );
  }
});
