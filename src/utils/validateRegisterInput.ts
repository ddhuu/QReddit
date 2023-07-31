import { RegisterInput } from '../types/RegisterInput';

export const validateRegisterInput = (registerInput: RegisterInput ) => {
    if (!registerInput.email.includes('@'))
    {
      return {
      message : 'Invalid email',
      error: [{
        field :'email',
        message:'Email must include @ symbol'}
      ]
    }
    }
    if(registerInput.username.length <= 4)
    {
      return{
        message: 'Invalid username',
        error: [
          {
            field: 'username',
            message: ' Length  must be at least 4 characters'
          }
        ]
      }
    }

    if (registerInput.password.length <= 4)
    {
      return{
        message: 'Invalid Password',
        error: [
          {
            field: 'password',
            message: ' Length  must be at least 4 characters'
          }
        ]
      }
    }
    return null


    
}