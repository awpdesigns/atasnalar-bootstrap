class JSXDemo extends React.Component {
    render() {
        const jsx = <h1 id="jsx">This is JSX</h1>;
        console.log(jsx);
        return jsx;
    }
}

ReactDOM.render(<JSXDemo />, document.getElementById("root"));

function formatName(user) {
    return user.firstName + ' ' + user.lastName;
}

const user = {
    firstName: 'Harper',
    lastName: 'Perez'
};

const element = (
    <h1>
        Hello, {formatName(user)}!
    </h1>
);