import "@/styles/globals.css";
import type {AppProps} from "next/app";
import GlobalLayout from "@/components/global-layout";
import {NextPage} from "next";
import {ReactNode} from "react";

/* NextPage 타입과 교집합 타입 추가*/
type NextPageWithLayout = NextPage & {
    /*getLayout은 옵셔널한 타입으로 선언하여 필요한 경우에만 렌더링*/
    getLayout?: (page: ReactNode) => ReactNode;
}

export default function App({ Component, pageProps }: AppProps & {
    /* AppProps 타입과 교집합 타입 선언 */
    Component: NextPageWithLayout;
}) {

    const getLayout = Component.getLayout ?? ((page: ReactNode) => page);
  return(
    <div>
        <GlobalLayout>
            {getLayout(<Component {...pageProps} />)}
        </GlobalLayout>
    </div>
  );
}
