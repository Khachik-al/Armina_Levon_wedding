'use client';

import { useFieldArray, useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';

import clsx from 'clsx';

type Guest = { name_surname: string };

export type FVAgreement = {
  agreement: 'attend' | 'not-attend';
  guests: Guest[];
};

export default function InvitationForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FVAgreement>({
    defaultValues: {
      agreement: 'attend',
      guests: [
        {
          name_surname: '',
        },
      ],
    },
  });

  const { fields, append } = useFieldArray({
    control: control,
    name: 'guests',
  });

  const onSubmit: SubmitHandler<FVAgreement> = async data => {
    try {
      const res = await fetch('/api/send-agreement', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      const invitation_res = await res.json();

      console.log(invitation_res, 'invitation_res');
    } catch (e) {
      console.log('error ======>', e);
    }
  };

  return (
    <div className="flex justify-center pb-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-[20px] px-[20px] w-[100%] px-10 sm:w-[auto] sm:min-w-[500px] md:min-w-[600px] lg:min-w-[700px] xl:min-w-[800px]"
      >
        <div className="flex flex-col gap-[10px]">
          <label
            htmlFor="field-attend"
            className={clsx('w-fit flex items-center gap-[10px]', 'agreement-input-container')}
          >
            <input {...register('agreement')} type="radio" value="attend" id="field-attend" />
            <span className="checkmark" />
            <span>Attend</span>
          </label>
          <label
            htmlFor="field-not-attend"
            className={clsx('w-fit flex items-center gap-[10px]', 'agreement-input-container')}
          >
            <input
              {...register('agreement')}
              type="radio"
              value="not-attend"
              id="field-not-attend"
            />
            <span className="checkmark" />
            <span>Not attend</span>
          </label>
        </div>
        <div className="flex flex-col gap-[10px]">
          {fields.map((field, index) => {
            return (
              <input
                key={field.id}
                {...register(`guests.${index}.name_surname` as const, {
                  required: true,
                })}
                type="text"
                placeholder="Name Surname"
                className="w-full outline-0 border-b-[2px] border-solid border-[#000000] py-[10px]"
              />
            );
          })}
          <button
            type="button"
            className="w-fit outline-0 border-[2px] border-solid border-[#000000] rounded-[30px] px-[30px] mt-[40px] py-[10px]"
            onClick={() => {
              append([{ name_surname: '' }]);
            }}
          >
            Add member
          </button>
        </div>
        <button
          type="submit"
          className="w-fit self-center outline-0 border-[2px] border-solid border-[#000000] rounded-[30px] px-[30px] mt-[40px] py-[10px]"
        >
          Submit
        </button>
      </form>
    </div>
  );
}