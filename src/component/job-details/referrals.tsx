/* eslint-disable jsx-a11y/alt-text */
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { Image, Select } from 'antd';
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
    1024: { items: 4 },
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

      <div className='flex flex-row justify-between ipad-portrait:justify-start ipad-portrait:gap-[3vw]'>
        <AliceCarousel
          mouseTracking
          disableButtonsControls
          items={
            Array.isArray(referrals) && referrals.length > 0
              ? referrals.map((referral: any, key: number) => (
                  <Link href={referral?.profileURL} target='_blank' key={key}>
                    <Image
                      draggable={false}
                      src={
                        referral?.profilePicture ||
                        '/default-profile-picture.png'
                      }
                      alt={referral?.fullName || 'LinkedIn Profile'}
                      className='h-[70px] w-[70px] object-cover cursor-pointer hover:scale-[1.02] transition-all rounded-full border-[2px] border-[#173440]'
                      preview={false}
                    />
                  </Link>
                ))
              : [<p key='no-referrals'>No referrals found</p>] // Ensure this is an array
          }
          responsive={responsive}
          controlsStrategy='alternate'
        />
      </div>
    </div>
  );
};

export default ReferralsPage;
