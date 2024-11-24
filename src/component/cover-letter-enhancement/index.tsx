/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable jsx-a11y/alt-text */
import { SendOutlined } from '@ant-design/icons';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { Button, Image, Input, message, Skeleton } from 'antd';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { RiDownloadLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';

import logger from '@/lib/logger';

import { RootState } from '@/store';

import { coverLetterEnhancementsRequest } from '@/features/cover-letter';
import { ResumeEnhancementsRequest } from '@/features/resume-enhancements';
import { getRealUserInfo, validateJwtToken } from '@/utils/auth';
import { decryptData } from '@/utils/encryptions';

import PlaxisAITag from '../job-details/ai-tag';
import PlaxisAIMessage from '../resume-enhancement/ai-message';
import UserMessage from '../resume-enhancement/user-message';
import AIDarkImg from '../../../public/images/ai-icon.png';

type CoverLetterLayoutProps = {
  jobId: string | string[] | undefined;
};

type ChatContent = {
  role: 'user' | 'plaxis-ai';
  content: string;
};

const CoverLetterEnhancementLayout = ({ jobId }: CoverLetterLayoutProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [jobDescription, setJobDescriptions] = useState<string>();
  const [oldResumeContnet, setOldResumeContent] = useState<string>();

  const [chatContent, setChatContent] = useState<ChatContent[]>([]);

  const [userPrompt, setUserPrompt] = useState<string>();

  const [userDetails, setUserDetails] = useState<any>();

  const [userMessageCount, setUserMessageCount] = useState(0); // Track the number of user messages

  const router = useRouter();

  const coverLetterEnhancement = useSelector(
    (state: RootState) => state.coverLetterEnhancement
  );

  const dispatch: ThunkDispatch<RootState, null, AnyAction> = useDispatch();

  // Function to scroll to the bottom of the chat container
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  };

  // Scroll to the bottom when the component mounts or updates (e.g., new messages)
  useEffect(() => {
    scrollToBottom();
  }, [chatContent]);

  //getting all required data on the initial loading
  useEffect(() => {
    const getData = async () => {
      try {
        // Retrieve job matches from localStorage
        const rawData = localStorage.getItem('job-matches');
        if (!rawData) {
          router.push('/');
          return;
        }

        // Decrypt and parse job matches
        const jobs = JSON.parse(decryptData(rawData));
        const matchingJob = jobs.find(
          (job: any) => job?.jobDetails?.id === jobId
        );

        if (!matchingJob?.jobDetails?.description) {
          router.push('/');
          return;
        }

        setJobDescriptions(matchingJob?.jobDetails?.description);
        // Fetch cover letter content
        const encryptedContent = Cookies.get('resume-content');
        if (!encryptedContent) {
          router.push('/');
          return;
        }

        const content = decryptData(encryptedContent);
        if (!content?.trim()) {
          router.push('/');
          return;
        }

        setOldResumeContent(content);

        const request: ResumeEnhancementsRequest = {
          resumeText: content,
          jobDescription: matchingJob.jobDetails.description,
        };

        await dispatch(coverLetterEnhancementsRequest(request));

        // get the user information
        try {
          if (await validateJwtToken()) {
            const _userInfo = await getRealUserInfo(); // Await the async call
            setUserDetails(_userInfo.data);
          } else {
            // logger('JWT token is invalid or expired');
          }
        } catch (error) {
          // logger(error, 'Error validating token or fetching user info:');
        }
      } catch (error) {
        router.push('/');
      }
    };

    if (jobId) {
      getData();
    }
  }, [dispatch, jobId, router]);

  const handleUserPrompting = async () => {
    // Ignore empty messages
    if (!userPrompt?.trim()) {
      setUserPrompt('');
      return;
    }

    // count the messsages
    setUserMessageCount((prevCount) => prevCount + 1);

    // check if the message count is greater than 3
    if (userMessageCount > 2) {
      message.error(
        'You have reached your message limit. Please upgrade to continue.'
      );
      return;
    }

    // Append the user's input to the chat history
    setChatContent((prevChatContent) => {
      return [
        ...prevChatContent, // Existing chat history
        { role: 'user', content: userPrompt }, // New chat message
        { role: 'plaxis-ai', content: 'Got it—taking care of it!' }, // New chat message
      ];
    });

    // send the request
    const request: ResumeEnhancementsRequest = {
      resumeText: oldResumeContnet || '',
      jobDescription: jobDescription || '',
      generatedContent: coverLetterEnhancement.contentEnhanced?.newContent,
      userPrompt,
    };

    // Clear the input field
    setUserPrompt('');

    //send the request to the backend
    await dispatch(coverLetterEnhancementsRequest(request));

    // Update the "working on it" message to "done"
    setChatContent((prevChatContent) => {
      const updatedChatContent = [...prevChatContent];
      const lastAIMessageIndex = updatedChatContent.findLastIndex(
        (chat) =>
          chat.role === 'plaxis-ai' &&
          chat.content === 'Got it—taking care of it!'
      );

      if (lastAIMessageIndex !== -1) {
        // Update the message to reflect completion
        updatedChatContent[lastAIMessageIndex] = {
          ...updatedChatContent[lastAIMessageIndex],
          content: 'All done—your request has been completed!',
        };
      }

      return updatedChatContent;
    });
  };

  logger(coverLetterEnhancement.contentEnhanced?.newContent, 'contnet');
  return (
    <div className='px-[3vw] mt-[5vh]'>
      <div className='flex flex-row gap-[4vw]'>
        {coverLetterEnhancement.contentEnhanced &&
        !coverLetterEnhancement.loading ? (
          <div
            className='ipad-landscape:w-[60%] w-[65%] flex flex-col border border-[#E6E6E7] rounded-lg h-[75vh] overflow-y-scroll whitespace-break-spaces cover-letter p-[2vw]'
            dangerouslySetInnerHTML={{
              __html: coverLetterEnhancement.contentEnhanced?.newContent,
            }}
          />
        ) : (
          <Skeleton className='rounded-lg h-[75vh] ipad-landscape:w-[60%] w-[65%] border border-[#E6E6E7] p-[2vw]' />
        )}

        <div
          className='bg-[#F2F2F2] rounded-lg ipad-landscape:w-[40%] w-[35%] ipad-landscape:h-[60vh] md:h-[75vh] sticky top-[18vh] flex flex-col gap-[3vh] px-[3vh] py-[2vh]'
          ref={messagesEndRef}
        >
          {/* plaxis ai details  */}

          <PlaxisAITag />

          <div
            className=' bg-white px-[4vh] py-[3vh] rounded-md flex flex-col gap-[3vh] h-[50vh] overflow-auto overflow-y-auto'
            ref={messagesEndRef}
          >
            {chatContent ? (
              <>
                {chatContent?.map((chat, key) => (
                  <>
                    {chat.role == 'user' ? (
                      <UserMessage
                        userProfile={userDetails?.profilePic}
                        key={key}
                        message={chat.content}
                      />
                    ) : (
                      <PlaxisAIMessage message={chat.content} />
                    )}
                  </>
                ))}
              </>
            ) : (
              <>
                {' '}
                <p className='inter-tight text-[1.5vh] text-center text-[#848486] font-medium'>
                  Ask Plaxis AI Bot to improve anything...
                </p>
              </>
            )}
          </div>

          <div className='flex flex-row gap-[1vw] items-center'>
            <Image
              src={AIDarkImg.src}
              className='h-[20px] w-[20px]'
              preview={false}
            />

            <Input.TextArea
              className='border-none inter-tight placeholder:text-[#7E7E80] font-semibold text-[1.7vh] bg-[#F2F2F2]'
              placeholder='Ask me any thing ...'
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              onPressEnter={(e) => {
                e.preventDefault(); // Prevent default Enter key behavior
                handleUserPrompting();
              }}
            />

            <div className='border border-[#DBDBDB] w-[35px] h-[35px] rounded-md flex items-center object-center justify-center flex-row cursor-pointer hover:scale-[1.02] transition-all'>
              <SendOutlined className=' -rotate-45 text-[1.6vh]' />
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col items-center object-center'>
        <div className='md:w-[28vw] ipad-landscape:w-[40vw]'>
          {/* actions  */}

          <div className='flex flex-row justify-between mt-[2vh] w-full'>
            <Button className='inter-tight bg-[#348888] rounded-full border-[2px] border-[#348888] py-[3vh] hover:text-[#FFFFFF] font-semibold text-[#FFFFFF] cursor-pointer text-[1.6vh] hover:scale-[1.02] w-[40%]'>
              <RiDownloadLine className='text-[2vh]' />
              Download PDF
            </Button>

            <Button className='inter-tight bg-[white] rounded-full border-[#09090D] py-[3vh] border-[2px] font-semibold text-[#09090D] cursor-pointer text-[1.6vh] hover:scale-[1.02] w-[55%]'>
              <RiDownloadLine className='text-[2vh]' />
              Download Word (.Docx)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterEnhancementLayout;
