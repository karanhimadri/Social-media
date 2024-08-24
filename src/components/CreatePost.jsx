import { useContext, useEffect, useRef } from "react";
import { postContext } from "../store/PostList-store";

const CreatePost = () => {
  const { addNewPost } = useContext(postContext);

  const postTitleElement = useRef();
  const postBodyElement = useRef();
  const postTagsElement = useRef();

  function handleSubmitForm(event) {
    event.preventDefault();
    let postTitle = postTitleElement.current.value;
    let postBody = postBodyElement.current.value;
    let postTags = postTagsElement.current.value.split(" ");

    fetch("https://dummyjson.com/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: postTitle,
        body: postBody,
        tags: postTags,
        userId: 5,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          console.log("Network response was not Ok");
        }
        return res.json();
      })
      .then((data) => {
        addNewPost(data);
      });

    postTitleElement.current.value = " ";
    postBodyElement.current.value = " ";
    postTagsElement.current.value = " ";
  }

  return (
    <form className="form" onSubmit={handleSubmitForm}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          <b>Post Title </b>
        </label>
        <input
          type="text"
          ref={postTitleElement}
          className="form-control"
          id="title"
          placeholder="How are you feeling today ..."
        />
      </div>
      <div className="mb-3">
        <label htmlFor="body" className="form-label">
          <b>About Post </b>
        </label>
        <textarea
          type="text"
          ref={postBodyElement}
          rows="4"
          className="form-control"
          id="body"
          placeholder="Tell us more about it .."
        />
      </div>
      <div className="mb-3">
        <label htmlFor="tag" className="form-label">
          <b>Enter Post Related Hastags</b>
        </label>
        <input
          type="text"
          ref={postTagsElement}
          className="form-control"
          id="tag"
          placeholder="Enter tags by space"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        <b>Post</b>
      </button>
    </form>
  );
};

export default CreatePost;
