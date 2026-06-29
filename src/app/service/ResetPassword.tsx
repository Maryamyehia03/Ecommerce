"use server"

import { formSchema } from "../auth/Resetpassword/schema";
import z from "zod";

export async function ResetPassword(data:z.infer<typeof formSchema>) {
  try {
    console.log(data);
    
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ecommerce.routemisr.com/api/v1';
    const res = await fetch(`${baseUrl}/auth/resetPassword`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    // console.log(res);
    if (!res.ok) {
      return { error: res?.statusText || "Failed to reset password" };
    }
    const result = await res.json();
    return result;
    }
    catch (err: any) {
    return { error: err?.message };
  }
}

export async function forgetPasswords(email:string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ecommerce.routemisr.com/api/v1';
    const res = await fetch(`${baseUrl}/auth/forgotPasswords`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email}),
    });

    // console.log(res);
    
    
    if (!res.ok) {
      return { error: res?.statusText || "Failed to send forgot password request" };
    }
    
    return await res.json();
  } catch (err: Error | any) {
    return { error: err?.message };
  }
}

export async function verifyCode(resetCode: string) {
  console.log({resetCode});
  
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ecommerce.routemisr.com/api/v1';
    const res = await fetch(`${baseUrl}/auth/verifyResetCode`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({resetCode}),
    });
    console.log(res);
    
    if (!res.ok) {
      return { error: res.statusText || "Failed to verify code" };
    }
    
    return await res.json();
  } catch (err: any) {
    return { error: err.message };
  }
}
