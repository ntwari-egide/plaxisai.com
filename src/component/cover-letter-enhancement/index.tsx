/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable jsx-a11y/alt-text */
import { SendOutlined } from '@ant-design/icons';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { Button, Image, Input, message, Skeleton } from 'antd';
import html2canvas from 'html2canvas';
import Cookies from 'js-cookie';
import jsPDF from 'jspdf';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { RiDownloadLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';

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

  const [nonColoredActive, setNonColoredActive] = useState<boolean>(false);

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

      // Find the index of the last AI message with the specific content
      const lastAIMessageIndex = updatedChatContent
        ?.slice() // Create a shallow copy to avoid modifying the original array
        .reverse()
        .findIndex(
          (chat) =>
            chat.role === 'plaxis-ai' &&
            chat.content === 'Got it—taking care of it!'
        );

      // If we found a matching AI message, update it
      if (lastAIMessageIndex !== -1) {
        const originalIndex =
          updatedChatContent.length - 1 - lastAIMessageIndex;
        updatedChatContent[originalIndex] = {
          ...updatedChatContent[originalIndex],
          content: 'All done—your request has been completed!',
        };
      }

      return updatedChatContent;
    });
  };

  const contentRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    // set the resume to non colored version
    setNonColoredActive(true);

    // Wait for the DOM to update with the non-colored version
    await new Promise((resolve) => setTimeout(resolve, 100)); // Short delay for state to apply

    if (contentRef.current) {
      const canvas = await html2canvas(contentRef.current);
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = 210; // A4 width in mm
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('enhanced-cover-letter.pdf');
    }

    // set the resume back to colored version
    setNonColoredActive(false);
  };

  const downloadDOCX = () => {
    // render the content
    const resumeContent = coverLetterEnhancement.contentEnhanced?.newContent;

    if (!resumeContent) {
      return;
    }

    // Create a temporary div to hold the resume content and apply styles
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = resumeContent;

    // Apply CSS styles dynamically for spans with 'newly-added' class
    // Ensure tempDiv exists before querying
    if (tempDiv) {
      const newlyAddedSpans = Array.from(
        tempDiv.querySelectorAll('span.newly-added')
      ) as HTMLElement[];

      newlyAddedSpans.forEach((span) => {
        span.style.color = '#09090d'; // Apply color to each span
      });
    }

    // Apply styles to list items (li)
    const listItems = tempDiv.querySelectorAll('li');
    listItems.forEach((item: HTMLElement) => {
      item.style.listStyleType = 'circle'; // This sets the bullet style
      item.style.marginLeft = '9px'; // Set left margin for indentation
    });

    // Apply styles to header tags (header)
    const headers = tempDiv.querySelectorAll('header');
    headers.forEach((header: HTMLElement, index: number) => {
      header.style.textAlign = 'center'; // Center-align the header
      header.style.alignItems = 'center'; // Align content inside the header
      header.style.alignContent = 'center'; // Align content vertically
      if (index === 0) {
        header.style.fontWeight = '900'; // Bold font for the first header
      }
    });

    // Apply styles to h2 tags
    const h2s = tempDiv.querySelectorAll('h2');
    h2s.forEach((h2: HTMLElement) => {
      h2.style.fontWeight = '900'; // Bold font
    });

    // Apply styles to h3 tags
    const h3s = tempDiv.querySelectorAll('h3');
    h3s.forEach((h3: HTMLElement) => {
      h3.style.fontWeight = '700'; // Set medium bold font for h3
    });

    // Ensure tempDiv exists before querying
    if (tempDiv) {
      // Convert NodeList to array and assert the type
      const paragraphs = Array.from(
        tempDiv.querySelectorAll('section p')
      ) as HTMLElement[];

      paragraphs.forEach((p) => {
        p.style.display = 'flex'; // Flexbox for section paragraphs
        p.style.flexDirection = 'row'; // Align items in a row
        p.style.gap = '5px'; // Add gap between flex items (optional)
      });
    }

    // Extract the content with the applied styles
    const styledContent = tempDiv.innerHTML;

    // Create a Blob with the styled content for DOCX
    const blob = new Blob([styledContent], {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });

    // Create a download link for the DOCX file
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'enhanced-cover-letter.docx';
    link.click();
  };

  return (
    <div className='px-[3vw] mt-[5vh]'>
      <div className='flex flex-row gap-[4vw]'>
        {coverLetterEnhancement.contentEnhanced &&
        !coverLetterEnhancement.loading ? (
          <div
            className={`ipad-landscape:w-[60%] w-[65%] flex flex-col border border-[#E6E6E7] rounded-lg h-[75vh] overflow-y-scroll cover-letter`}
          >
            <div
              ref={contentRef}
              className='p-[2vw]'
              dangerouslySetInnerHTML={{
                __html: coverLetterEnhancement.contentEnhanced?.newContent,
              }}
            />
          </div>
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
            <Button
              className='inter-tight bg-[#348888] rounded-full border-[2px] border-[#348888] py-[3vh] hover:text-[#FFFFFF] font-semibold text-[#FFFFFF] cursor-pointer text-[1.6vh] hover:scale-[1.02] w-[40%]'
              onClick={downloadPDF}
              loading={coverLetterEnhancement.loading}
            >
              <RiDownloadLine className='text-[2vh]' />
              Download PDF
            </Button>

            <Button
              className='inter-tight bg-[white] rounded-full border-[#09090D] py-[3vh] border-[2px] font-semibold text-[#09090D] cursor-pointer text-[1.6vh] hover:scale-[1.02] w-[55%]'
              onClick={downloadDOCX}
              loading={coverLetterEnhancement.loading}
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

export default CoverLetterEnhancementLayout;
