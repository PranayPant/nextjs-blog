import Head from 'next/head';
import { useForm } from 'react-hook-form';
import GoogleLogin from 'react-google-login';

export default function Login() {
   const { register, errors, handleSubmit, setValue } = useForm({
      mode: 'onChange',
   });
   function onSubmit(data) {
      console.log(data);
   }
   function maskPassword(password) {
      return password.replaceAll(/\w/gi, '*');
   }

   function responseGoogle(data) {
      console.log(data);
   }

   return (
      <>
         <div className="App">
            <form onSubmit={handleSubmit(onSubmit)}>
               <div>
                  <label htmlFor="firstName">First Name</label>
                  <input
                     name="firstName"
                     placeholder="First Name"
                     ref={register({ required: true })}
                  />
                  {errors.firstName && 'This is required'}
               </div>

               <div>
                  <label htmlFor="lastName">Last Name</label>
                  <input
                     name="lastName"
                     placeholder="Last Name"
                     ref={register({ required: true })}
                  />
                  {errors.lastName && 'This is required'}
               </div>

               <div>
                  <label htmlFor="email">Email</label>
                  <input
                     placeholder="abc@example.com"
                     name="email"
                     ref={register({ required: true })}
                  />
                  {errors.email && 'This is required'}
               </div>
               <div>
                  <label htmlFor="password">Password</label>
                  <input name="password" ref={register({ required: true })} />
                  {errors.email && 'This is required'}
               </div>
               <button type="submit">Submit</button>
            </form>
            <GoogleLogin
               clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
               buttonText="Login"
               onSuccess={responseGoogle}
               onFailure={responseGoogle}
               cookiePolicy={'single_host_origin'}
            />
         </div>
      </>
   );
}
