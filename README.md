# Lexical React

Working with Lexical and develop new tools for it.

## Installation

Use the next commands

    npm install
    cd LexicalReact
    npm install Lexical



## Basic Structure

. First we need to setup lexical base configuration

![Lexical config](https://github.com/gerzarko/LexicalReact/blob/main/screenshots/Screenshot%202023-06-26%20at%202.56.27%20PM.png?raw=true)

. Basic structure of a PlugIn

![Lexical config](https://github.com/gerzarko/LexicalReact/blob/main/screenshots/Screenshot%202023-06-26%20at%202.56.27%20PM.png?raw=true)



##  Search and Replace Plugin

This Plugin task is to target a word within any of the texnodes and replace it for the desire one



  . Main function declaration that returns a html element that we are going to use to trigger the events of search and replace. This is also going to be our React component that we are going to add to Lexical

![Lexical config](https://github.com/gerzarko/LexicalReact/blob/main/screenshots/Screenshot%202023-06-26%20at%203.08.37%20PM.png?raw=true)

. Return div element that contains a button to trigger handleSubmit


![Lexical config](https://github.com/gerzarko/LexicalReact/blob/main/screenshots/Screenshot%202023-06-26%20at%203.08.58%20PM.png?raw=true)

. We get all the TextNodes that exist in the editor throw this function


![Lexical config](https://github.com/gerzarko/LexicalReact/blob/main/screenshots/Screenshot%202023-06-26%20at%203.09.10%20PM.png?raw=true)

. Initialize the state for searchText and ReplaceText.


![Lexical config](https://github.com/gerzarko/LexicalReact/blob/main/screenshots/Screenshot%202023-06-26%20at%204.06.14%20PM.png?raw=true)

. This function allow us to pick the node to replace that we receive throw parameters and replace it for the one that we want. 


![Lexical config](https://github.com/gerzarko/LexicalReact/blob/main/screenshots/Screenshot%202023-06-26%20at%203.09.18%20PM.png?raw=true)


## Authors
- [@Datagrove](https://www.datagrove.com/)
- [@germanzarkovich](https://github.com/gerzarko)


## License

[MIT](https://choosealicense.com/licenses/mit/)

