import { createContext, useReducer, useState, useEffect } from "react";

export const postContext = createContext({
  postlist: [],
  fetching: false,
  addNewPost: () => {},
  deletePost: () => {},
});

function postReducerAction(currPostlist, action) {
  let newPostList = currPostlist;
  if (action.type === "DELETE_POST") {
    newPostList = currPostlist.filter(
      (post) => post.id !== action.payload.postId
    );
  } else if (action.type === "INITIAL_POST") {
    newPostList = action.payload.Posts;
  } else if (action.type === "ADD_POST") {
    newPostList = [action.payload.APIposts, ...currPostlist];
  }
  return newPostList;
}

const PostListProvider = ({ children }) => {
  const [postlist, dispatchPostList] = useReducer(postReducerAction, []);
  function addNewPost(APIposts) {
    (APIposts.reactions = {
      likes: 0,
      dislikes: 0,
    }),
      // direct dispatching
      dispatchPostList({
        type: "ADD_POST",
        payload: {
          APIposts,
        },
      });
  }

  function fetchPost(Posts) {
    dispatchPostList({
      type: "INITIAL_POST",
      payload: {
        Posts,
      },
    });
  }

  function deletePost(postId) {
    const deleteDetails = {
      type: "DELETE_POST",
      payload: {
        postId,
      },
    };
    dispatchPostList(deleteDetails);
  }

  const [fetching, setFetching] = useState(false);

  // when my web app loading then automatically fetch server and load all post ((res) => res.json())
  useEffect(() => {
    setFetching(true);
    const controller = new AbortController();
    const signal = controller.signal;
    fetch("https://dummyjson.com/posts", { signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network Response was not Ok");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        fetchPost(data.posts);
        setFetching(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("Fetch Aborted");
        } else {
          console.error(`Fetch error ${errror}`);
          setFetching(false);
        }
      });
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <postContext.Provider
      value={{ postlist, fetching, addNewPost, deletePost }}
    >
      {children}
    </postContext.Provider>
  );
};

export default PostListProvider;
