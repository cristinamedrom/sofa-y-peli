# Sofá & peli

## Descripción

Sofá & peli es una aplicación donde podrás dar tu opinión sincera sobre las películas actuales. Podrás registrarte y crear tu perfil, tras esto estarás list@ para comenzar a opinar, ten en en cuenta que es una pequeña comunidad donde los Admin. irán actualizando las películas poco a poco. Si quieres que se añada alguna película en concreto escríbenos un mail a sofaypeliopiniones@gmail.com.

## Tecnologías Utilizadas

- Node.js: Plataforma de ejecución para JavaScript.
- Express: Framework web para Node.js.
- Prisma: ORM para interactuar con la base de datos.
- Cloudinary: Servicio de almacenamiento en la nube para gestionar imágenes. (Próximamente)
- HTML, CSS, Handlebars: Para la construcción de la interfaz de usuario.

## Funcionalidades Principales

Registro e Inicio de Sesión:
  Los usuarios pueden registrarse e iniciar sesión para acceder a funciones adicionales.
  
Explorar Películas:
  Visualizar la lista de películas disponibles con detalles y reseñas.

Agregar Películas:
  Los administradores pueden agregar nuevas películas.

Dejar Reseñas:
  Los usuarios pueden dejar reseñas para las películas.

## Configuración del Proyecto

1.Clonar el Repositorio:

```bash
git clone git@github.com:cristinamedrom/sofa-y-peli.git
cd sofa-y-peli
npm install
```

2. Configurar Variables de Entorno:

- Crea un archivo .env en el directorio raíz.
- Define las variables de entorno necesarias (base de datos, claves API, etc.).

3. Migraciones de la Base de Datos e iniciar aplicación:

```bash
npx prisma migrate dev
```

```bash
npm start
```

4. Acceder a la Aplicación:

Visita http://localhost:3000 en tu navegador.


## Usage

Explain how to use your application with examples. Include any necessary commands.

```bash
npm start
```

## Autor

- **Cristina Medrano** - _Initial work_ - [cristinamedrom]([https://github.com/YourUsername](https://github.com/cristinamedrom))

## License

This project is licensed under the XYZ License - see the [LICENSE.md](LICENSE.md) file for details.
