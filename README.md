# React Authentication Crash Course With Firebase And Routing

This project follows [Web Dev Simplified](https://www.youtube.com/channel/UCFbNIlppjAuEX4znoulh0Cw)'s tutorial, which can be found [here](https://www.youtube.com/watch?v=PKwu15ldZ7k&ab_channel=WebDevSimplified).

## Technologiese Used and Some of the Concepts Covered

- React library and Bootstrap for building and styling the user interface

- React context to ensure user authentication is accessible across the entire app without needing to manually pass props at every level

- React Router DOM to allow easy navigation between components. Also set up a private route so that the user is directed to the login page if they are not authenticated.

- Firebase was the choice of authentication server here for its simplicify and ease of use. Used an .env.local file so that my Firebase config isn't out in the open once this repository goes public