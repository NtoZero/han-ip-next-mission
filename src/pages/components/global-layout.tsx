import {ReactNode} from "react";
import Link from "next/link";
import style from "./global-layout.module.css"

export default function GlobalLayout({children} : {children: ReactNode}) {
    return (
        <div className="container">
            <header className={style.header}>
                <Link href={"/"}>
                    ONEBITE_CINEMA
                </Link>
            </header>
        {/*children 요소 받기*/}
        {children}
        </div>
    )
}