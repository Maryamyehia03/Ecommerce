"use client";
import { useRouter } from "next/navigation";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ResetPassword } from "@/app/service/ResetPassword";
import { signIn } from "next-auth/react";
import { formSchema } from "./schema";

export default function Resetpassword() {
  const router = useRouter();

    const form = useForm({resolver: zodResolver(formSchema),
      defaultValues: {
        email: "",
        newPassword:""
      },
    })

  async function sendnewpassword(data: z.infer<typeof formSchema>) {
    
    const res = await ResetPassword(data);
    console.log(res);
    if(res?.token){
        const response = await signIn('credentials',{
            email: data?.email,
            password: data?.newPassword,
            callbackUrl:"/",
            redirect:false,
    })
    console.log(response);
    if(response?.ok) router.replace("/");
    
  }
  }
    
  return (
    <>
   <div className="flex flex-col items-center my-20">
    <h1 className="text-2xl font-semibold mb-6">Please enter your verification code</h1>
     <Form {...form}>
      <form onSubmit={form.handleSubmit(sendnewpassword)} className="space-y-8 w-md">

        {/* ***************email********** */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@example.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />

        {/* ***************password********** */}
                <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mt-8">New Password</FormLabel>
              <FormControl>
                <Input  placeholder="************" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
   </div>
          </>
  );
}


