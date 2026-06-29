"use server"
import { getToken } from "@/lib/server-utils";

export async function checkoutt(idcart:string , shippingAddress:any){
    const token = await getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/orders/checkout-session/${idcart}?url=${process.env.NEXT_PUBLIC_REDIRECT_URL}`,{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
            token
        },
        body: JSON.stringify({...shippingAddress})
    })
    
    const data = await res.json();
    // redirect(data?.session?.url);
    // console.log(data);
    return data;
}
