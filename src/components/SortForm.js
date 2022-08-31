const SortForm = (props) => {
    return (
        <form className="inline-form sort-form">
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <label className="input-group-text sort-label" htmlFor="inputGroupSelect01">Sort By</label>
                </div>
                <select className="custom-select" id="inputGroupSelect01" name="sortBy" defaultValue="mostRecent" onChange={props.handleSortChange}>
                    <option value="mostRecent">Most Recent</option>
                    <option value="showName">Show Name</option>
                    <option value="showGenre">Show Genre</option>
                </select>
            </div>
        </form>
    )
}

export default SortForm;