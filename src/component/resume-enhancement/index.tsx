/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable jsx-a11y/alt-text */
import {
  CheckCircleFilled,
  CheckCircleOutlined,
  SendOutlined,
} from '@ant-design/icons';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { Button, Image, Input, message, Skeleton } from 'antd';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { RiDownloadLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';

import logger from '@/lib/logger';

import { RootState } from '@/store';

import {
  resumeEnhancementRequest,
  ResumeEnhancementsRequest,
} from '@/features/resume-enhancements';
import { getRealUserInfo, validateJwtToken } from '@/utils/auth';
import { decryptData } from '@/utils/encryptions';

import PlaxisAIMessage from './ai-message';
import UserMessage from './user-message';
import PlaxisAITag from '../job-details/ai-tag';
import AIDarkImg from '../../../public/images/ai-icon.png';

type ResumeEnhancementLayoutProps = {
  jobId: string | string[] | undefined;
};

type ChatContent = {
  role: 'user' | 'plaxis-ai';
  content: string;
};

const ResumeEnhancementLayout = ({ jobId }: ResumeEnhancementLayoutProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [jobDescription, setJobDescriptions] = useState<string>();
  const [oldResumeContnet, setOldResumeContent] = useState<string>();

  const [chatContent, setChatContent] = useState<ChatContent[]>([]);

  const [userPrompt, setUserPrompt] = useState<string>();

  const [userDetails, setUserDetails] = useState<any>();

  const [userMessageCount, setUserMessageCount]=useState<number>(0)

  const router = useRouter();

  const resumeEnhancement = useSelector(
    (state: RootState) => state.resumeEnhancement
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
          logger('No job matches found', 'error');
          router.push('/');
          return;
        }

        // Decrypt and parse job matches
        const jobs = JSON.parse(decryptData(rawData));
        const matchingJob = jobs.find(
          (job: any) => job?.jobDetails?.id === jobId
        );

        if (!matchingJob?.jobDetails?.description) {
          logger('Job description not found for selected job', 'error');
          router.push('/');
          return;
        }

        setJobDescriptions(matchingJob?.jobDetails?.description);
        // Fetch resume content
        const encryptedContent = Cookies.get('resume-content');
        if (!encryptedContent) {
          logger('No resume content found', 'error');
          router.push('/');
          return;
        }

        const content = decryptData(encryptedContent);
        if (!content?.trim()) {
          logger('Resume content is empty after decryption', 'error');
          router.push('/');
          return;
        }

        setOldResumeContent(content);

        const request: ResumeEnhancementsRequest = {
          resumeText: content,
          jobDescription: matchingJob.jobDetails.description,
        };

        await dispatch(resumeEnhancementRequest(request));

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
    setUserMessageCount(prevCount => prevCount+1)

    // check if the message count is greater than 3
    if(userMessageCount > 2) {
      message.error("You have reached your message limit. Please upgrade to continue.")
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
      generatedContent: resumeEnhancement.contentEnhanced?.newContent,
      userPrompt,
    };

    // Clear the input field
    setUserPrompt('');

    //send the request to the backend
    await dispatch(resumeEnhancementRequest(request));

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

  const downloadPDF = () => {
    const resumeContent = resumeEnhancement.contentEnhanced?.newContent;

    if (!resumeContent) {
      logger('No resume content found', 'error');
      return;
    }

    // Create a new window with the resume content
    const printWindow = window.open('', '', 'height=500, width=500');

    if (!printWindow) {
      logger('Unable to open print window', 'error');
      return;
    }

    printWindow.document.write('<html><head>');
    printWindow.document.write('</head><body>');
    printWindow.document.write('<div class="no-color-formatting">');
    printWindow.document.write(resumeContent);
    printWindow.document.write('</div>');
    printWindow.document.write('</body></html>');

    printWindow.document.close();
    printWindow.print();
  };

  const downloadDOCX = () => {
    const resumeContent = resumeEnhancement.contentEnhanced?.newContent;

    if (!resumeContent) {
      logger('No resume content found', 'error');
      return;
    }

    // Remove HTML tags to get plain text
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = resumeContent;
    const plainText = tempDiv.textContent || tempDiv.innerText;

    // Create a Blob with the content
    const blob = new Blob([plainText], { type: 'text/plain' });

    // Create a download link
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'enhanced-resume.docx';
    link.click();
  };

  return (
    <div className='px-[3vw] mt-[5vh]'>
      <div className='flex flex-row gap-[4vw]'>
        {resumeEnhancement.contentEnhanced && !resumeEnhancement.loading ? (
          <div
            className='ipad-landscape:w-[60%] w-[65%] flex flex-col border border-[#E6E6E7] rounded-lg h-[75vh] overflow-y-scroll resume-enhancements p-[2vw]'
            dangerouslySetInnerHTML={{
              __html: resumeEnhancement.contentEnhanced?.newContent,
            }}
          />
        ) : (
          <Skeleton className='rounded-lg h-[75vh] ipad-landscape:w-[60%] w-[65%] border border-[#E6E6E7] p-[2vw]' />
        )}

        <div className='bg-[#F2F2F2] rounded-lg ipad-landscape:w-[40%] w-[35%] ipad-landscape:h-[75vh] md:h-[70vh] sticky top-[18vh] flex flex-col gap-[3vh] px-[3vh] py-[2vh]'>
          {/* plaxis ai details  */}

          <PlaxisAITag />
          <div className=' bg-white px-[2vh] py-[2vh] rounded-md flex flex-col gap-[2vh]'>
            {/* matching results  */}
            <div className='flex flex-row gap-[0.4vw] items-center'>
              <div className=' bg-[#E5E5E5] w-[25px] flex flex-row h-[25px] items-center justify-center rounded-full'>
                <CheckCircleOutlined className='text-[1.5vh]' />
              </div>
              <h1 className='text-[1.7vh] font-medium'>
                Matching results (ATS ratings)
              </h1>
            </div>

            {resumeEnhancement.contentEnhanced && !resumeEnhancement.loading ? (
              <div className='flex flex-row  justify-between overflow-y-scroll h-[10vh]'>
                <div className='flex flex-col gap-[1vh]'>
                  {resumeEnhancement.contentEnhanced &&
                    resumeEnhancement.contentEnhanced.results?.matchingResults.map(
                      (results, key) => (
                        <div
                          key={key}
                          className='flex flex-row items-center object-center gap-[1vw]'
                        >
                          <CheckCircleFilled className='text-[#348888] rounded-full text-[2.5vh]' />
                          <p className='text-[1.7vh] inter-tight text-[#09090D]'>
                            {results.criteria} ({results.number})
                          </p>
                        </div>
                      )
                    )}
                </div>

                <h1 className='text-[5vh] whyteInktrap_font text-center font-semibold text-[#0D0D0D]'>
                  {
                    resumeEnhancement.contentEnhanced?.results
                      ?.matchingPercentage
                  }
                </h1>
              </div>
            ) : (
              <Skeleton className='rounded-lg h-[5vh] border border-[#E6E6E7] p-[2vw]' />
            )}
          </div>

          <div
            className=' bg-white px-[4vh] py-[3vh] rounded-md flex flex-col gap-[3vh] h-[30vh] overflow-auto overflow-y-auto'
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
            <Button
              className='inter-tight bg-[#348888] rounded-full border-[2px] border-[#348888] py-[3vh] hover:text-[#FFFFFF] font-semibold text-[#FFFFFF] cursor-pointer text-[1.6vh] hover:scale-[1.02] w-[40%]'
              onClick={downloadPDF}
              loading={resumeEnhancement.loading}
            >
              <RiDownloadLine className='text-[2vh]' />
              Download PDF
            </Button>

            <Button
              className='inter-tight bg-[white] rounded-full border-[#09090D] py-[3vh] border-[2px] font-semibold text-[#09090D] cursor-pointer text-[1.6vh] hover:scale-[1.02] w-[55%]'
              onClick={downloadDOCX}
              loading={resumeEnhancement.loading}
            >
              <RiDownloadLine className='text-[2vh]' />
              Download Word (.Docx)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeEnhancementLayout;
