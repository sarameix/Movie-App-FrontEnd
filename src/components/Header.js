const Header = (props) => {
    return (
        <header>
            <h1 className="header-title">T.V. Tracker.</h1>
            <div className="header-buttons">
                <button value='addForm' onClick={props.handleDisplayChange}>Add New Show</button>
                <button value='watchList' onClick={props.handleDisplayChange}>My Watch List</button>
            </div>
        </header>
    )
}

export default Header;