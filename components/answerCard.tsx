import { ThumbDownIcon, ThumbUpIcon } from '@heroicons/react/solid';
import React from 'react';
import { private_api } from '../pages/api/axios';

const AnswerCard: React.FC<{
  id: string;
  title: string;
  description: string;
  date: string;
  rate?: number;
  reload?: boolean;
  setReload?: (a: any) => any;
}> = ({ id, title, description, date, rate = 0, reload, setReload }) => {
  const ansLike = async (id: string) => {
    try {
      const { data } = await private_api.patch(`/answer/like/${id}`);
      if (!!data) {
        setReload!(!reload);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ansDislike = async (id: string) => {
    try {
      const { data } = await private_api.patch(`/answer/dislike/${id}`);
      if (!!data) {
        setReload!(!reload);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="shadow border rounded p-2 flex my-5 text-teal-500">
      <div className="text-center p-3">
        <ThumbUpIcon
          className="w-10 text-teal-500 hover:cursor-pointer"
          onClick={() => ansLike(id)}
        />
        <p className="my-2">{rate}</p>
        <ThumbDownIcon
          className="w-10 text-rose-500 hover:cursor-pointer"
          onClick={() => ansDislike(id)}
        />
      </div>
      <div className="pl-5 flex flex-col grow">
        <div className="grow">
          <h2 className="text-2xl text-teal-800">{title}</h2>
          <p>{description}</p>
        </div>
        <p className="text-teal-800 text-right p-3">
          {new Date(date).toLocaleDateString('pt-br')}
        </p>
      </div>
    </div>
  );
};

export default AnswerCard;
