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
import { Menu } from "@headlessui/react";
import { Position } from "../../lexical/packages/lexical-playground/src/ui/ColorPicker";
import { addClassNamesToElement } from "../../lexical/packages/lexical-utils/src/index";

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
    const [replaceText, setReplaceText] = useState("");
    // let nodesText: object[] = [];
    const [nodesText, setNodesText] = useState<object[]>();
    const [nodeFound, setNodeFound] = useState([]);
    interface Nodos {
      text: string;
      key: number;
    }

    function all() {
      editor.update(() => {
        const root = $getRoot();
        const all = root.getAllTextNodes();
        const text: object[] = all.map((node) => {
          // return { text: node.__text, key: node.__key };
          const nodosNuevos: Nodos = { text: node.__text, key: node.__key };
          return nodosNuevos;
        });
        setNodesText(text);
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
      setSearchText(event.target?.value);
    }
    function handleChangeReplace(event: any) {
      setReplaceText(event.target.value);
    }

    function isText(text: any) {
      return text.text.search(searchText) >= 0;
    }

    function handleSubmit(event: any) {
      event.preventDefault();
      all();
      if (nodesText?.find(isText)) {
        const nodee: object[] = nodesText.filter(isText);
        selectionNode(nodee);
      }
    }

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label>Search:</label>
          <input
            onChange={handleChange}
            type="text"
            id="searchText"
            className="w-3/12 mx-2  rounded-sm"
          ></input>
          <label>Replace</label>
          <input
            type="text"
            id="replaceText"
            onChange={handleChangeReplace}
          ></input>
          <input type="submit" value="Enter" />
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

  type HeadingTag = "h1" | "h2" | "h3";

  function HeadingPlugin(): JSX.Element {
    const [editor] = useLexicalComposerContext();
    const headingTags: HeadingTag[] = ["h1", "h2", "h3"];
    const Click = (tag: HeadingTag): void => {
      editor.update(() => {
        const selection = $getSelection();
        console.log("primer seleccion", selection);
        if ($isRangeSelection(selection)) {
          console.log("la seleccion", selection);

          $setBlocksType(selection, () => $createHeadingNode(tag));
        }
      });
    };

    return (
      <div>
        {headingTags.map((tag) => {
          return (
            <button
              onClick={(event) => {
                event.preventDefault();
                Click(tag);
              }}
              key={tag}
              className="rounded flex columns-1 hover:bg-gray-300 hover:w-full   px-1 py-1 "
            >
              {tag.toUpperCase()}
            </button>
          );
        })}
      </div>
    );
  }
  function TextPlugin() {
    const [editor] = useLexicalComposerContext();
    const Click = (): void => {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createParagraphNode());
        }
      });
    };

    return (
      <div>
        <button
          onClick={() => {
            Click();
          }}
          className="rounded  mx-2 px-2 py-1"
        >
          text
        </button>
      </div>
    );
  }
  function MyDropdown(): JSX.Element {
    return (
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button>More</Menu.Button>
        <Menu.Items className="absolute  mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-black ">
          <Menu.Item>
            {({ active }) => (
              <a className={"hover:bg-sky-700"} href="/account-settings">
                <HeadingPlugin />
                <TextPlugin />
                <AllTextNode />
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                className={`${active && "bg-blue-500 w-full"}`}
                href="/account-settings"
              >
                <TextPlugin />
              </a>
            )}
          </Menu.Item>
        </Menu.Items>
      </Menu>
    );
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="flex bg-slate-900 justify-between w-1/2 p-3 rounded">
        {/* <ShowEditorCOmposerState /> */}
        {/* <AddH1 /> */}
        {/* <AddText /> */}
        {/* <DeleteText /> */}

        <MyDropdown />
        <SearchAndReplace />
      </div>
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
    </LexicalComposer>
  );
}
