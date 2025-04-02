document.addEventListener('DOMContentLoaded', function () {
  const rubikContainer = document.getElementById('rubik-container');
  const body = document.body;

  // Función para crear un cubo Rubik 3D
  function createRubikCube() {
    const rubikCube = document.createElement('div');
    rubikCube.classList.add('rubik-cube');

    // Definir las caras del cubo
    const faces = ['front', 'back', 'left', 'right', 'top', 'bottom'];

    faces.forEach(face => {
      const faceElement = document.createElement('div');
      faceElement.classList.add('face', face);

      // Crear las 9 casillas de cada cara
      for (let i = 1; i <= 9; i++) {
        const square = document.createElement('div');
        square.classList.add('square');

        // Asignar la imagen a cada cuadrado
        const imageName = getImageName(face, i);
        square.style.backgroundImage = `url('textures/${imageName}')`;

        faceElement.appendChild(square);
      }

      rubikCube.appendChild(faceElement);
    });

    rubikContainer.appendChild(rubikCube);
  }

  // Función para obtener el nombre de la imagen según la cara y el número del cuadro
  function getImageName(face, index) {
    let imageName = '';
    switch (face) {
      case 'front':
        imageName = `front_${index}.png`; // front_1.png, front_2.png, ...
        break;
      case 'back':
        imageName = `back_${index}.png`; // back_1.png, back_2.png, ...
        break;
      case 'left':
        imageName = `left_${index}.png`; // left_1.png, left_2.png, ...
        break;
      case 'right':
        imageName = `right_${index}.png`; // right_1.png, right_2.png, ...
        break;
      case 'top':
        imageName = `top_${index}.png`; // top_1.png, top_2.png, ...
        break;
      case 'bottom':
        imageName = `bottom_${index}.png`; // bottom_1.png, bottom_2.png, ...
        break;
      default:
        break;
    }
    return imageName;
  }

  // Función para acceder a la cámara y establecer el fondo
  function setCameraBackground() {
    // Crear un elemento de video que ocupará toda la pantalla
    const videoElement = document.createElement('video');
    videoElement.id = 'background-video';
    videoElement.style.position = 'absolute';
    videoElement.style.top = 0;
    videoElement.style.left = 0;
    videoElement.style.width = '100vw';
    videoElement.style.height = '100vh';
    videoElement.style.objectFit = 'cover';
    videoElement.style.zIndex = -1; // Colocar el video por detrás del cubo

    // Agregar el filtro para invertir y cambiar colores
    videoElement.style.filter = 'invert(1) hue-rotate(190deg) grayscale(1) contrast(100%)';

    // Solicitar acceso a la cámara
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(function (stream) {
        // Asignar el stream de la cámara al elemento de video
        videoElement.srcObject = stream;
        videoElement.play();
        body.appendChild(videoElement);
      })
      .catch(function (err) {
        console.log("Error al acceder a la cámara: " + err);
      });
  }

  // Llamar a la función para poner la cámara como fondo
  setCameraBackground();

  // Crear el cubo Rubik
  createRubikCube();
});
