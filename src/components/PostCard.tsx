import styled from '@emotion/styled';
import { GatsbyImage } from 'gatsby-plugin-image';
import * as React from 'react';
import 'twin.macro';
import tw from 'twin.macro';

import { formatDate, getPathByTag } from '../utils/helpers';
import AppLink from './AppLink';

const PostCard: React.FC<Props> = (props) => {
  const { title, date, path, summary, category, tags, image } = props;

  return (
    <CardWrapper>
      <AppLink to={path}>
        <GatsbyImage image={image.gatsbyImageData} alt={title} tw="block" />

        <CardInnerWrapper>
          <CardMeta>
            <span tw="font-bold text-indigo-600">{category}</span>
            <time dateTime={date}>
              <span tw="text-gray-500 text-xs">{formatDate(date)}</span>
            </time>
          </CardMeta>

          <CardTitle>{title}</CardTitle>
          <CardText>{summary}</CardText>
        </CardInnerWrapper>
      </AppLink>

      <CardActions>
        <ul tw="grid grid-flow-col auto-cols-max gap-2">
          {tags.map((tag, index) => {
            return (
              <li key={index}>
                <AppLink
                  to={getPathByTag(tag)}
                  tw="bg-purple-100 rounded-xl py-1 px-2"
                >
                  {tag}
                </AppLink>
              </li>
            );
          })}
        </ul>
      </CardActions>
    </CardWrapper>
  );
};

type Props = {
  title: string;
  summary: string;
  date: string;
  path: string;
  category: string;
  tags: Array<string>;
  image: Pick<GatsbyTypes.ImageSharp, 'gatsbyImageData'>;
};

const CardWrapper = tw.div`
  flex flex-col h-full bg-alabaster overflow-hidden shadow-lg hover:(shadow-2xl bg-yellow-50) duration-500 rounded-lg transform
`;

const CardInnerWrapper = tw.div`
  w-full px-4 pt-3 mb-4 h-full
`;

const CardTitle = tw.h2`
  text-gray-900 text-lg lg:text-xl font-bold mb-3
`;

const CardText = styled.div`
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  ${tw`text-gray-600 text-sm`}
`;

const CardMeta = tw.div`
  flex justify-between mb-1 text-sm
`;

const CardActions = tw.div`
  mt-auto px-4 mb-2 text-xs
`;

export default PostCard;
