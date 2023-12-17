// Define the gravitational constant
const G = 6.6743e-11;

// Define the planet object
const planet = {
  x: 450, // x position
  y: 300, // y position
  mass: 120, // mass
  radius: 20, // radius
  velocity: { x: 0, y: 0 }, // velocity vector
  acceleration: { x: 0, y: 0 }, // acceleration vector
  color: "blue", // color
};

// Define the star object
const star = {
  x: 755, // x position
  y: 330, // y position
  mass: 1200, // mass
  radius: 100, // radius
  velocity: { x: 0, y: 0 }, // velocity vector
  acceleration: { x: 0, y: 0 }, // acceleration vector
  color: "orange", // color
};

// Define the third object
const object3 = {
  x: 600, // x position
  y: 400, // y position
  mass: 80, // mass
  radius: 15, // radius
  velocity: { x: 0, y: 0 }, // velocity vector
  acceleration: { x: 0, y: 0 }, // acceleration vector
  color: "green", // color
};

// Add the third object to the array
const objects = [planet, star, object3];

// Define a function to draw an object on the canvas
function draw(object) {
  // Get the canvas element and its context
 const canvas = document.getElementById("gameCanvas");
 canvas.height = window.innerHeight;
 canvas.width = window.innerWidth;
 const ctx = canvas.getContext("2d");

  ctx.beginPath();
  ctx.arc(object.x, object.y, object.radius, 0, 2 * Math.PI);
  ctx.fillStyle = object.color;
  ctx.fill();

  return ctx;
}

// Define a function to calculate the gravitational force between two objects
function calculateGravitationalForce(object1, object2) {
  // Calculate the distance and angle between the objects
  const dx = object1.x - object2.x;
  const dy = object1.y - object2.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx);

  // Calculate the force magnitude using the formula
  const forceMagnitude = (G * object1.mass * object2.mass) / (distance * distance);

  // Calculate the force vector components using the angle
  const forceX = forceMagnitude * Math.cos(angle);
  const forceY = forceMagnitude * Math.sin(angle);

  // Return the force vector as an object
  return { x: forceX, y: forceY };
}

// Define a function to update the position and velocity of an object
function updatePositionAndVelocity(object, deltaTime) {
  // Calculate the net force acting on the object by adding the forces from all other objects
  let netForce = { x: 0, y: 0 };
  for (let other of objects) {
    if (other !== object) {
      // Get the force from the other object
      let force = calculateGravitationalForce(object, other);

      // Add the force to the net force
      netForce.x += force.x;
      netForce.y += force.y;
    }
  }

  // Calculate the acceleration of the object using the formula
  object.acceleration.x = netForce.x / object.mass;
  object.acceleration.y = netForce.y / object.mass;

  // Update the velocity of the object using the formula
  object.velocity.x += object.acceleration.x * deltaTime;
  object.velocity.y += object.acceleration.y * deltaTime;

  // Update the position of the object using the formula
  object.x += object.velocity.x * deltaTime;
  object.y += object.velocity.y * deltaTime;

  // Check for collisions with the boundaries of the canvas and bounce back
  if (object.x - object.radius < 0) {
    object.x = object.radius;
    object.velocity.x = -object.velocity.x;
  }
  if (object.x + object.radius > canvas.width) {
    object.x = canvas.width - object.radius;
    object.velocity.x = -object.velocity.x;
  }
  if (object.y - object.radius < 0) {
    object.y = object.radius;
    object.velocity.y = -object.velocity.y;
  }
  if (object.y + object.radius > canvas.height) {
    object.y = canvas.height - object.radius;
    object.velocity.y = -object.velocity.y;
  }
}

// Define a function to animate the simulation
function animate(ctx) {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update the position and velocity of each object
  for (let object of objects) {
    updatePositionAndVelocity(object, 1);
  }

  // Draw each object on the canvas
  for (let object of objects) {
    draw(object);
  }

  // Request the next animation frame
  requestAnimationFrame(animate);
}

// Start the animation
animate(draw(planet));
