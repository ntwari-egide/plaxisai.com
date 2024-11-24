/* eslint-disable jsx-a11y/alt-text */
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { Image, Select, Tooltip } from 'antd';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import { RiGroupLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';

import 'react-alice-carousel/lib/alice-carousel.css';

import { RootState } from '@/store';

import { fetchReferrals } from '@/features/referrrals';

type ReferralsPageProps = {
  jobDetails: any;
};

const ReferralsPage = ({ jobDetails }: ReferralsPageProps) => {
  const [referrals, setReferrals] = useState<any>();

  const dispatch: ThunkDispatch<RootState, null, AnyAction> = useDispatch();

  useEffect(() => {
    const getReferrals = async () => {
      const response = await dispatch(
        fetchReferrals({
          companyName: jobDetails?.companyName,
          title: jobDetails?.jobDetails?.title,
        })
      );

      setReferrals(response.payload);
    };

    getReferrals();
  }, [jobDetails]);

  const responsive = {
    0: { items: 1 },
    568: { items: 5 },
    1024: { items: referrals?.length > 4 ? 4 : referrals?.length },
  };

  return (
    <div className=' bg-white px-[2vh] py-[2vh] rounded-md flex flex-col gap-[3vh]'>
      {/* people  */}
      <div className='flex flex-row justify-between items-center'>
        <div className='flex flex-row gap-[0.4vw] items-center'>
          <div className=' bg-[#E5E5E5] w-[45px] hidden md:flex flex-row h-[45px] items-center justify-center rounded-full'>
            <RiGroupLine className='text-[1.5vh]' />
          </div>
          <div className='flex flex-col'>
            <h1 className='text-[1.7vh] font-medium'>Referrals</h1>
            <h1 className='text-[1.7vh] font-normal text-[#808080]'>
              HR Team & Fellows
            </h1>
          </div>
        </div>

        <Select
          className=' bg-white text-black'
          defaultValue='Recruiting Team'
          options={[{ label: 'Recruiting Team', value: 'Recruiting Team' }]}
        />
      </div>

      <div className='flex flex-row ipad-portrait:justify-start ipad-portrait:gap-[3vw]'>
        {Array.isArray(referrals) && referrals.length > 0 ? (
          <AliceCarousel
            mouseTracking
            disableButtonsControls
            items={
              Array.isArray(referrals) && referrals.length > 0
                ? referrals.map((referral: any, key: number) => (
                    <Link href={referral?.profileURL} target='_blank' key={key}>
                      <Tooltip title={referral?.headline}>
                        <Image
                          draggable={false}
                          src={
                            referral?.profilePicture ||
                            'https://media.licdn.com/dms/image/v2/D4E12AQEud3Ll5MI7cQ/article-inline_image-shrink_1000_1488/article-inline_image-shrink_1000_1488/0/1660833954461?e=1737590400&v=beta&t=o1G5AsAWRCnSy9iv_hX9bRDS1eJD7DBzxIUIr8tAWLc'
                          }
                          alt={referral?.fullName || 'LinkedIn Profile'}
                          className='h-[70px] w-[70px] object-cover cursor-pointer hover:scale-[1.02] transition-all rounded-full border-[2px] border-[#173440]'
                          preview={false}
                        />
                      </Tooltip>
                    </Link>
                  ))
                : [] // Ensure this is an array
            }
            responsive={responsive}
            controlsStrategy='alternate'
          />
        ) : (
          <p
            key='no-referrals'
            className='inter-tight text-[1.5vh] text-center'
          >
            No referrals found
          </p>
        )}
      </div>
    </div>
  );
};

export default ReferralsPage;
