import { supabase } from "~/postgres/supaclient"

//loader - 예약어 함수, 렌더링 전에 실행 서버에서 실행 , 브라우저 X
export async function loader(){
    const {data} = await supabase().from("test").select("*");
    console.log(data);
}

export default function Home(){
    return <div>
        Hello World
    </div>
}
