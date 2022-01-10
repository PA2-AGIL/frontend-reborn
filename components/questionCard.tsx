import Link from 'next/link';
import React from 'react';

const QuestionCard: React.FC<{
  id: string;
  title: string;
  description: string;
  rate?: number;
  answers?: number;
  tags: string[];
  date: string;
}> = ({ id, title, description, rate = 0, answers = 0, tags, date }) => {
  return (
    <Link href={`/${id}`}>
      <div className="flex m-5 bg-teal-500 rounded text-gray-50 drop-shadow-sm hover:cursor-pointer">
        <div className="text-center p-2">
          <div>
            <p>{rate}</p>
            <p className="text-teal-900 text-sm">Foi Util</p>
          </div>
          <div>
            <p>{answers}</p>
            <p className="text-teal-900 text-sm">Respostas</p>
          </div>
        </div>

        <div className="flex flex-col flex-1 mx-4">
          <div className="flex-1 mb-2">
            <h2 className="text-2xl text-teal-900">{title}</h2>
            <p>{description}</p>
          </div>
          <div className="pb-2 flex justify-between">
            <div className="flex flex-wrap">
              {tags.map((tag: string) => {
                return (
                  <span className="bg-teal-900 text-white rounded mb-1 mr-1 p-1 text-xs">
                    {tag}
                  </span>
                );
              })}
            </div>
            <p className="text-right mr-2 text-teal-900">
              {new Date(date).toLocaleDateString('pt-br')}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default QuestionCard;
