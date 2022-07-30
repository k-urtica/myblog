import AppLink from './AppLink';
import ShareLinks from './ShareLinks';

type Props = {
  share: string;
  next?: GatsbyTypes.Maybe<GatsbyTypes.MarkdownRemark>;
  prev?: GatsbyTypes.Maybe<GatsbyTypes.MarkdownRemark>;
};

const PostFooter = ({ share, next, prev }: Props) => (
  <>
    <ShareLinks url={share} className="text-center" />
    <div className="flex justify-between">
      <div>
        {prev && (
          <AppLink
            to={prev.fields?.postPath as string}
            className="btn btn-ghost"
          >
            Prev
          </AppLink>
        )}
      </div>

      <div>
        {next && (
          <AppLink
            to={next.fields?.postPath as string}
            className="btn btn-ghost"
          >
            Next
          </AppLink>
        )}
      </div>
    </div>
  </>
);

export default PostFooter;
