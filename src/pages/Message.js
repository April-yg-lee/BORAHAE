import React from 'react';
import PropTypes from 'prop-types';
import styles from "./Chatting.module.css";
// import { formatRelative } from 'date-fns';

// const formatDate = date => {
//     let formattedDate = '';
//     if (date) {
//         // Convert the date in words relative to the current date
//         formattedDate = formatRelative(date, new Date());
//         // Uppercase the first letter
//         formattedDate =
//             formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
//     }
//     return formattedDate;
// };

const Message = ({
    createdAt = null,
    text = '',
    displayName = '',
    photoURL = '',
}) => {
    if (!text) return null;

    return (
        <span className={styles.chat_yourAnswer}>
            {text}
        </span>


    );
};

// Message.propTypes = {
//     text: PropTypes.string,
//     createdAt: PropTypes.shape({
//         seconds: PropTypes.number,
//     }),
//     displayName: PropTypes.string,
//     photoURL: PropTypes.string,
// };

export default Message;