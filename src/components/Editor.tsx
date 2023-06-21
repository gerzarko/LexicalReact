import {
  $getRoot,
  $getSelection,
  EditorState,
  $getNodeByKey,
  $createNodeSelection,
  $createRangeSelection,
  $setSelection,
  removeNode,
  LexicalNode,
} from "lexical";
import { useEffect, useState } from "react";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HeadingNode, $createHeadingNode } from "@lexical/rich-text";
// import theme from '../../lexical/packages/lexical-playground/src/themes/CommentEditorTheme';
import {
  $createTextNode,
  $isRangeSelection,
  $createParagraphNode,
} from "lexical";
import { $setBlocksType } from "@lexical/selection";

function onChange(editorState: EditorState) {
  editorState.read(() => {
    const root = $getRoot();
    const selection = $getSelection();
  });
}

function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.focus();
  }, [editor]);

  return null;
}

function onError(error: Error) {
  console.error(error);
}

const theme = {
  heading: {
    h1: "myClass",
  },
};

export function Editor() {
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError,
    nodes: [HeadingNode],
  };

  function MyOnChangePlugin(props: {
    onChange: (editorState: EditorState) => void;
  }) {
    const [editor] = useLexicalComposerContext();
    const { onChange } = props;
    useEffect(() => {
      return editor.registerUpdateListener(({ editorState }) => {
        onChange(editorState);
      });
    }, [onChange, editor]);

    return null;
  }

  function ShowEditorCOmposerState(): JSX.Element {
    const [editor] = useLexicalComposerContext();
    const mostrarEstadoComposer = () => {
      console.log(editor);
    };

    return <button onClick={mostrarEstadoComposer}>hola</button>;
  }

  function AddH1(): JSX.Element {
    const [editor] = useLexicalComposerContext();
    const h1: JSX.Element = <h1></h1>;
    const appendH1 = () => {
      editor._window?.document.createTextNode("aaaa");
    };

    return <button onClick={appendH1}>h1</button>;
  }
  function AddText(): JSX.Element {
    const [editor] = useLexicalComposerContext();
    const addHola = () => {
      editor.update(() => {
        const root = $getRoot();
        const selection = $getSelection();
        const paragraphNode = $createParagraphNode();
        const textNode = $createHeadingNode("h1").append(
          $createTextNode("hola")
        );
        paragraphNode.append(textNode);
        root.append(paragraphNode);
      });
    };
    return <button onClick={addHola}>addHola</button>;
  }

  function DeleteText(): JSX.Element {
    const [editor] = useLexicalComposerContext();
    const addHola = () => {
      editor.update(() => {
        const root = $getRoot();
        const selection = $getSelection();
        removeNode(selection, false, false);
      });
    };
    return <button onClick={addHola}>Chaur</button>;
  }

  function SearchAndReplace(): JSX.Element {
    const [editor] = useLexicalComposerContext();
    const [searchText, setSearchText] = useState();
    const [replaceText, setReplaceText] = useState();
    let nodesText: object[] = [];
    const [nodeFound, setNodeFound] = useState([]);

    function all() {
      editor.update(() => {
        const root = $getRoot();
        const all = root.getAllTextNodes();
        const text: object[] = all.map((node) => {
          return { text: node.__text, key: node.__key };
        });
        nodesText = text;
        console.log(text);
      });
    }

    function selectionNode(nodos: any) {
      editor.update(() => {
        const rangeSelection = $createRangeSelection();
        const root = $getRoot();
        $setSelection(rangeSelection);
        const someNode = $getNodeByKey(nodos[0].key);
        console.log("selection check", someNode!.__text);
        const nodeReplacer = $createTextNode(
          someNode!.__text.replace(searchText, replaceText)
        );
        console.log("replacee", nodeReplacer);
        someNode!.select();

        someNode!.replace(nodeReplacer);
        someNode!.__text.replace(searchText, replaceText);

        console.log(someNode, "nodo");
      });
    }
    function handleChange(event: any) {
      setSearchText(event.target.value);
      console.log(searchText);
    }
    function handleChangeReplace(event: any) {
      setReplaceText(event.target.value);
      console.log(replaceText);
    }

    function isText(text: any) {
      console.log(text.text, "vs", searchText);
      console.log("esto", text.text.search(searchText));
      return text.text.search(searchText) >= 0;
    }

    function handleSubmit(event: any) {
      event.preventDefault();
      all();

      if (nodesText.find(isText)) {
        const nodee: object[] = nodesText.filter(isText);

        selectionNode(nodee);
      }
    }

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label>Search</label>
          <input onChange={handleChange} type="text" id="searchText"></input>
          <label>Replace</label>
          <input
            type="text"
            id="replaceText"
            onChange={handleChangeReplace}
          ></input>
          <input type="submit" value="submit" />
        </form>
      </div>
    );
  }

  function AllTextNode(): JSX.Element {
    const [editor] = useLexicalComposerContext();
    function all() {
      editor.update(() => {
        const root = $getRoot();
        const all = root.getAllTextNodes();
        console.log(all);
      });
    }

    return <button onClick={all}>Show TextNodes</button>;
  }
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <ShowEditorCOmposerState />
      {/* <AddH1 /> */}
      {/* <AddText /> */}
      {/* <DeleteText /> */}
      <SearchAndReplace />

      <AllTextNode />
      <PlainTextPlugin
        contentEditable={
          <ContentEditable className="w-full h-80 border-white border p-3" />
        }
        placeholder={<div className="">Enter some text...</div>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <OnChangePlugin onChange={onChange} />
      <MyOnChangePlugin
        onChange={(EditorState) => {
          console.log(EditorState);
        }}
      />
      <HistoryPlugin />
      <OtherCustomPlugin
        onChange={(EditorState) => {
          console.log(EditorState);
        }}
      />
    </LexicalComposer>
  );
}
