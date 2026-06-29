"use server";

import { getToken } from "@/lib/server-utils";

export async function addUserWishlist(productId:string){
    const token = await getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/wishlist`,{
        method:"POST",
        headers:{token,
            "content-type": "application/json",
        },
        body:JSON.stringify({productId})
    });
    return await res.json();
}

export async function deleteUserWishlist(id:string){
    const token = await getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/wishlist/${id}`,{
        method:"DELETE",
        headers:{token,
            "content-type": "application/json",
        },
    });
    return await res.json();
}

export async function getUserWishlist(){
    const token = await getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/wishlist`,{
        method:"GET",
        headers:{token,
            "content-type": "application/json",
        },
    });
    return await res.json();
}