const Show = (props) => {
    // Make Last Watched Date from Data
    let watchDate = props.show.updatedAt.split('-');
    watchDate = [watchDate[1], watchDate[2].substring(0,2), watchDate[0]];
    watchDate = watchDate.join('-');

    // Return HTML Elements
    return (
        <>
            <img src={props.show.image}/>
            <div className="show-info-container">
                <div className="show-info-container-left">
                    <h3>{props.show.name}</h3>
                    <p>{props.show.genre}</p>
                    <p>{props.show.lastWatchedEp}</p>
                </div>
                <div className="show-info-container-right">
                    <h5>Created On:</h5>
                    <p>{props.show.created}</p>
                    <h5>Last Watched:</h5>
                    <p>{watchDate}</p>
                </div>
            </div>
        </>
    )
}

export default Show;