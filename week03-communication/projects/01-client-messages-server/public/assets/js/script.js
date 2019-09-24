{
  const msgForm = document.querySelector(`#msgForm`),
    msgInput = document.querySelector(`#msgInput`);
  let socket; // will be assigned a value later
  const handleSubmit = e => {
    e.preventDefault();
    if (socket) {
      socket.emit(`message`, msgInput.value);
    }
    msgInput.value = ``;
  }
  const init = () => {
    socket = io.connect(`/`); // connect to local server
    socket.on(`connect`, () => {
      console.log(`Connected: ${socket.id}`);
    });
    socket.on(`message`, message => {
      console.log(`Received message: ${message}`);
    });

    msgForm.addEventListener(`submit`, e => handleSubmit(e));
  };

  init();
}