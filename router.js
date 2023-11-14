import { paintList, popup, insertDescription } from "./home.js";

export const Router = {
  init: () => {

    // event handler for changes popstate
    window.addEventListener('popstate', (event) => {
      Router.go(event.state.path, false);
    });

    
    // check initial url from client
    Router.go(location.pathname);

  },
  go: (path, addToHistory=true) => {


    if (addToHistory) {
      history.pushState({ path }, '', path)
    }

    // parse out an ID from a url
    let pageElement;
    let purePath;
    let pathID;

    if (path.lastIndexOf('/') > 0) {
      pathID = path.substring(path.lastIndexOf('/')+1);
      purePath = path.substring(0, path.lastIndexOf('/'));
    } else {
      purePath = path;
    }

    switch (purePath) {
      case "/":
        paintList();
        break;
      case "/about":
        popup('name');
        break;
      case "/development":
        popup('software');
        break;
      case "/music":
        popup('music');
        break;
      case "/nombolo":
        insertDescription('nombolo');
        break;
      case "/timer":
        insertDescription('timer');
        break;
      default:
        break;
    }
  }
};

