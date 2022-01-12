import { ThumbDownIcon, ThumbUpIcon } from '@heroicons/react/solid';
import React from 'react';

const AnswerCard: React.FC<{
  title: string;
  description: string;
  date: string;
  rate?: number;
}> = ({ title, description, date, rate = 0 }) => {
  return (
    <div className="shadow border rounded p-2 flex my-5 text-teal-500">
      <div className="text-center p-3">
        <ThumbUpIcon
          className="w-10 text-teal-500 hover:cursor-pointer"
          onClick={() => {}}
        />
        <p className="my-2">{rate}</p>
        <ThumbDownIcon
          className="w-10 text-rose-500 hover:cursor-pointer"
          onClick={() => {}}
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
