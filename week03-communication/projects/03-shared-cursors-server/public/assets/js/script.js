{
  let socket;

  const handleMouseMove = e => {
    if (socket) {
      socket.emit(`update`, {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    }
  };
  const handleTouchMove = e => {
    if (socket) {
      socket.emit(`update`, {
        x: e.touches[0].clientX / window.innerWidth,
        y: e.touches[0].clientY / window.innerHeight
      });
    }
  };
  const init = () => {
    socket = io.connect(`/`);
    socket.on(`connect`, () => {
      console.log(`Connected: ${socket.id}`);
    });
    socket.on('update', users => {
      console.log(users);
    });

    window.addEventListener(`mousemove`, e => handleMouseMove(e));
    window.addEventListener(`touchmove`, e => handleTouchMove(e));
  };

  init();
}