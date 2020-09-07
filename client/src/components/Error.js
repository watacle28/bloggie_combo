import React from 'react'
import {useSelector} from 'react-redux';
import {useToasts} from 'react-toast-notifications';

export const Error = () => {
    const {addToast} = useToasts();
    addToast('love',{appearance:'error',autoDismiss: true})
    return (
      <div></div>
    )
}
