import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HeaderBar from "./components/HeaderBar";
import FooterBar from "./components/FooterBar";
import Sidebar from "./components/Sidebar";
import CreatePost from "./components/CreatePost";
import PostLists from "./components/PostLists";
import { useState } from "react";
import PostListProvider from "./store/PostList-store";

function App() {
  const [tab, setTab] = useState("Home");
  return (
    <PostListProvider>
      <div className="app-container">
        <Sidebar Tab={tab} btnTab={setTab}></Sidebar>
        <div className="content">
          <HeaderBar></HeaderBar>
          {tab === "Home" ? <PostLists></PostLists> : <CreatePost></CreatePost>}
          <FooterBar></FooterBar>
        </div>
      </div>
    </PostListProvider>
  );
}

export default App;
