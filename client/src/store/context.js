import React from 'react';

const passData = {
    id:"7838383",
    name:"sumit kr das"
};

const Context = React.createContext(passData);

const Provider = Context.Provider;

const Consumer = Context.Consumer;



export { Provider, Consumer };
export default Context;