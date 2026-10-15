

function Modal({ isOpen, onClose, title, children}){
  if(!isOpen){
    return null;
  }
  return(
    <div 
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    onMouseDown={(event) => {
      if(event.target === event.currentTarget){
        onClose();
      }
    }}
    >
      <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        
        <div className="mb-6 flex items-center justify-between">
          <h2
          id="modal-title"
          className="text-xl font-bold text-gray-900">{title}</h2>

          <button
          type="button"
          onClick={onClose}
          aria-label="close modal"
          className="rounded-lg px-3 py-1 text-xl text-gray-500 hover:bg-gray-100">❌</button>
        </div>

        {children}
      </div>
    </div>

  );
}

export default Modal;