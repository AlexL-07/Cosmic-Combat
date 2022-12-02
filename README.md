# Spaceship-Wars
## Background 
Spaceship Wars is a 2-4 player turn-based game, that allows each player to take control of a spaceship. The goal of this game is to defeat all of your opponents by 
using your spaceship's arsenal of weapons to depelete their health bars before they deplete yours. The mechanics of using your spaceship's weapons will be similar 
to older popular games like "Gunbound" and "Tank Wars", where you would have to set the proper launch angle and power to accurately hit your opponents over the terrain. 
There will be periodically changing winds that will affect your weapon's flight path and you would have to take this into account when determining the angle and power 
to launch your weapon. The game ends once there is only one player left standing on the map. 

## Functionality
In Spaceship Wars, users will be able to: 
* Move their spaceships across a 2D terrain to find better angles to use their weapons
* Determine the proper launch angle and power to fire their spaceship's weapon to hit their opponents
* Use any of the 3 different weapons of a spaceship's arsenal to defeat their opponents 
* Destroy the terrain using their weapons 

In addition, this project will include:
* Periodically changing wind that will affect a player's shot
* Background music and SFX when playing the game 

## Layouts
![Untitled-2022-12-02-0003](https://user-images.githubusercontent.com/103486289/205249245-66fe0c5d-9ed4-4ce0-a8ab-11bb1a9b5dd5.png)

## How to Play
* Play locally with 2 to 4 players
* On your turn, you have 30 seconds to move your Spaceship and shoot your shot
* Move your spaceship on the terrain using 'A' or 'D' on your keyboard
* Adjust the angle of your shot using 'W' or 'S' on your keyboard
* Select the weapon you would like to use by clicking the '1', '2', or '3' buttons located on the bottom left
* Hold down the 'space' bar to determine the power of your shot, release the 'space' bar to fire your shot 

## Technologies Used
* For the core game logic - DOM manipulation using Vanilla JavaScript
* For the rendering - HTML, CSS and the Canvas API
* For bundling and transpiling of the source JavaScript code - Webpack and Babel
* For the sound - Web Audio API
* For collisions, wind and gravity - applied physics and mathematics 

## Implementation Timeline
* Friday - Research the physics and math needed for the projectiles
* Saturday - Implement a working spaceship with accurate projectiles using JavaScript 
* Sunday - Render the main menu, UI and maps using Canvas API and CSS
* Monday - Implement the destructible terrain logic using JavaScript
* Tuesday - Render the spaceship and projectiles to follow the flight path using Canvas API and CSS 
* Wednesday - Clean up any errors, and if there is extra time add an extra spaceship




