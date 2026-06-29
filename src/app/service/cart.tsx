"use server";

import { getToken } from '@/lib/server-utils';

export default async function getUserCart() {
    const token = await getToken();
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/cart`,
        {
            headers: {
                token,
                "content-type": "application/json",
            },
        }
    )
    return await data?.json();
}

export async function deleteUserCart(id:string) {
    const token = await getToken();
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/cart/${id}`,
        {
            method: 'DELETE',
            headers: {
                token,
                "content-type": "application/json",
            },
        }
    )
    return await data?.json();
}

export async function clearUserCart() {
    const token = await getToken();
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/cart`,
        {
            method: 'DELETE',
            headers: {
                token,
                "content-type": "application/json",
            },
        }
    )
    return await data?.json();
}

export async function addUserCart(productId:string){
    const token = await getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/cart`,{
        method:"POST",
        headers:{token,
            "content-type": "application/json",
        },
        body:JSON.stringify({productId})
    });
    return await res.json();
}

export async function updateUserCart(id:string , count:number){
    const token = await getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/cart/${id}`,{
        method:"PUT",
        headers:{token,
            "content-type": "application/json",
        },
        body:JSON.stringify({count})
    });
    return await res.json();
}


