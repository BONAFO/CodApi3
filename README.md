COD API 1

Descricion:

Una simple api para simular el modo multijugador de algunos Call Of Duty.
Una simple y divertida forma de alargar mas un COD =)

Modulos:

-DB => Donde se guardan los datos de los diferentes juegos. Cada juego se guarda en un carpeta (con imagenes de las armas y datos de estas).

-Starter => Actualiza el manifiest del Front.

-Front => Front de la Api

-Save => Transforma el token localstorage (creado con pako.js) en un archivo .json para poder actualizar los datos en DB de forma permanente

-Update => Graba en DB los cambios de forma permanente

-Utils => Herramientas para Nodejs 

-Reset => Resetea todas las DB



Ejecucion: 

-COD_A1_RESET.bat => Setea la propiedad "exp" de todas las armas en 0.

-COD_A1_SAVE.bat => Primero ejecuta Save y descarga en /Dowloads el archivo save. Luego espera a la respuesta del usuario para la ejecucion del script Update

-COD_A1_START.bat => Primero ejecuta Start para verificar que todos los juegos esten correctamente actualizados , actualiza el manifiest general y luego abre en msedge el front.

Notas: Actualizar el Update con el / los posibles folders donde puede encontrarse el save despues de usar para no perder los datos.


