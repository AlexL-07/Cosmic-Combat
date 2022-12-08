# Cosmic Combat
## Background 
Cosmic Combat is a 4 player turn-based game, that allows each player to take control of a spaceship. The goal of this game is to defeat all of your opponents by 
using your spaceship's arsenal of weapons to depelete their health bars before they deplete yours. The mechanics of using your spaceship's weapons will be similar 
to older popular games like "Gunbound" and "Tank Wars", where you would have to set the proper launch angle and power to accurately hit your opponents over the terrain. 
There will be periodically changing winds that will affect your weapon's flight path and you would have to take this into account when determining the angle and power 
to launch your weapon. The game ends once there is only one player left standing on the map. 

## Functionality
In Cosmic Combat, users will be able to: 
* Move their spaceships across a 2D terrain to find better angles to use their weapons
* Determine the proper launch angle and power to fire their spaceship's weapon to hit their opponents
* Use any of the 3 different weapons of a spaceship's arsenal to defeat their opponents 
* Destroy the terrain using their weapons 

In addition, this project will include:
* Periodically changing wind that will affect a player's shot
* Background music and SFX when playing the game 

## Layouts
### Landing Page

![Screen Shot 2022-12-08 at 11 53 18 AM](https://user-images.githubusercontent.com/103486289/206557387-544480c3-6f49-43c0-82d8-5e83f41430b4.png)

### Instructions Page

![Screen Shot 2022-12-08 at 11 53 37 AM](https://user-images.githubusercontent.com/103486289/206557542-41e64445-5eba-4b9b-8882-ef855a6d37ea.png)

### Game 

![Screen Shot 2022-12-08 at 11 59 52 AM](https://user-images.githubusercontent.com/103486289/206557690-b1c578df-e850-4c49-83d0-38128119e7bf.png)

## How to Play
* Play locally with 4 players
* The goal is to be the last spaceship standing.
* You can defeat your opponents by depleting their healthbars or by dropping them off of the map
* Move your spaceship on the terrain using 'A' or 'D' on your keyboard
* There is a limit to how far you can move per turn
* Adjust the angle of your shot using 'W' or 'S' on your keyboard
* Select the weapon you would like to use by clicking the '1', '2', or '3' buttons located on the bottom left
* Hold down the 'space' bar to determine the power of your shot, release the 'space' bar to fire your shot
* Watch out for gravity and wind changes

## Technologies Used
* For the core game logic - DOM manipulation using Vanilla JavaScript
* For the rendering - HTML, CSS and the Canvas API
* For bundling and transpiling of the source JavaScript code - Webpack and Babel
* For the sound - Web Audio API
* For collisions, wind and gravity - applied physics and mathematics 

## Future Features
* Add moving sprites
* Add more spaceships 
* Allow for users to select number of players 




