import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from 'react-router-dom'

import {
  Form,
  FormControl,
  //FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

import { Button } from "@/components/ui/button"
import { SigninValidation } from "@/lib/validation";
import { z } from "zod";
import Loader from "@/components/shared/Loader";
import { useSignInAccountMutation } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";



const SigninForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const {mutateAsync: SignInAccount } = useSignInAccountMutation();

  //Defining the form
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: '',
      password: '',
    },
  })


  //Def 2
  async function onSubmit(values: z.infer<typeof SigninValidation>) {

    const session = await SignInAccount({
      email: values.email,
      password: values.password,
    })

    if(!session) {
      return toast({ title: 'Log-in Session Failed. Please try again...'})
    }

    const isLoggedIn = await checkAuthUser();

    if(isLoggedIn) {
      form.reset();

      navigate('/')
    }else {
       return toast({ title: 'Log in Failed. Please try again...'})
    }

  }
  return (
    
      <Form {...form}>

        <div className="sm:w-420 flex-center flex-col">
          <img src="/assets/images/logo.png" alt="logo" />

          <h2 className="h3-bold md:h2-bold pt-5 sm:pt-8">
            Wisdom Awaits You...
          </h2>
          <p className="text-light-3 small-medium md:base-regular mt-2"> enter your details to log in
          </p>

        

          <form onSubmit={ form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
           
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" className="shad-input" {...field} />
                  </FormControl>
                  
                  <FormMessage />
                </FormItem>
              )}
            />
                        <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" className="shad-input" {...field} />
                  </FormControl>
                  
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit"
            className="shad-button_primary">
              {isUserLoading ? (
                <div className="flex-center gap-2">
                     <Loader/>Loading...
                </div>
               ): "Log In" }
              </Button>
              <p className="text-small-regular text-light-2 text-center mt-2">
                Dont have an account, Sign up today.
                <Link to="/sign-up" className="text-primary-500 text-small-semibold ml-2">Sign Up</Link>
              </p>
          </form>
        </div>
      </Form>
    
  )
}

export default SigninForm