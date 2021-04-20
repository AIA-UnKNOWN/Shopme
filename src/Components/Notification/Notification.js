import './Notification.css';


function Notification(props) {
	return (
		<div id="notification">
			{props.text}
		</div>
	);
}

export default Notification;