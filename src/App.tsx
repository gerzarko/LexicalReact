import { Editor } from "./components/Editor";
import Theme from "./components/Theme";

function App() {
  return (
    <>
      <div className="w-3/4 mx-auto h-2/4 py-20">
        <div className="flex justify-between p-10 items-center">
          <h1 className=" dark:text-white text-xl">Text Editor</h1>
          <Theme />
        </div>
        <Editor />
      </div>
    </>
  );
}

export default App;
