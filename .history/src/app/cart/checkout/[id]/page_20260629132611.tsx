"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { redirect, useParams, useRouter } from "next/navigation"
import { toast } from "sonner"
import { checkoutt } from "@/app/service/checkout"

const formSchema = z.object({
  details: z.string(),
  phone: z.string(),
  city:z.string()
})

export default function Page() {
    const {id}:{id:string} = useParams();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      details: "",
      phone: "",
      city: ""
    }
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const formdata ={shippingAddress:data};
    const res = await checkoutt(id, formdata );

    if(res?.status === "success"){
      // toast.success(res?.status);
      redirect(res?.session?.url);
    }else{
      toast.error("There is no items in the cart!");
    }
  }

  return (
   <div className="flex justify-center items-center h-screen">
     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-md">
        <FormField
          control={form.control}
          name="details"
          render={({ field }) => (
            <FormItem>
              <FormLabel>details</FormLabel>
              <FormControl>
                <Input placeholder="" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>phone</FormLabel>
              <FormControl>
                <Input placeholder="" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>city</FormLabel>
              <FormControl>
                <Input placeholder="" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Pay </Button>
      </form>
    </Form>
   </div>
  )
}