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
                    <h2>{props.show.name}</h2>
                    <p>{props.show.lastWatchedEp}</p>
                </div>
                <div className="show-info-container-right">
                    <h4>Last Watched:</h4>
                    <p>{watchDate}</p>
                </div>
            </div>
        </>
    )
}

export default Show;