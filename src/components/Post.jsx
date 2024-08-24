import { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { postContext } from "../store/PostList-store";
const Post = ({ posts }) => {
  const { deletePost } = useContext(postContext);
  return (
    <div className="card" style={{ width: "35rem", margin: "40px 50px" }}>
      <div className="card-body">
        <span
          className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
          onClick={() => deletePost(posts.id)}
        >
          <MdDelete />
        </span>
        <h5 className="card-title">{posts.title}</h5>
        <p className="card-text">{posts.body}</p>

        {posts.tags.map((tag) => (
          <span key={tag} className="badge text-bg-primary tag-card">
            {tag}
          </span>
        ))}
        <div className="reaction-box">
          <div>
            <AiOutlineLike /> {posts.reactions.likes}
          </div>
          <div>
            {" "}
            <AiOutlineDislike /> {posts.reactions.dislikes}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
