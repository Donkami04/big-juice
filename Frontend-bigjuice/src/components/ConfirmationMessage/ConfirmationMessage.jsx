import "./ConfirmationMessage.css"

export function ConfirmationMessage({children}) {
  return (
    <div className="confirmation-message-component">
      <div className="confirmation-message">
        {children}
      </div>
    </div>
  );
}
