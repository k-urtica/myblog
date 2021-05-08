import styled from '@emotion/styled';
import * as React from 'react';
import 'twin.macro';
import tw from 'twin.macro';

const PostToc: React.FC<Props> = ({ headings }) => {
  return (
    <ToCWrapper>
      <TocTitle>目次</TocTitle>
      <ul>
        {headings &&
          headings.map((head, index) => {
            return (
              <TocList key={index} depth={head?.depth as number}>
                <a href={`#${head?.id}`}>{head?.value}</a>
              </TocList>
            );
          })}
      </ul>
    </ToCWrapper>
  );
};

const ToCWrapper = tw.div`
  bg-alabaster py-4 px-3 rounded-2xl shadow
`;

const TocTitle = tw.div`
  text-center mb-3 font-bold bg-blue-100 rounded
`;

const TocList = styled.li<{ depth: number }>`
  padding-left: ${({ depth }) => (depth === 1 ? 0 : depth / 2)}em;
  ${tw`text-sm my-1.5 transform duration-300 hover:translate-x-1`}
`;

type Props = {
  headings: GatsbyTypes.Maybe<
    readonly GatsbyTypes.Maybe<
      Pick<GatsbyTypes.MarkdownHeading, 'value' | 'depth' | 'id'>
    >[]
  >;
};

export default PostToc;
