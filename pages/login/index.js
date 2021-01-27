
import { useForm } from 'react-hook-form'
import {loginEmailPassword} from './api'

export default function Login(){

  const { register, errors, handleSubmit, setValue } = useForm({
      mode: 'onChange',
  });
  function onSubmit(data) {
    console.log(data)
    loginEmailPassword(data)
  };
  function maskPassword(password){
    return password.replaceAll(/\w/ig, '*')
  }

  
      return (
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
              <label htmlFor="email" >
                Email
              </label>
              <input placeholder="abc@example.com" name="email" ref={register({ required: true })} />
              {errors.email && 'This is required'}
            </div>
            <div>
              <label htmlFor="password" >
                Password
              </label>
              <input
                name="password" ref={register({ required: true })} 
              />
              {errors.email && 'This is required'}
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      );


}