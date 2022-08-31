const AddForm = (props) => {
    return (
        <form className='add-form' onSubmit={props.handleNewShowSubmit}>
            <div className='form-group'>
                <label htmlFor="showNameInput">Name</label>
                <input type="text" className="form-control" id="showNameInput" onChange={props.handleNewName}/>
            </div>
            <div className='form-group'>
                <label htmlFor="showGenreInput">Genre</label>
                <input type="text" className="form-control" id="showGenreInput" onChange={props.handleNewGenre}/>
            </div>
            <div className='form-group'>
                <label htmlFor="showCreatedInput">Date of First Episode</label>
                <input type="date" className="form-control" id="showCreatedInput" onChange={props.handleNewCreated}/>
            </div>
            <div className='form-group'>
                <label htmlFor="showLastWatchedInput">Title of Last Watched Episode</label>
                <input type="text" className="form-control" id="showLastWatchedInput" onChange={props.handleNewLastWatchedEp}/>
            </div>
            <div className='form-group'>
                <label htmlFor="showImageInput">Preview Image</label>
                <input type="text" className="form-control" id="showImageInput" onChange={props.handleNewImage}/>
            </div>
            <input className="add-submit-button" type="submit" value="Add New Show"/>
        </form>
    )
    
}

export default AddForm;