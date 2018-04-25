import React from 'react';

/**
  Users may click on "Delete" by accident. This will check if they really
  mean to delete the post or comment.
*/

export default function ConfirmDelete(props){
  return (
    <div className='text-center'>
      <h4>Confirm delete this post?</h4>
      <div className='confirm-buttons'>
        <button className='btn btn-primary' onClick={props.confirmDelete}>Yes</button>
        <button className='btn btn-danger' onClick={props.closeModal}>No</button>
      </div>
    </div>
  )
}
