/* eslint-disable jsx-a11y/alt-text */
import { fetchReferrals, ReferralProfile } from "@/features/referrrals";
import logger from "@/lib/logger";
import { RootState } from "@/store";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { Image, Select } from "antd"
import { useEffect, useState } from "react";
import { RiGroupLine } from "react-icons/ri"
import { useDispatch } from "react-redux";

type ReferralsPageProps = {
    jobDetails: any;
}

const ReferralsPage = ({ jobDetails}: ReferralsPageProps) => {

    const [referrals, setReferrals] = useState<any>();

    const dispatch: ThunkDispatch<RootState, null, AnyAction> = useDispatch();

    useEffect(() => {

        const getReferrals = async () =>  {

            const response = await dispatch(fetchReferrals({
                companyName: jobDetails?.companyName,
                title: jobDetails?.jobDetails?.title
              }));

            setReferrals(response.payload)
        }

        getReferrals();
    },[jobDetails])

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
                defaultValue={'Recruiting Team'}
                options={[
                  { label: 'Recruiting Team', value: 'Recruiting Team' },
                  { label: 'Dev Team', value: 'Dev Team' },
                  { label: 'Marketing Team', value: 'Marketing Team' },
                ]}
              />
            </div>

            <div className='flex flex-row justify-between ipad-portrait:justify-start ipad-portrait:gap-[3vw]'>
            {
                Array.isArray(referrals) && referrals.length > 0 ? (
                    referrals.map((referral: any, key: number) => (
                    <Image
                        key={key}
                        src={referral?.profilePicture || '/default-profile-picture.png'} // Fallback image
                        alt={referral?.fullName || 'LinkedIn Profile'} // Fallback text for alt
                        className="h-[70px] w-[70px] object-cover cursor-pointer hover:scale-[1.02] transition-all rounded-full border-[2px] border-[#173440]"
                        preview={false}
                    />
                    ))
                ) : (
                    <p>No referrals found</p> // Optional fallback message if no referrals
                )
                }
            </div>
          </div>
    )
}

export default ReferralsPage