import "./ConfirmationMessage.css"

export function ConfirmationMessage({children, height}) {
  const heightDiv = height || "300px"
  return (
    <div  className="confirmation-message-component">
      <div style={{height: height}} className="confirmation-message">
        {children}
      </div>
    </div>
  );
}
