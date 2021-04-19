import React from 'react'

export default function CategoryForm({handleSubmit,setName,name}) {
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Name</label>
                <input
                type="text"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                value={name}
                autoFocus
                required
                />
                <br />
            
                <button type="submit" className="btn btn-primary" disabled={name.length<4}button>Submit</button>
            </div>
         </form>
    )
}