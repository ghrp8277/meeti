import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // 추가 미들웨어 로직이 필요한 경우 여기에 작성
    console.log("Protected route accessed:", req.nextUrl.pathname);
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // 토큰이 있으면 인증된 사용자
        return !!token;
      },
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/profile/:path*",
    "/settings/:path*",
    // 보호하고 싶은 경로들을 여기에 추가
  ],
};
