const Header = (props) => {
    return (
        <header>
            <h1 className="header-title">T.V. Tracker.</h1>
            <div className="header-buttons">
                <button>Add New Show</button>
                <button>My Watch List</button>
            </div>
        </header>
    )
}

export default Header;