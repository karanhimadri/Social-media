import { useContext } from "react";
import Post from "./Post";
import { postContext } from "../store/PostList-store";
import WealcomeMessage from "./WealcomeMessage";
import LoadingSpinner from "./LoadingSpinner";

const PostLists = () => {
  const { postlist, fetching } = useContext(postContext);
  return (
    <>
      {fetching && <LoadingSpinner />}
      {!fetching && postlist.length === 0 && <WealcomeMessage />}
      {!fetching && postlist.map((post) => <Post key={post.id} posts={post} />)}
    </>
  );
};
export default PostLists;
