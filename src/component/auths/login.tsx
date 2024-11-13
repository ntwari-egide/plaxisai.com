/* eslint-disable no-console */
import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from '@react-oauth/google';
import { Button, Input, message } from 'antd';
import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { RiArrowRightLine, RiLinkedinFill } from 'react-icons/ri';
import { LinkedIn } from 'react-linkedin-login-oauth2';

import { encryptData } from '@/utils/encryptions';

interface LoginResponseType {
  // Define this interface based on the response structure from your backend
  token: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

const LoginComponent = () => {

  // states
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const router = useRouter(); // Initialize navigate for redirection

  // Replace with your Google Client ID
  const GOOGLE_CLIENT_ID =
    '510410189536-qsibj18mg602mo7q5f5lqd56gngc7f7o.apps.googleusercontent.com';

  // Function to handle the Google login response
  const handleLogin = async (credentialResponse: CredentialResponse) => {
    const idToken = credentialResponse.credential; // Get the ID token from Google

    if (!idToken) {
      console.error('No ID token provided');
      return;
    }

    try {
      // Send ID token to backend
      const response = await axios.post(
        'http://localhost:8080/api/v1/auth/google/login', // Update with your backend URL
        { idToken },
        { headers: { 'Content-Type': 'application/json' } }
      );

      // save the user response in cookies.
      Cookies.set('user-credentials',  await encryptData(JSON.stringify(response.data)), { expires: 7 });

    } catch (error) {
      if (axios.isAxiosError(error)) {
        // console.error(
        //   'Login error:',
        //   error.response ? error.response.data : error.message
        // );
      } else {
        // console.error('Unexpected error:', error);
      }
    }
  };

  const handleSuccess = async (code: string) => {
    setIsLoading

    try {
      // Send the authorization code to your backend
      const response = await axios.post<LoginResponseType>(
        'http://localhost:8080/auth/linkedin/login',
        { token: code },
        { headers: { 'Content-Type': 'application/json' } }
      );
      // Optionally, handle the successful login, e.g., store token, navigate
      // save the user response in cookies.
      Cookies.set('user-credentials',  await encryptData(JSON.stringify(response.data)), { expires: 7 });

    } catch (error) {
      console.error('Error logging in with LinkedIn:', error);
    }
  };

  const handleEmailLogin = async () => {

    if ( !email || !password) {
      message.error(" Please fill in credentials")
      return;
    }
  
    setIsLoading(true);

    try {
      // Send the authorization code to your backend
      const response = await axios.post(
        'http://localhost:8080/api/v1/auth/email/login',
        {
          email,
          password,
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      // save the user response in cookies.
      Cookies.set('user-credentials',  await encryptData(JSON.stringify(response.data)), { expires: 7 });

      // setting the user credentials to empty
      setEmail("");
      setPassword("");
  
      // Optionally, handle successful login
    } catch (error) {
      const axiosError = error as AxiosError;
  
      if (axiosError.response) {
        if (axiosError.response.status === 422) {
          // Redirect to signup if user not registered
          message.info('User not found. Redirecting to signup.');
          router.push('/signup'); // Redirects to the signup page

          //setting login credentials to empty
          setEmail("");
          setPassword("");
        } else {
          message.error(`Error ${axiosError.response.status}: ${axiosError.response.data || 'Error logging in with your email. Try again!'}`);
        }
      } else {
        message.error('Network error. Please check your connection.');
        setPassword("");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center object-center mt-[10vh]'>
      <div className='border-[1px] border-[#E6E6E7] rounded-xl ipad-portrait:w-[80vw] w-[80vw] md:w-[35vw] flex flex-col py-[4vh] gap-[3vh]'>
        <div className='flex flex-col object-center items-center justify-center'>
          <h1 className='text-[#000000] md:text-[2.5vh] font-bold whyteInktrap_font   md:text-start leading-[5vh] text-center'>
            Login to Plaxis AI
          </h1>
          <p className='md:w-[20vw] ipad-portrait:w-full inter-tight  font-normal text-[1.7vh] text-center'>
            Unlock your career: Just upload your resume
          </p>
        </div>

        <div className='mt-[2vh] gap-[2vh] flex flex-col items-center'>
          <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <GoogleLogin
              onSuccess={handleLogin}
              text='continue_with'
              width={300}
              onError={() => console.error('Login Failed')}
            />
          </GoogleOAuthProvider>

          <LinkedIn
            clientId='78eruy1o6h1won'
            redirectUri='http://localhost:3000/auth/google'
            onSuccess={handleSuccess}
            scope='r_liteprofile r_emailaddress'
          >
            {({ linkedInLogin }) => (
              <div
                onClick={linkedInLogin} // Call the linkedInLogin function when the div is clicked
                className='flex flex-row gap-[2vw] w-[70vw] md:w-[20vw] ipad-portrait:w-[60vw] border border-[#E6E6E7] py-[1vh] cursor-pointer hover:scale-[1.02] transition-all px-[2vw] rounded-md justify-center items-center'
              >
                <RiLinkedinFill className='text-[2vh]' />
                <p className='inter-tight font-medium text-[1.7vh] ipad-portrait:w-[30vw] md:w-[15vw]'>
                  Continue with LinkedIn
                </p>
              </div>
            )}
          </LinkedIn>
        </div>
        <div className='mt-[2vh] flex flex-col items-center '>
          <div className='md:w-[20vw] w-[70vw] flex-col flex gap-[2vh] ipad-portrait:w-[60vw]'>
            <p className='inter-tight  font-semibold text-[1.7vh] text-start'>
              Email
            </p>
            <p className='inter-tight  font-normal text-[1.7vh] text-start'>
              If you have school email, please use it.
            </p>

            <Input
              type='email'
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email address'
              className='outline-none border-[#E6E6E7] border rounded-md inter-tight placeholder:text-[#848486] placeholder:font-semibold text-[2vh]'
            />

            <p className='inter-tight  font-semibold text-[1.7vh] text-start'>
              Password
            </p>

            <Input
              type='password'
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password*'
              className='outline-none border-[#E6E6E7] border rounded-md inter-tight placeholder:text-[#848486] placeholder:font-semibold text-[2vh]'
            />

            <Button loading={isLoading} onClick={handleEmailLogin} className='inter-tight bg-[#F28729] rounded-full border-[#F28729] py-[3vh] hover:text-[#09090D] font-semibold text-[#09090D] ipad-portrait:text-[2vh] cursor-pointer hover:scale-[1.02]'>
              Login
              <RiArrowRightLine className='text-[3vh]' />
            </Button>
          </div>
        </div>
      </div>
      <p className='mt-[3vh] inter-tight text-[#848486] md:w-[20vw] ipad-portrait:w-[80vw] text-[1.7vh] text-center font-medium w-[80vw]'>
        By clicking “Create Account” above, you acknowledge that you have read
        and understood, and agree to Plaxis AI’s <br />
        <span className='text-[#09090D] cursor-pointer hover:underline'>
          {' '}
          Terms and Privacy.
        </span>
      </p>
    </div>
  );
};

export default LoginComponent;
